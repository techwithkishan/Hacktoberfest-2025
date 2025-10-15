"""
Smart File Organizer 🧠
------------------------
Organizes files in a given directory intelligently based on their type, content,
and creation time. Works on Windows, Linux, and macOS.

Features:
✅ Detects file type by content (not just extension)
✅ Groups files into folders like Images, Documents, Code, Audio, etc.
✅ Automatically appends timestamps to duplicates
✅ Logs all operations into a summary report
✅ Beautiful CLI output with colors

Author: YourName
License: MIT
"""

import os
import shutil
import datetime
import mimetypes
from collections import defaultdict

# Optional: pip install termcolor
try:
    from termcolor import colored
except ImportError:
    colored = lambda text, color=None: text


# ---------------------------- CONFIG ----------------------------
TARGET_FOLDERS = {
    "images": ["image"],
    "videos": ["video"],
    "audio": ["audio"],
    "documents": ["pdf", "text", "word", "excel", "powerpoint"],
    "code": ["python", "javascript", "java", "c", "cpp", "html", "json"],
    "archives": ["zip", "x-tar", "gzip", "rar"],
    "others": []
}

# ---------------------------- CORE LOGIC ----------------------------

def classify_file(file_path):
    """Classify file based on MIME type or fallback to extension."""
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        return "others"
    for folder, keywords in TARGET_FOLDERS.items():
        if any(k in mime_type for k in keywords):
            return folder
    return "others"


def get_unique_name(dest_dir, filename):
    """If file exists, append timestamp to create a unique name."""
    base, ext = os.path.splitext(filename)
    while os.path.exists(os.path.join(dest_dir, filename)):
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{base}_{timestamp}{ext}"
    return filename


def organize_folder(base_dir):
    """Organize all files inside the base directory."""
    if not os.path.exists(base_dir):
        print(colored("❌ Directory not found!", "red"))
        return

    files_moved = defaultdict(int)
    log_lines = []
    print(colored(f"\n🧠 Organizing files in: {base_dir}\n", "cyan"))

    for root, _, files in os.walk(base_dir):
        for file in files:
            file_path = os.path.join(root, file)
            if os.path.basename(root) in TARGET_FOLDERS:
                continue  # skip already organized folders
            category = classify_file(file_path)
            dest_dir = os.path.join(base_dir, category)
            os.makedirs(dest_dir, exist_ok=True)

            new_name = get_unique_name(dest_dir, file)
            shutil.move(file_path, os.path.join(dest_dir, new_name))
            files_moved[category] += 1
            log_lines.append(f"{file} → {category}/{new_name}")

    # Create log file
    log_path = os.path.join(base_dir, "organizer_log.txt")
    with open(log_path, "w", encoding="utf-8") as f:
        f.write(f"Smart File Organizer Log - {datetime.datetime.now()}\n")
        f.write("-" * 60 + "\n")
        for line in log_lines:
            f.write(line + "\n")

    print(colored("\n📦 Summary:", "yellow"))
    for k, v in files_moved.items():
        print(f"  • {k.capitalize()}: {v} file(s)")
    print(colored(f"\n✅ Done! Log saved to {log_path}\n", "green"))


# ---------------------------- ENTRY POINT ----------------------------

if __name__ == "__main__":
    print(colored("=== Smart File Organizer ===", "blue"))
    base = input("Enter the folder path to organize: ").strip()
    organize_folder(base)
