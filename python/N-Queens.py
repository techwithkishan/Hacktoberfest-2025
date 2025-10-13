def solve_n_queens(n: int) -> list[list[str]]:
    """
    Description:
    
    The N-Queens puzzle is the problem of placing N chess queens on an N x N chessboard so that no two queens threaten each other.

    Args:
        n: The size of the board and the number of queens.

    Returns:
        A list of all possible solutions. Each solution is represented as a list of strings, where 'Q' denotes a queen and '.' denotes an empty square.
    """
    solutions = []
    # Initialize the chessboard with empty squares.
    board = [['.' for _ in range(n)] for _ in range(n)]

    # Using sets for O(1) lookup to check if a column or diagonal is occupied. This is much more efficient than iterating through the board for each check.
    occupied_cols = set()
    # Major idea
    # For positive diagonals (top-left to bottom-right), (row - col) is constant.
    occupied_pos_diagonals = set()
    # For negative diagonals (top-right to bottom-left), (row + col) is constant.
    occupied_neg_diagonals = set()

    def backtrack(row):
        """
        Recursive function to place queens row by row to check the possibilities.
        """
        # Base case: If all queens are placed we've reached the end of the board.
        if row == n:
            # Whenever you find a valid solution, add it to the list of solutions.
            solution = ["".join(r) for r in board]
            solutions.append(solution)
            return

        # Try placing a queen in each column of the current row.
        for col in range(n):
            # Check if the current position is under attack. This check is O(1) due to the optimisation done using sets.
            if (col in occupied_cols or
                (row - col) in occupied_pos_diagonals or
                (row + col) in occupied_neg_diagonals):
                continue  # If the position is not correct, try the next column.

            board[row][col] = 'Q'
            occupied_cols.add(col)
            occupied_pos_diagonals.add(row - col)
            occupied_neg_diagonals.add(row + col)

            # Recursion for the next row
            backtrack(row + 1)

            # Backtrack to remove the queen and undo the changes to the sets to find other possibilities.
            board[row][col] = '.'
            occupied_cols.remove(col)
            occupied_pos_diagonals.remove(row - col)
            occupied_neg_diagonals.remove(row + col)

    # Start the backtracking process from the first row. This is a very important step.
    backtrack(0)
    return solutions

# Print the solutions
def print_solutions(solutions: list[list[str]]):
    if not solutions:
        print("No solutions found.")
        return
        
    print(f"Found {len(solutions)} solution(s).\n")
    for i, solution in enumerate(solutions):
        print(f"--- Solution {i + 1} ---")
        for row in solution:
            print(row)
        print()

# Example
if __name__ == "__main__":
    # Solve for an 8x8 board
    print("Solving for N = 8...")
    eight_queens_solutions = solve_n_queens(8)
    print_solutions(eight_queens_solutions)

    # Solve for a 4x4 board, which has fewer solutions
    print("\nSolving for N = 4...")
    four_queens_solutions = solve_n_queens(4)
    print_solutions(four_queens_solutions)

# Note: Complexity Analysis

# Time Complexity: O(N!)
#   - The problem is about finding a permutation of queen placements on the board
#   - The optimizations using sets help prune the search space significantly, but in the worst case, the time complexity remains O(N!)

# Space Complexity: O(N^2)
#   - The primary space cost is the N x N board itself, which requires O(N^2) space
#   - The recursion stack goes at most N levels deep, contributing O(N)
#   - The helper sets used for optimization also take O(N) space
#   - Therefore, the board size is the dominant factor