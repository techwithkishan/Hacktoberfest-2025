import os
import time  # For cool delays and animations
import re  # For more accurate sentence counting

# Function to clear the screen for a responsive, clean look
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Cool ASCII art for the title with animated reveal
def print_title():
    title = """
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║     📝  WORD COUNTER TOOL  📝               ║
    ║       Count Words, Chars & More!             ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    """
    clear_screen()
    for line in title.split('\n'):
        print(line)
        time.sleep(0.1)  # Animated title reveal
    print("\n🚀 Enter your text below to analyze it like a pro!\n")

# Function to count words, characters, sentences
def analyze_text(text):
    if not text.strip():
        return None  # Empty text
    
    # Word count: Split by whitespace and filter empty
    words = text.split()
    word_count = len(words)
    
    # Character count
    char_count_total = len(text)
    char_count_no_spaces = len(text.replace(" ", "").replace("\n", ""))
    
    # Sentence count: Split by . ! ? (basic regex for accuracy)
    sentences = re.split(r'[.!?]+', text)
    sentence_count = len([s for s in sentences if s.strip()])  # Ignore empty
    
    return {
        'words': word_count,
        'chars_total': char_count_total,
        'chars_no_spaces': char_count_no_spaces,
        'sentences': sentence_count
    }

# Display results with flair
def display_results(results):
    print("\n✨ Analysis Complete! Here's the breakdown:\n")
    print(f"📊 Words: {results['words']}")
    print(f"🔤 Characters (total): {results['chars_total']}")
    print(f"🔤 Characters (no spaces): {results['chars_no_spaces']}")
    print(f"📄 Sentences: {results['sentences']}")
    
    # Fun insights
    if results['words'] > 100:
        print("\n🌟 Wow! That's a novel in the making! 📖")
    elif results['words'] > 50:
        print("\n👍 Solid paragraph—keep writing! ✍️")
    else:
        print("\n💡 Short and sweet! Add more for depth. 😊")
    
    print("\n--- End of Analysis ---")

# Get user input interactively (multi-line support)
def get_text_input():
    print("💡 Paste or type your text (press Enter twice when done):\n")
    lines = []
    while True:
        try:
            line = input()
            if line == "" and len(lines) > 0 and lines[-1] == "":  # Two empty lines to end
                break
            lines.append(line)
        except EOFError:
            break  # Handles end of input in some environments
    return "\n".join(lines)

# Welcome message
def welcome():
    print_title()
    print("🌟 This tool counts words, characters, and sentences in your text.")
    print("💡 Great for writers, students, or anyone checking word limits!")
    print("🔥 Multi-line input supported. Let's count!\n")
    input("Press Enter to start analyzing...")

# Main loop for replayability
def main():
    welcome()
    
    while True:
        text = get_text_input()
        
        if not text.strip():
            print("\n❌ No text entered. Try again!\n")
            replay = input("Analyze another? (y/n): ").strip().lower()
            if replay != 'y':
                break
            continue
        
        results = analyze_text(text)
        if results:
            display_results(results)
        
        # Play again?
        replay = input("\nAnalyze another text? (y/n): ").strip().lower()
        if replay != 'y':
            print("\n👋 Thanks for using Word Counter! Write on! 🚀")
            break
        else:
            print("\n--- Loading Next Analysis ---\n")
            time.sleep(1)

# Run the tool
if __name__ == "__main__":
    main()
