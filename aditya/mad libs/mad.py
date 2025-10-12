import os
import time  # For cool delays and animations
import random  # For selecting story templates

# Function to clear the screen for a responsive, clean look
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Cool ASCII art for the game title with animated reveal
def print_title():
    title = """
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║     📖  MAD LIBS ADVENTURE  📖              ║
    ║       Fill in the Blanks for Fun!            ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    """
    clear_screen()
    for line in title.split('\n'):
        print(line)
        time.sleep(0.1)  # Animated title reveal
    print("\n🚀 Let's create a silly story together!\n")

# Story templates (multiple for variety and interactivity)
def get_story_template():
    templates = {
        1: {
            "prompts": ["adjective", "noun", "verb ending in -ing", "another adjective", "another noun", "animal"],
            "story": lambda vars: f"One {vars[0]} day, a {vars[1]} was {vars[2]} in the park. Suddenly, it saw a {vars[3]} {vars[4]} chasing a {vars[5]}. What a wild adventure!"
        },
        2: {
            "prompts": ["color", "place", "action verb", "emotion", "food", "superhero name"],
            "story": lambda vars: f"In a {vars[0]} {vars[1]}, a brave explorer decided to {vars[2]} with {vars[3]}. They shared {vars[4]} and became the {vars[5]} of the universe!"
        },
        3: {
            "prompts": ["adverb", "body part", "loud noise", "weather", "vehicle", "celebrity"],
            "story": lambda vars: f"{vars[0].title()} using their {vars[1]}, they made a {vars[2]} during {vars[3]} weather. Driving a {vars[4]}, they met {vars[5]} and partied all night!"
        }
    }
    return templates

# Get user inputs interactively with emojis and validation
def get_inputs(prompts):
    variables = []
    print("💡 Enter words for your story (be creative!):\n")
    for prompt in prompts:
        while True:
            user_input = input(f"Enter a {prompt}: ").strip()
            if user_input:  # Basic validation: not empty
                variables.append(user_input)
                break
            else:
                print("❌ Oops! Please enter something fun.\n")
                time.sleep(0.5)
    return variables

# Generate and display the story with flair
def generate_story(template_id, variables):
    templates = get_story_template()
    story_func = templates[template_id]["story"]
    story = story_func(variables)
    
    # Animate story reveal
    print("\n✨ Generating your epic tale...\n")
    time.sleep(1)
    for line in story.split('. '):
        print(f"{line}.")
        time.sleep(0.5)  # Pause between sentences for dramatic effect
    print("\n🎉 Here's your completed Mad Libs story!\n")

# Welcome and theme selection for interactivity
def welcome():
    print_title()
    print("🌟 Choose a story theme:")
    print("1. 🏞️ Park Adventure (Classic)")
    print("2. 🚀 Space Explorer")
    print("3. ⚡ Wild Party")
    print("\nOr enter 'q' to quit.\n")
    
    while True:
        choice = input("Enter your choice (1-3 or q): ").strip().lower()
        if choice == 'q':
            print("👋 Thanks for stopping by! Come back for more stories! 📚")
            return None
        elif choice in ['1', '2', '3']:
            return int(choice)
        else:
            print("❌ Invalid choice! Pick 1, 2, 3, or q.\n")
            time.sleep(0.5)

# Main game loop for replayability
def main():
    templates = get_story_template()
    
    while True:
        theme_id = welcome()
        if theme_id is None:
            break
        
        # Get inputs
        prompts = templates[theme_id]["prompts"]
        variables = get_inputs(prompts)
        
        # Generate and show story
        generate_story(theme_id, variables)
        
        # Play again?
        replay = input("\nCreate another story? (y/n): ").strip().lower()
        if replay != 'y':
            print("\n👋 Thanks for the fun! Your imagination rocks! 🚀")
            break
        else:
            print("\n--- Next Adventure Loading ---\n")
            time.sleep(1)

# Run the game
if __name__ == "__main__":
    main()
