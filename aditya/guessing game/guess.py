import random
import os
import time  # For cool animations and delays

# Function to clear the screen for a responsive, clean look
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Cool ASCII art for the game title with animation
def print_title():
    title = """
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║     ✂️  ROCK, PAPER, SCISSORS  🪨📄         ║
    ║          Battle of Choices!                  ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    """
    for line in title.split('\n'):
        print(line)
        time.sleep(0.1)  # Animated title reveal

# ASCII art for choices (cool visuals)
def show_choice(choice):
    if choice.lower() == 'rock':
        return """
        🪨
         /\\
        //\\\\ 
        """
    elif choice.lower() == 'paper':
        return """
        📄
        _____
       |     |
       |_____|
        """
    elif choice.lower() == 'scissors':
        return """
        ✂️
         /\\
        // \\\\
        """
    return ""

# Animated countdown for tension
def countdown():
    for i in range(3, 0, -1):
        print(f"\n⏳ Get ready... {i}!")
        time.sleep(1)
    print("\n🎬 Showdown!\n")
    time.sleep(0.5)

# Get player's choice with validation
def get_player_choice():
    while True:
        print("Choose your weapon:")
        print("1. 🪨 Rock")
        print("2. 📄 Paper")
        print("3. ✂️ Scissors")
        choice = input("\nEnter 1, 2, or 3 (or 'q' to quit): ").lower().strip()
        
        if choice == 'q':
            return None
        elif choice in ['1', 'rock']:
            return 'rock'
        elif choice in ['2', 'paper']:
            return 'paper'
        elif choice in ['3', 'scissors']:
            return 'scissors'
        else:
            print("❌ Invalid choice! Try again.")
            time.sleep(0.5)

# Get computer's choice randomly
def get_computer_choice():
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

# Determine winner
def determine_winner(player, computer):
    if player == computer:
        return 'tie'
    elif (player == 'rock' and computer == 'scissors') or \
         (player == 'paper' and computer == 'rock') or \
         (player == 'scissors' and computer == 'paper'):
        return 'player'
    else:
        return 'computer'

# Play a single round with animations
def play_round(player_score, computer_score):
    clear_screen()
    print_title()
    
    player_choice = get_player_choice()
    if player_choice is None:
        return player_score, computer_score, True  # Quit flag
    
    computer_choice = get_computer_choice()
    
    # Animate countdown
    countdown()
    
    # Animate revealing choices side by side
    print("Your choice:".ljust(20), end="")
    for line in show_choice(player_choice).split('\n'):
        print(line)
    time.sleep(0.5)
    
    print("Computer's choice:".ljust(20), end="")
    for line in show_choice(computer_choice).split('\n'):
        print(line)
    time.sleep(1)
    
    # Determine and show result
    winner = determine_winner(player_choice, computer_choice)
    if winner == 'player':
        print(f"\n🎉 You win this round! {player_choice.title()} beats {computer_choice}!")
        player_score += 1
    elif winner == 'computer':
        print(f"\n🤖 Computer wins! {computer_choice.title()} beats {player_choice}!")
        computer_score += 1
    else:
        print(f"\n🤝 It's a tie! Both chose {player_choice}.")
    
    # Show current score
    print(f"\n📊 Score - You: {player_score} | Computer: {computer_score}")
    
    # Pause for responsiveness
    input("\nPress Enter for the next round...")
    return player_score, computer_score, False

# Welcome message
def welcome():
    clear_screen()
    print_title()
    print("🚀 Welcome to Rock, Paper, Scissors! Classic battle with a twist.")
    print("💡 Rules: Rock crushes Scissors, Scissors cuts Paper, Paper covers Rock.")
    print("🔥 Play rounds until you quit. First to dominate wins bragging rights!\n")
    input("Press Enter to battle...")

# Main game loop
def main():
    welcome()
    player_score = 0
    computer_score = 0
    quit_game = False
    
    while not quit_game:
        player_score, computer_score, quit_game = play_round(player_score, computer_score)
    
    # Final score
    clear_screen()
    print_title()
    print(f"\n🏆 Final Score - You: {player_score} | Computer: {computer_score}")
    if player_score > computer_score:
        print("🎊 You are the ultimate champion! 🏅")
    elif computer_score > player_score:
        print("🤖 The computer reigns supreme... Try again!")
    else:
        print("🤝 A perfect tie! Well played.")
    
    print("\n👋 Thanks for playing! Come back for more epic battles! 🚀")

# Run the game
if __name__ == "__main__":
    main()
