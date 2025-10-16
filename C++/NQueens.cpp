// Program: N-Queens Problem using Backtracking
// Concept: Place N queens on an NxN chessboard such that
//             no two queens attack each other.
// Language: C++
// Contribution for Hacktoberfest 2025

#include <iostream>
#include <vector>
using namespace std;

// Function to print the chessboard configuration
void printBoard(const vector<vector<int>>& board, int N) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << (board[i][j] ? "Q " : ". ");
        }
        cout << endl;
    }
    cout << endl;
}

// Function to check if placing a queen at (row, col) is safe
bool isSafe(const vector<vector<int>>& board, int row, int col, int N) {
    // Check column
    for (int i = 0; i < row; i++)
        if (board[i][col])
            return false;

    // Check upper-left diagonal
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false;

    // Check upper-right diagonal
    for (int i = row - 1, j = col + 1; i >= 0 && j < N; i--, j++)
        if (board[i][j])
            return false;

    return true;
}

// Recursive function to solve the N-Queens problem
bool solveNQueens(vector<vector<int>>& board, int row, int N) {
    // Base condition: all queens placed
    if (row == N) {
        printBoard(board, N);
        return true;
    }

    bool res = false;
    for (int col = 0; col < N; col++) {
        if (isSafe(board, row, col, N)) {
            board[row][col] = 1;  // Place queen
            res = solveNQueens(board, row + 1, N) || res; // Recursive call
            board[row][col] = 0;  // Backtrack
        }
    }
    return res;
}

// Main function
int main() {
    int N;
    cout << "Enter the number of Queens (N): ";
    cin >> N;

    vector<vector<int>> board(N, vector<int>(N, 0));

    cout << "\nAll possible solutions for " << N << "-Queens:\n\n";
    if (!solveNQueens(board, 0, N)) {
        cout << "No solution exists for " << N << " queens." << endl;
    }

    return 0;
}
