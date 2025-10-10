"""
Modern CustomTkinter + SQLite example application
- MVC-ish structure (Database, Models, Views)
- Uses concurrent.futures ThreadPoolExecutor to keep DB work off the UI thread
- Simple CRUD for "items" with search, sort, pagination-like loading
- Type hints, dataclasses, and careful resource handling

Dependencies:
- customtkinter (pip install customtkinter)
- Python 3.9+

Run: python customtk_sqlite_app.py
"""
from __future__ import annotations

import sqlite3
import threading
from concurrent.futures import ThreadPoolExecutor, Future
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import List, Optional, Callable, Any

import customtkinter as ctk

DB_FILE = Path(__file__).with_suffix('.db')

# ---------- Model ----------
@dataclass
class Item:
    id: Optional[int]
    title: str
    description: str
    created_at: datetime

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> "Item":
        return cls(
            id=row["id"],
            title=row["title"],
            description=row["description"],
            created_at=datetime.fromisoformat(row["created_at"]),
        )


# ---------- Database Layer (thread-safe) ----------
class Database:
    def __init__(self, path: Path):
        self.path = path
        self._lock = threading.RLock()
        self._ensure_schema()

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.path, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        return conn

    def _ensure_schema(self) -> None:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.cursor()
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS items (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL COLLATE NOCASE,
                        description TEXT DEFAULT '',
                        created_at TEXT NOT NULL
                    );
                    """
                )
                conn.commit()
            finally:
                conn.close()

    def create_item(self, title: str, description: str) -> int:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.cursor()
                cur.execute(
                    "INSERT INTO items (title, description, created_at) VALUES (?, ?, ?)",
                    (title.strip(), description.strip(), datetime.utcnow().isoformat()),
                )
                conn.commit()
                return cur.lastrowid
            finally:
                conn.close()

    def update_item(self, item_id: int, title: str, description: str) -> None:
        with self._lock:
            conn = self._connect()
            try:
                conn.execute(
                    "UPDATE items SET title = ?, description = ? WHERE id = ?",
                    (title.strip(), description.strip(), item_id),
                )
                conn.commit()
            finally:
                conn.close()

    def delete_item(self, item_id: int) -> None:
        with self._lock:
            conn = self._connect()
            try:
                conn.execute("DELETE FROM items WHERE id = ?", (item_id,))
                conn.commit()
            finally:
                conn.close()

    def list_items(self, search: Optional[str] = None, limit: int = 200) -> List[Item]:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.cursor()
                if search:
                    q = f"%{search.strip()}%"
                    cur.execute(
                        "SELECT * FROM items WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT ?",
                        (q, q, limit),
                    )
                else:
                    cur.execute("SELECT * FROM items ORDER BY created_at DESC LIMIT ?", (limit,))
                rows = cur.fetchall()
                return [Item.from_row(r) for r in rows]
            finally:
                conn.close()

    def get_item(self, item_id: int) -> Optional[Item]:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.cursor()
                cur.execute("SELECT * FROM items WHERE id = ?", (item_id,))
                row = cur.fetchone()
                return Item.from_row(row) if row else None
            finally:
                conn.close()


# ---------- Controller / App ----------
class App(ctk.CTk):
    def __init__(self, db: Database):
        super().__init__()
        self.title("CustomTkinter + SQLite — Modern App")
        self.geometry("900x600")
        ctk.set_appearance_mode("System")
        ctk.set_default_color_theme("blue")

        self.db = db
        self.executor = ThreadPoolExecutor(max_workers=2)

        # UI variables
        self.search_var = ctk.StringVar()
        self.title_var = ctk.StringVar()
        self.desc_var = ctk.StringVar()
        self.selected_item_id: Optional[int] = None

        # Layout
        self._build_ui()

        # Initial load
        self._load_items_async()

    def _build_ui(self) -> None:
        # Top frame: search + actions
        top_frame = ctk.CTkFrame(self, corner_radius=8)
        top_frame.pack(fill='x', padx=12, pady=8)

        search_entry = ctk.CTkEntry(top_frame, placeholder_text="Search...", textvariable=self.search_var)
        search_entry.pack(side='left', fill='x', expand=True, padx=(8, 6), pady=8)
        search_entry.bind('<Return>', lambda e: self._load_items_async())

        search_btn = ctk.CTkButton(top_frame, text="Search", command=self._load_items_async)
        search_btn.pack(side='left', padx=6, pady=8)

        clear_btn = ctk.CTkButton(top_frame, text="Clear", command=self._clear_search)
        clear_btn.pack(side='left', padx=6, pady=8)

        # Main frame split
        main_frame = ctk.CTkFrame(self)
        main_frame.pack(fill='both', expand=True, padx=12, pady=(0,12))
        main_frame.grid_columnconfigure(0, weight=1)
        main_frame.grid_columnconfigure(1, weight=2)
        main_frame.grid_rowconfigure(0, weight=1)

        # Left: listbox
        left = ctk.CTkFrame(main_frame)
        left.grid(row=0, column=0, sticky='nsew', padx=(0,8))

        self.listbox = ctk.CTkScrollableFrame(left, corner_radius=6)
        self.listbox.pack(fill='both', expand=True, padx=8, pady=8)

        # Right: form
        right = ctk.CTkFrame(main_frame)
        right.grid(row=0, column=1, sticky='nsew')

        form = ctk.CTkFrame(right, corner_radius=6)
        form.pack(fill='both', expand=True, padx=8, pady=8)

        ctk.CTkLabel(form, text="Title").pack(anchor='w', padx=6, pady=(6,0))
        self.title_entry = ctk.CTkEntry(form, textvariable=self.title_var)
        self.title_entry.pack(fill='x', padx=6, pady=6)

        ctk.CTkLabel(form, text="Description").pack(anchor='w', padx=6)
        self.desc_entry = ctk.CTkEntry(form, textvariable=self.desc_var)
        self.desc_entry.pack(fill='x', padx=6, pady=6)

        btn_frame = ctk.CTkFrame(form)
        btn_frame.pack(fill='x', padx=6, pady=10)

        add_btn = ctk.CTkButton(btn_frame, text="Add", command=self._on_add)
        add_btn.pack(side='left', padx=6)

        update_btn = ctk.CTkButton(btn_frame, text="Update", command=self._on_update)
        update_btn.pack(side='left', padx=6)

        delete_btn = ctk.CTkButton(btn_frame, text="Delete", fg_color="#D9534F", hover_color="#C9302C", command=self._on_delete)
        delete_btn.pack(side='left', padx=6)

        # status bar
        self.status_label = ctk.CTkLabel(self, text="Ready", anchor='w')
        self.status_label.pack(fill='x', side='bottom', padx=12, pady=(0,12))

    # ---------- UI helpers ----------
    def _set_status(self, text: str) -> None:
        self.status_label.configure(text=text)

    def _clear_search(self) -> None:
        self.search_var.set("")
        self._load_items_async()

    def _render_list(self, items: List[Item]) -> None:
        # clear children
        for child in self.listbox.winfo_children():
            child.destroy()

        if not items:
            ctk.CTkLabel(self.listbox, text="No items found").pack(padx=8, pady=8)
            return

        for it in items:
            frame = ctk.CTkFrame(self.listbox, corner_radius=6)
            frame.pack(fill='x', padx=6, pady=6)

            title_label = ctk.CTkLabel(frame, text=it.title, anchor='w')
            title_label.pack(fill='x', side='left', expand=True, padx=6, pady=8)

            meta = f"{it.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
            meta_label = ctk.CTkLabel(frame, text=meta, width=160)
            meta_label.pack(side='right', padx=6)

            # click binding
            frame.bind('<Button-1>', lambda e, id=it.id: self._select_item(id))
            title_label.bind('<Button-1>', lambda e, id=it.id: self._select_item(id))
            meta_label.bind('<Button-1>', lambda e, id=it.id: self._select_item(id))

    # ---------- DB async wrappers ----------
    def _run_db(self, fn: Callable[..., Any], *args, callback: Optional[Callable[[Any], None]] = None) -> Future:
        fut = self.executor.submit(fn, *args)

        if callback:
            def _on_done(f: Future):
                try:
                    res = f.result()
                except Exception as e:
                    self.after(0, lambda: self._set_status(f"Error: {e}"))
                    return
                self.after(0, lambda: callback(res))

            fut.add_done_callback(_on_done)

        return fut

    def _load_items_async(self) -> None:
        query = self.search_var.get().strip() or None
        self._set_status("Loading...")
        self._run_db(self.db.list_items, query, 100, callback=self._on_items_loaded)

    def _on_items_loaded(self, items: List[Item]) -> None:
        self._render_list(items)
        self._set_status(f"Loaded {len(items)} items")

    def _select_item(self, item_id: int) -> None:
        self._set_status("Loading item...")
        self._run_db(self.db.get_item, item_id, callback=self._on_item_loaded)

    def _on_item_loaded(self, item: Optional[Item]) -> None:
        if not item:
            self._set_status("Item not found")
            return
        self.selected_item_id = item.id
        self.title_var.set(item.title)
        self.desc_var.set(item.description)
        self._set_status(f"Selected item {item.id}")

    def _on_add(self) -> None:
        title = self.title_var.get().strip()
        desc = self.desc_var.get().strip()
        if not title:
            self._set_status("Title required")
            return
        self._set_status("Adding...")
        self._run_db(self.db.create_item, title, desc, callback=lambda rid: (self._set_status(f"Added {rid}"), self._load_items_async()))

    def _on_update(self) -> None:
        if not self.selected_item_id:
            self._set_status("Select an item first")
            return
        title = self.title_var.get().strip()
        desc = self.desc_var.get().strip()
        if not title:
            self._set_status("Title required")
            return
        self._set_status("Updating...")
        self._run_db(self.db.update_item, self.selected_item_id, title, desc, callback=lambda _: (self._set_status("Updated"), self._load_items_async()))

    def _on_delete(self) -> None:
        if not self.selected_item_id:
            self._set_status("Select an item first")
            return
        sid = self.selected_item_id
        self._set_status("Deleting...")
        self._run_db(self.db.delete_item, sid, callback=lambda _: (self._set_status("Deleted"), self._clear_form(), self._load_items_async()))

    def _clear_form(self) -> None:
        self.selected_item_id = None
        self.title_var.set("")
        self.desc_var.set("")


# ---------- Entry point ----------
if __name__ == '__main__':
    db = Database(DB_FILE)
    app = App(db)
    app.mainloop()
