# Mad Libs Game in Python
# This script uses user input, variables, and string concatenation to create a fun story.

# Get user inputs and store in variables
adjective1 = input("Enter an adjective: ")
noun1 = input("Enter a noun: ")
verb1 = input("Enter a verb ending in -ing: ")
adjective2 = input("Enter another adjective: ")
noun2 = input("Enter another noun: ")
animal = input("Enter an animal: ")

# Create the story using string concatenation
story = "One " + adjective1 + " day, a " + noun1 + " was " + verb1 + " in the park. " \
        "Suddenly, it saw a " + adjective2 + " " + noun2 + " chasing a " + animal + ". " \
        "What a wild adventure!"

# Print the completed story
print("\nHere's your Mad Libs story:\n")
print(story)
