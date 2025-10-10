import json
import os

# File to store tasks
TASKS_FILE = "tasks.json"

# Load tasks from file
def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, "r") as file:
            return json.load(file)
    return []

# Save tasks to file
def save_tasks(tasks):
    with open(TASKS_FILE, "w") as file:
        json.dump(tasks, file, indent=4)

# Display all tasks
def view_tasks(tasks):
    if not tasks:
        print("\nNo tasks found!\n")
        return
    print("\n📋 Your Tasks:")
    for i, task in enumerate(tasks, 1):
        status = "✅ Done" if task["completed"] else "🕒 Pending"
        print(f"{i}. {task['title']} - {status}")
    print()

# Add a new task
def add_task(tasks):
    title = input("Enter task title: ")
    tasks.append({"title": title, "completed": False})
    save_tasks(tasks)
    print("✅ Task added successfully!\n")

# Mark a task as completed
def complete_task(tasks):
    view_tasks(tasks)
    try:
        num = int(input("Enter task number to mark complete: "))
        tasks[num - 1]["completed"] = True
        save_tasks(tasks)
        print("🎯 Task marked as complete!\n")
    except (ValueError, IndexError):
        print("⚠️ Invalid task number!\n")

# Delete a task
def delete_task(tasks):
    view_tasks(tasks)
    try:
        num = int(input("Enter task number to delete: "))
        deleted = tasks.pop(num - 1)
        save_tasks(tasks)
        print(f"🗑️ Task '{deleted['title']}' deleted!\n")
    except (ValueError, IndexError):
        print("⚠️ Invalid task number!\n")

# Main menu
def main():
    tasks = load_tasks()
    while True:
        print("========== Task Manager ==========")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Complete Task")
        print("4. Delete Task")
        print("5. Exit")
        choice = input("Enter your choice (1-5): ")

        if choice == "1":
            view_tasks(tasks)
        elif choice == "2":
            add_task(tasks)
        elif choice == "3":
            complete_task(tasks)
        elif choice == "4":
            delete_task(tasks)
        elif choice == "5":
            print("👋 Exiting Task Manager. Goodbye!")
            break
        else:
            print("⚠️ Invalid choice! Try again.\n")

if __name__ == "__main__":
    main()
