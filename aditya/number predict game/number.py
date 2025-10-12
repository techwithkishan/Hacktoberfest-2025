import random
import os  # For clearing screen (optional, for a cooler feel)

# Function to clear the screen for a responsive, clean look
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Cool ASCII art for the game title
def print_title():
    print("""
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║     🎯  NUMBER GUESSING GAME  🎯             ║
    ║          Guess the Secret Number!            ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    """)

# Welcome and instructions
def welcome():
    clear_screen()
    print_title()
    print("🚀 Welcome, Detective! I've hidden a number between 1 and 100.")
    print("💡 Hint: It's waiting for you to guess it right!")
    print("🔥 Enter your guess below. I'll tell you if it's too high or too low.")
    print("🎉 Guess correctly to win! Let's go!\n")
    input("Press Enter to start...")

# Main game function
def play_game():
    # Generate random number
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10  # Optional: Limit attempts for challenge
    
    print(f"🕵️  The game has begun! You have {max_attempts} attempts.\n")
    
    while attempts < max_attempts:
        try:
            # Get user guess
            guess = int(input("Enter your guess (1-100): "))
            attempts += 1
            
            # Check guess
            if guess == secret_number:
                print(f"\n🎊 CONGRATULATIONS! You nailed it! 🎊")
                print(f"🔢 The number was {secret_number}.")
                print(f"🏆 You guessed it in {attempts} attempts! You're a legend!")
                return  # End game on win
            elif guess < secret_number:
                print(f"📈 Too low! Try higher. (Attempt {attempts}/{max_attempts})")
            else:
                print(f"📉 Too high! Try lower. (Attempt {attempts}/{max_attempts})")
            
            # Responsive pause for better feel
            if attempts < max_attempts:
                input("\nPress Enter for your next guess...")
                clear_screen()
                print_title()  # Refresh title for coolness
                
        except ValueError:
            print("❌ Oops! That's not a valid number. Try again.")
            attempts -= 1  # Don't count invalid inputs
    
    # If out of attempts
    print(f"\n💀 Game Over! The secret number was {secret_number}.")
    print("🔄 Better luck next time! Want to play again?")

# Play again loop for responsiveness
def main():
    while True:
        welcome()
        play_game()
        
        # Ask to play again
        replay = input("\nPlay again? (y/n): ").lower().strip()
        if replay != 'y':
            print("👋 Thanks for playing! See you next time! 🚀")
            break

# Run the game
if __name__ == "__main__":
    main()
