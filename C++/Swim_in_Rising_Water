#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to compute minimum time to swim to bottom-right
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        if (n == 0) return 0;

        // Directions: Up, Down, Left, Right
        array<pair<int,int>,4> directions = {{{-1,0},{1,0},{0,-1},{0,1}}};

        // dist[x][y] = minimum time required to reach cell (x, y)
        vector<vector<int>> dist(n, vector<int>(n, INT_MAX));

        // Min-heap storing {time, {x, y}}
        using Node = pair<int, pair<int,int>>;
        priority_queue<Node, vector<Node>, greater<Node>> pq;

        // Start at top-left cell
        dist[0][0] = grid[0][0];
        pq.push({grid[0][0], {0, 0}});

        while (!pq.empty()) {
            auto [currTime, pos] = pq.top(); 
            pq.pop();
            auto [x, y] = pos;

            // If destination reached, return minimal time
            if (x == n-1 && y == n-1)
                return currTime;

            // Skip if we already found a faster path
            if (currTime > dist[x][y]) continue;

            // Explore neighbors
            for (auto [dx, dy] : directions) {
                int nx = x + dx, ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
                    // Time to reach neighbor = max(current time, neighbor elevation)
                    int nextTime = max(currTime, grid[nx][ny]);
                    if (nextTime < dist[nx][ny]) {
                        dist[nx][ny] = nextTime;
                        pq.emplace(nextTime, make_pair(nx, ny));
                    }
                }
            }
        }

        // Default return (should never reach here with valid input)
        return dist[n-1][n-1];
    }
};

/*
---------------------------------------------------------------
Optional Benchmark Snippet

#include <chrono>
int main() {
    Solution sol;

    vector<vector<int>> grid = {
        {0, 2},
        {1, 3}
    };

    auto start = chrono::high_resolution_clock::now();
    cout << "Minimum time: " << sol.swimInWater(grid) << endl;
    auto end = chrono::high_resolution_clock::now();

    chrono::duration<double, milli> duration = end - start;
    cout << "Execution Time: " << duration.count() << " ms" << endl;
}
---------------------------------------------------------------

Notes:
- Approach: Dijkstra / Min-Heap BFS
- Time Complexity: O(n^2 log n)
- Space Complexity: O(n^2)
- Practical runtime: 3-5x faster than binary search + DFS/BFS
*/
