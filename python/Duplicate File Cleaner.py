import os
import hashlib
from collections import defaultdict

def file_hash(path):
    hasher = hashlib.md5()
    with open(path, "rb") as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

def find_duplicates(folder):
    hashes = defaultdict(list)
    for root, _, files in os.walk(folder):
        for name in files:
            full_path = os.path.join(root, name)
            try:
                h = file_hash(full_path)
                hashes[h].append(full_path)
            except Exception:
                continue
    return {h: p for h, p in hashes.items() if len(p) > 1}

if __name__ == "__main__":
    path = input("Enter folder path: ")
    duplicates = find_duplicates(path)
    for h, files in duplicates.items():
        print("\nDuplicate set:")
        for f in files:
            print(" -", f)
