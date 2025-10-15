import random
import os
import time  # For cool animations and delays

# Function to clear the screen for a responsive, clean look
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Cool ASCII art for the game title with animated reveal
def print_title():
    title = """
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║     🎲  DICE ROLLING SIMULATOR  🎲           ║
    ║         Roll for Luck & Fun!                 ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    """
    clear_screen()
    for line in title.split('\n'):
        print(line)
        time.sleep(0.1)  # Animated title reveal
    print("\n🚀 Shake those virtual dice and see what fate brings!\n")

# ASCII art for dice faces (cool visuals for each number 1-6)
def get_dice_face(number):
    faces = {
        1: """
        +-------+
        |       |
        |   *   |
        |       |
        +-------+
        """,
        2: """
        +-------+
        | *     |
        |       |
        |     * |
        +-------+
        """,
        3: """
        +-------+
        | *     |
        |   *   |
        |     * |
        +-------+
        """,
        4: """
        +-------+
        | *   * |
        |       |
        | *   * |
        +-------+
        """,
        5: """
        +-------+
        | *   * |
        |   *   |
        | *   * |
        +-------+
        """,
        6: """
        +-------+
        | *   * |
        |   *   |
        | *   * |
        +-------+
        """
    }
    return faces.get(number, faces[1])  # Default to 1 if invalid

# Simulate rolling a single die with animation
def roll_single_die(sides=6):
    print("🎲 Rolling the die...")
    time.sleep(0.5)
    for _ in range(3):  # Shake animation
        print("...shaking...")
        time.sleep(0.3)
    result = random.randint(1, sides)
    print(f"\n🎉 Result: {result}!")
    time.sleep(0.5)
    print(get_dice_face(result))
    return result

# Roll multiple dice
def roll_dice(num_dice=1, sides=6):
    results = []
    total = 0
    print(f"🎲 Rolling {num_dice} dice (1-{sides} sides)...")
    time.sleep(0.5)
    
    for i in range(num_dice):
        print(f"\n--- Die {i+1} ---")
        result = roll_single_die(sides)
        results.append(result)
        total += result
        time.sleep(0.3)  # Pause between dice
    
    print(f"\n📊 All Results: {results}")
    print(f"🔢 Total Sum: {total}")
    return results, total

# Get user input for number of dice and sides
def get_user_options():
    while True:
        try:
            num_dice = int(input("How many dice to roll? (1-10): "))
            if 1 <= num_dice <= 10:
                break
            else:
                print("❌ Please enter a number between 1 and 10.\n")
        except ValueError:
            print("❌ Invalid input! Enter a number.\n")
    
    while True:
        try:
            sides = int(input("Number of sides per die? (4/6/8/10/12/20, default 6): ") or "6")
            if sides in [4, 6, 8, 10, 12, 20]:
                break
            else:
                print("❌ Please enter 4, 6, 8, 10, 12, 20, or press Enter for 6.\n")
        except ValueError:
            print("❌ Invalid input! Using 6 sides.\n")
            sides = 6
            break
    
    return num_dice, sides

# Welcome message
def welcome():
    print_title()
    print("🌟 Simulate dice rolls like a pro gamer or D&D master!")
    print("💡 Choose how many dice and sides—standard is 6-sided.")
    print("🔥 Roll away and track your luck!\n")
    input("Press Enter to start rolling...")

# Main game loop for replayability
def main():
    welcome()
    roll_history = []  # Track previous rolls for fun
    
    while True:
        num_dice, sides = get_user_options()
        
        results, total = roll_dice(num_dice, sides)
        roll_history.append((results, total))
        
        # Show history summary
        if len(roll_history) > 1:
            print(f"\n📜 Roll History (last 5):")
            for i, (res, tot) in enumerate(roll_history[-5:], 1):
                print(f"  Roll {len(roll_history)-5+i}: {res} (Sum: {tot})")
        
        # Fun feedback based on total
        avg = total / num_dice if num_dice > 0 else 0
        if avg > (sides / 2 + 1):
            print("\n🌟 High roll! You're on fire! 🔥")
        elif avg < (sides / 2):
            print("\n😅 Low roll... Better luck next time! 🍀")
        else:
            print("\n⚖️ Balanced roll—steady as she goes! 🎯")
        
        # Pause for responsiveness
        input("\nPress Enter to roll again or 'q' to quit...")
        if input("Type 'q' to quit now? (or Enter to continue): ").strip().lower() == 'q':
            break
        
        print("\n--- Preparing Next Roll ---\n")
        time.sleep(1)

    # Goodbye
    clear_screen()
    print_title()
    print(f"\n👋 Thanks for playing! You rolled {len(roll_history)} times.")
    print("🎲 Come back for more random adventures! 🚀")

# Run the game
if __name__ == "__main__":
    main()
