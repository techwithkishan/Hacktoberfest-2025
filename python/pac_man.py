# ==============================================================================
# Game: Pac-Man (Colab Version)
# ==============================================================================
#
# ## Explanation of the Game ##
#
# This is a simplified, text-based version of the classic arcade game Pac-Man.
#
# **Objective:**
# The goal is to guide Pac-Man (represented by 'P') around the maze to eat all
# the dots ('.') without getting caught by the ghosts ('G').
#
# **Game Elements:**
#   - 'P': Pac-Man, the character you control.
#   - 'G': Ghosts, the enemies that chase you.
#   - '.': Dots, the food you need to eat to win.
#   - '#': Walls, which block movement for both Pac-Man and ghosts.
#
# **How to Play:**
#   - The game board is displayed in the output cell.
#   - You will be prompted to enter a move for Pac-Man.
#   - After your move, the ghosts will automatically make their move.
#   - The board will be redrawn, showing the new positions.
#
# **Controls:**
#   - 'w': Move Up
#   - 'a': Move Left
#   - 's': Move Down
#   - 'd': Move Right
#   - 'q': Quit the game
#
# **Winning and Losing:**
#   - You win the game by eating all the dots on the map.
#   - You lose the game if a ghost moves into the same square as Pac-Man.
#
# ==============================================================================

import os
import random
import time
from IPython.display import clear_output

# --- Game Configuration ---
WIDTH = 20
HEIGHT = 15
GHOST_COUNT = 3
DELAY = 0.5  # Delay in seconds between turns for better playability

# --- Game Map Layout ---
# You can design your own levels here!
LEVEL_MAP = [
    "####################",
    "#P........##........#",
    "#.####.##....##.####.#",
    "#.####.##.##.##.####.#",
    "#..................#",
    "#.####.##....##.####.#",
    "#......##.##.##......#",
    "######.##.##.##.######",
    "     #....G...#     ",
    "######.######.######",
    "#......##..##......#",
    "#.####.##..##.####.#",
    "#...G.........G...#",
    "#.##########.####.#",
    "####################",
]

class PacmanGame:
    """
    Manages the state and logic for the Pac-Man game.
    """
    def __init__(self, game_map):
        self.game_map = [list(row) for row in game_map]
        self.score = 0
        self.game_over = False
        self.win = False
        self.pacman_pos = self.find_char('P')
        self.ghost_positions = self.find_all_chars('G')
        self.total_dots = sum(row.count('.') for row in self.game_map)

    def find_char(self, char):
        """Find the first occurrence of a character on the map."""
        for y, row in enumerate(self.game_map):
            for x, cell in enumerate(row):
                if cell == char:
                    return [y, x]
        return None

    def find_all_chars(self, char):
        """Find all occurrences of a character on the map."""
        positions = []
        for y, row in enumerate(self.game_map):
            for x, cell in enumerate(row):
                if cell == char:
                    positions.append([y, x])
        return positions

    def print_board(self):
        """Prints the current game board to the console."""
        clear_output(wait=True)
        print("--- Pac-Man ---")
        print(f"Score: {self.score}\n")
        for row in self.game_map:
            print("".join(row))
        print("\nControls: (w) up, (a) left, (s) down, (d) right, (q) quit")

    def is_wall(self, y, x):
        """Check if a given coordinate is a wall."""
        return self.game_map[y][x] == '#'

    def move_pacman(self, move):
        """Moves Pac-Man based on user input."""
        y, x = self.pacman_pos
        new_y, new_x = y, x

        if move == 'w':
            new_y -= 1
        elif move == 's':
            new_y += 1
        elif move == 'a':
            new_x -= 1
        elif move == 'd':
            new_x += 1
        elif move == 'q':
            self.game_over = True
            print("You quit the game. Goodbye!")
            return

        # Check for valid move
        if not self.is_wall(new_y, new_x):
            self.game_map[y][x] = ' '  # Clear old position
            
            # Check for dot
            if self.game_map[new_y][new_x] == '.':
                self.score += 10

            self.pacman_pos = [new_y, new_x]
            self.game_map[new_y][new_x] = 'P'

    def move_ghosts(self):
        """Moves all ghosts randomly."""
        for i, ghost_pos in enumerate(self.ghost_positions):
            y, x = ghost_pos
            possible_moves = []
            
            # Check potential moves (up, down, left, right)
            if not self.is_wall(y - 1, x): possible_moves.append((-1, 0))
            if not self.is_wall(y + 1, x): possible_moves.append((1, 0))
            if not self.is_wall(y, x - 1): possible_moves.append((0, -1))
            if not self.is_wall(y, x + 1): possible_moves.append((0, 1))

            if possible_moves:
                dy, dx = random.choice(possible_moves)
                new_y, new_x = y + dy, x + dx

                # Restore the character that was under the ghost
                # This logic is simplified; assumes ghosts start on empty space or dots
                if any(row.count('.') for row in LEVEL_MAP): # Check if there are dots left
                    original_char = '.' if LEVEL_MAP[y][x] == '.' or LEVEL_MAP[y][x] == 'G' else ' '
                else:
                    original_char = ' '

                self.game_map[y][x] = original_char
                self.ghost_positions[i] = [new_y, new_x]

        # Redraw ghosts after all have moved to avoid overwriting each other
        for y, x in self.ghost_positions:
             self.game_map[y][x] = 'G'


    def check_collisions(self):
        """Check for collisions between Pac-Man and ghosts."""
        if self.pacman_pos in self.ghost_positions:
            self.game_over = True
            self.win = False
            self.game_map[self.pacman_pos[0]][self.pacman_pos[1]] = 'X' # Show collision
            
    def check_win_condition(self):
        """Check if all dots have been eaten."""
        if self.score >= self.total_dots * 10:
             self.game_over = True
             self.win = True

    def play(self):
        """Main game loop."""
        while not self.game_over:
            self.print_board()
            
            # Get user input
            move = input("Enter your move: ").lower()
            if move not in ['w', 'a', 's', 'd', 'q']:
                continue

            self.move_pacman(move)
            if self.game_over: # Check if user quit
                break
                
            self.move_ghosts()

            # Check game state
            self.check_collisions()
            self.check_win_condition()
            
            time.sleep(DELAY)

        # Game Over Screen
        self.print_board()
        if self.win:
            print("\nCongratulations! You ate all the dots! YOU WIN!")
        else:
            print("\nOh no, a ghost got you! GAME OVER!")
        print(f"Final Score: {self.score}")


# --- Start the Game ---
if __name__ == "__main__":
    game = PacmanGame(LEVEL_MAP)
    game.play()