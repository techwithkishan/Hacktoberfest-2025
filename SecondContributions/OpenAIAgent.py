"""
CustomTkinter AI Agent + SQLite
- Modern single-file app demonstrating an "AI agent" chat UI
- Stores conversations in SQLite
- Non-blocking background calls (ThreadPoolExecutor)
- Optional OpenAI integration: if OPENAI_API_KEY is set and openai package installed, will call the API. Otherwise a simple local echo/fallback agent is used.

Dependencies:
- customtkinter (pip install customtkinter)
- openai (optional) (pip install openai)
- Python 3.9+

Run: python customtk_ai_agent.py
"""
from __future__ import annotations

import os
import sqlite3
import threading
from concurrent.futures import ThreadPoolExecutor, Future
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import List, Optional, Callable, Any, Tuple

import customtkinter as ctk

# Try optional OpenAI import
USE_OPENAI = False
try:
    import openai
    if os.getenv('OPENAI_API_KEY'):
        openai.api_key = os.getenv('OPENAI_API_KEY')
        USE_OPENAI = True
except Exception:
    USE_OPENAI = False

DB_FILE = Path(__file__).with_suffix('.db')

# ---------- Models ----------
@dataclass
class Message:
    id: Optional[int]
    role: str  # 'user' | 'assistant' | 'system'
    content: str
    created_at: datetime

    @classmethod
    def from_row(cls, row: sqlite3.Row) -> 'Message':
        return cls(id=row['id'], role=row['role'], content=row['content'], created_at=datetime.fromisoformat(row['created_at']))


# ---------- Database Layer ----------
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
                    '''
                    CREATE TABLE IF NOT EXISTS messages (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        role TEXT NOT NULL,
                        content TEXT NOT NULL,
                        created_at TEXT NOT NULL
                    );
                    '''
                )
                conn.commit()
            finally:
                conn.close()

    def add_message(self, role: str, content: str) -> int:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.cursor()
                cur.execute('INSERT INTO messages (role, content, created_at) VALUES (?, ?, ?)',
                            (role, content, datetime.utcnow().isoformat()))
                conn.commit()
                return cur.lastrowid
            finally:
                conn.close()

    def list_messages(self, limit: int = 200) -> List[Message]:
        with self._lock:
            conn = self._connect()
            try:
                cur = conn.cursor()
                cur.execute('SELECT * FROM messages ORDER BY id ASC LIMIT ?', (limit,))
                rows = cur.fetchall()
                return [Message.from_row(r) for r in rows]
            finally:
                conn.close()

    def clear_messages(self) -> None:
        with self._lock:
            conn = self._connect()
            try:
                conn.execute('DELETE FROM messages')
                conn.commit()
            finally:
                conn.close()


# ---------- Agent Layer (pluggable) ----------
class Agent:
    def respond(self, messages: List[Tuple[str, str]], model: str = 'gpt-3.5-turbo') -> str:
        """Synchronous method — implementations should override to provide response text."""
        raise NotImplementedError


class OpenAIAgent(Agent):
    def respond(self, messages: List[Tuple[str, str]], model: str = 'gpt-3.5-turbo') -> str:
        # messages: list of (role, content)
        chat_messages = [{'role': r, 'content': c} for r, c in messages]
        # Simple call using chat completion
        resp = openai.ChatCompletion.create(model=model, messages=chat_messages, temperature=0.2)
        return resp.choices[0].message.content.strip()


class EchoAgent(Agent):
    def respond(self, messages: List[Tuple[str, str]], model: str = 'echo') -> str:
        # Very simple fallback agent: summarises last user message and echoes
        last_user = next((c for r, c in reversed(messages) if r == 'user'), None)
        if not last_user:
            return "Hello — I am an offline agent. Ask me something!"
        summary = last_user
        return f"[offline echo] I received: {summary}"


# ---------- App (UI + Controller) ----------
class AIAgentApp(ctk.CTk):
    def __init__(self, db: Database, agent: Agent):
        super().__init__()
        self.title('AI Agent — CustomTkinter')
        self.geometry('900x640')
        ctk.set_appearance_mode('System')
        ctk.set_default_color_theme('blue')

        self.db = db
        self.agent = agent
        self.executor = ThreadPoolExecutor(max_workers=2)

        # UI variables
        self.input_var = ctk.StringVar()
        self.system_var = ctk.StringVar(value='You are a helpful assistant.')
        self.model_var = ctk.StringVar(value='gpt-3.5-turbo' if USE_OPENAI else 'offline-echo')

        # Build UI
        self._build_ui()

        # Load history
        self._render_history()

    def _build_ui(self) -> None:
        top = ctk.CTkFrame(self)
        top.pack(fill='x', padx=12, pady=8)

        ctk.CTkLabel(top, text='System prompt').pack(anchor='w', padx=6)
        self.sys_entry = ctk.CTkEntry(top, textvariable=self.system_var)
        self.sys_entry.pack(fill='x', padx=6, pady=(0,8))

        mid = ctk.CTkFrame(self)
        mid.pack(fill='both', expand=True, padx=12, pady=(0,8))
        mid.grid_columnconfigure(0, weight=1)

        # Chat display (scrollable)
        self.chat_frame = ctk.CTkScrollableFrame(mid, corner_radius=6)
        self.chat_frame.grid(row=0, column=0, sticky='nsew', padx=(0,8), pady=4)

        # Right controls
        right = ctk.CTkFrame(mid, width=240)
        right.grid(row=0, column=1, sticky='nsew')

        ctk.CTkLabel(right, text='Model').pack(anchor='w', padx=8, pady=(8,2))
        model_menu = ctk.CTkOptionMenu(right, values=['gpt-4', 'gpt-4o', 'gpt-3.5-turbo', 'offline-echo'] if not USE_OPENAI else ['gpt-4', 'gpt-3.5-turbo'], variable=self.model_var)
        model_menu.pack(fill='x', padx=8)

        save_btn = ctk.CTkButton(right, text='Clear History', command=self._on_clear_history)
        save_btn.pack(padx=8, pady=12)

        status_frame = ctk.CTkFrame(right)
        status_frame.pack(fill='both', expand=True, padx=8, pady=8)
        self.status_label = ctk.CTkLabel(status_frame, text='Ready', anchor='nw')
        self.status_label.pack(fill='both', expand=True, padx=6, pady=6)

        # Bottom input
        bottom = ctk.CTkFrame(self)
        bottom.pack(fill='x', padx=12, pady=8)

        self.input_entry = ctk.CTkEntry(bottom, textvariable=self.input_var, placeholder_text='Type your message and press Enter...')
        self.input_entry.pack(side='left', fill='x', expand=True, padx=(6,8))
        self.input_entry.bind('<Return>', lambda e: self._on_send())

        send_btn = ctk.CTkButton(bottom, text='Send', command=self._on_send)
        send_btn.pack(side='right', padx=6)

    # ---------- UI Helpers ----------
    def _set_status(self, text: str) -> None:
        self.status_label.configure(text=text)

    def _render_history(self) -> None:
        for w in self.chat_frame.winfo_children():
            w.destroy()

        msgs = self.db.list_messages(500)
        if not msgs:
            ctk.CTkLabel(self.chat_frame, text='No conversation yet — say hi!').pack(padx=8, pady=8)
            return

        for m in msgs:
            frame = ctk.CTkFrame(self.chat_frame, corner_radius=8)
            frame.pack(fill='x', padx=8, pady=6)
            header = f"{m.role} @ {m.created_at.strftime('%Y-%m-%d %H:%M:%S')}"
            ctk.CTkLabel(frame, text=header, anchor='w', font=ctk.CTkFont(size=10, weight='bold')).pack(anchor='w', padx=8, pady=(6,0))
            ctk.CTkLabel(frame, text=m.content, wraplength=640, anchor='w').pack(fill='x', padx=8, pady=(0,8))

        # scroll to bottom (best-effort)
        self.chat_frame.update_idletasks()
        try:
            self.chat_frame.yview_moveto(1.0)
        except Exception:
            pass

    # ---------- Background helpers ----------
    def _run_bg(self, fn: Callable[..., Any], *args, callback: Optional[Callable[[Any], None]] = None) -> Future:
        fut = self.executor.submit(fn, *args)

        if callback:
            def _on_done(f: Future):
                try:
                    res = f.result()
                except Exception as e:
                    self.after(0, lambda: self._set_status(f'Error: {e}'))
                    return
                self.after(0, lambda: callback(res))

            fut.add_done_callback(_on_done)

        return fut

    def _compose_messages_for_agent(self) -> List[Tuple[str, str]]:
        # start with system prompt
        msgs = [('system', self.system_var.get().strip())]
        history = self.db.list_messages(500)
        for m in history:
            msgs.append((m.role, m.content))
        return msgs

    def _on_send(self) -> None:
        text = self.input_var.get().strip()
        if not text:
            self._set_status('Type a message first')
            return
        self.input_var.set('')
        self.db.add_message('user', text)
        self._render_history()

        # prepare model and messages
        model = self.model_var.get()
        msgs_for_agent = self._compose_messages_for_agent()

        # run agent in background
        self._set_status('Thinking...')
        def call_agent():
            return self.agent.respond(msgs_for_agent, model=model)

        def on_response(resp_text: str):
            self.db.add_message('assistant', resp_text)
            self._render_history()
            self._set_status('Ready')

        self._run_bg(call_agent, callback=on_response)

    def _on_clear_history(self) -> None:
        self.db.clear_messages()
        self._render_history()
        self._set_status('Cleared history')


# ---------- Entrypoint ----------
if __name__ == '__main__':
    db = Database(DB_FILE)
    agent: Agent
    if USE_OPENAI:
        agent = OpenAIAgent()
    else:
        agent = EchoAgent()

    app = AIAgentApp(db, agent)
    app.mainloop()
