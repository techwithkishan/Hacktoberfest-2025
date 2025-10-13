def solve_sudoku(board: list[list[int]]) -> bool:
    """
     Args:
        board: A 9x9 list of lists representing the Sudoku puzzle.

    Return:
        True if a solution was found, False otherwise. The board argument is modified in-place if a solution is found.
    """
    # Pre-populate sets with the numbers already on the board for O(1) lookups. This is a major optimization that can be seen in action in the backtrack function

    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    empty_cells = []

    for r in range(9):
        for c in range(9):
            if board[r][c] != 0:
                num = board[r][c]
                box_id = (r // 3) * 3 + (c // 3)
                rows[r].add(num)
                cols[c].add(num)
                boxes[box_id].add(num)
            else:
                empty_cells.append((r, c))

    def backtrack(cell_index):
        """
        Recursive function to help us fill the board using backtracking
        """
        # Base case: If we have filled all empty cells, a solution is found return True
        if cell_index == len(empty_cells):
            return True

        r, c = empty_cells[cell_index]
        box_id = (r // 3) * 3 + (c // 3)
        
        # Try placing numbers 1 through 9 in the current empty cell
        for num in range(1, 10):
            # Check if the number is valid for the current position based on the number placed earlier
            # This is O(1) due to pre-populated sets, major optimization over O(9) scans
            if num not in rows[r] and num not in cols[c] and num not in boxes[box_id]:
                
                board[r][c] = num
                rows[r].add(num)
                cols[c].add(num)
                boxes[box_id].add(num)
                
                # Recursion for the next empty cell
                if backtrack(cell_index + 1):
                    return True # Solution found, return True up the call stack
                
                # Backtrack
                # If the recursive call did not find a solution, undo the move
                board[r][c] = 0
                rows[r].remove(num)
                cols[c].remove(num)
                boxes[box_id].remove(num)
        
        # If no number from 1-9 works in this cell, return False to trigger backtracking
        return False

    return backtrack(0)

# Prints the Sudoku board
def print_board(board: list[list[int]], title: str):
    print(title)
    for i in range(9):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - - - ")
        for j in range(9):
            if j % 3 == 0 and j != 0:
                print(" | ", end="")
            
            if j == 8:
                print(board[i][j])
            else:
                print(str(board[i][j]) + " ", end="")
    print()


# Example
if __name__ == "__main__":
    puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]

    print_board(puzzle, "Original Puzzle:")
    
    if solve_sudoku(puzzle):
        print_board(puzzle, "Solved Puzzle:")
    else:
        print("No solution exists for the given puzzle.")

# Note: Complexity Analysis

# Let M be the number of empty cells on the board.

# Time Complexity: O(9^M)
#   1. In the worst case, the algorithm must try all possible numbers (1-9) for each of the M empty cells
#   2. This creates a search tree with a branching factor of up to 9 and a depth of M, leading to an exponential runtime of 9^M

# Space Complexity: O(M)
#   1. The space is dominated by the depth of the recursion stack. In the worst case, the stack can go M levels deep, one for each empty cell
#   2. The board (9x9) and the helper sets for rows, columns, and boxes occupy a constant amount of space, O(1), as their size does not depend on the input puzzle's difficulty