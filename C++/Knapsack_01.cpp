// File: Knapsack_01.cpp
// Purpose: Implementation of 0/1 Knapsack problem using Dynamic Programming.
// Author: Aakash (for Hacktoberfest-2025 repo)
//
// Problem summary:
// Given weights and values of N items, and a maximum capacity W,
// find the maximum total value that can be put in a knapsack of capacity W.
//
// Approach:
// - Build a DP table where dp[i][w] represents the maximum value achievable
//   with first i items and capacity w.
// - Recurrence:
//     if (weight[i-1] <= w)
//         dp[i][w] = max(value[i-1] + dp[i-1][w - weight[i-1]], dp[i-1][w]);
//     else
//         dp[i][w] = dp[i-1][w];
// - Time complexity: O(N * W)
// - Space complexity: O(N * W)  (can be optimized to O(W) if needed)

#include <bits/stdc++.h>
using namespace std;

int knapsack01(const vector<int>& wt, const vector<int>& val, int W) {
    int n = wt.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int w = 1; w <= W; ++w) {
            if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}

int main() {
    vector<int> weight = {1, 3, 4, 5};
    vector<int> value = {1, 4, 5, 7};
    int W = 7;

    cout << "Weights: ";
    for (int w : weight) cout << w << ' ';
    cout << "\nValues:  ";
    for (int v : value) cout << v << ' ';
    cout << "\nCapacity: " << W << "\n\n";

    int maxValue = knapsack01(weight, value, W);
    cout << "Maximum value in Knapsack = " << maxValue << "\n";

    // Expected output: 9
    // Explanation: Items with weight 3 and 4 give total value 4 + 5 = 9
    return 0;
}
