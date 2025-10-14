// File: DijkstraShortestPath.cpp
// Purpose: Implementation of Dijkstra's shortest path algorithm with
//          clear, human-friendly comments, example graph, and sample I/O.
// Compile: g++ -std=c++17 DijkstraShortestPath.cpp -O2 -o dijkstra
// Run:     ./dijkstra
//
// What this does (plain English):
//   Given a directed/undirected weighted graph with non-negative edge weights,
//   this program computes the shortest distance from a chosen source vertex
//   to every other vertex using Dijkstra's algorithm (min-priority queue).
//
// Notes:
// - Uses adjacency list representation: vector<vector<pair<int,int>>> adj
//   where adj[u] contains pairs (v, w) meaning an edge u -> v with weight w.
// - Time complexity: O((V + E) log V) using a binary heap (priority_queue).
// - Space complexity: O(V + E) for adjacency list + O(V) for distance array.
//
// Author: Aakash (example style), explained for readability.

#include <bits/stdc++.h>
using namespace std;

// Simple alias to make pair usage clearer
using pii = pair<int, int>;

// Dijkstra implementation:
// V   : number of vertices (0..V-1)
// src : source vertex
// adj : adjacency list, adj[u] contains (v, weight)
vector<int> dijkstra(int V, int src, const vector<vector<pii>>& adj) {
    // distances initialized to "infinity"
    const int INF = INT_MAX / 4; // avoid overflow when adding
    vector<int> dist(V, INF);
    dist[src] = 0;

    // min-heap priority queue: (distance, vertex)
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        // Important optimization: skip if we popped a stale entry
        // (we might have pushed a better distance for u later).
        if (d > dist[u]) continue;

        // relax all edges from u
        for (const auto& edge : adj[u]) {
            int v = edge.first;
            int w = edge.second;

            // if going through u gives a shorter path to v, update it
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }

    return dist;
}

// Utility: Print distances in a human-friendly table
void printDistances(const vector<int>& dist, int src) {
    cout << "Vertex\tDistance from source (" << src << ")\n";
    for (int i = 0; i < (int)dist.size(); ++i) {
        if (dist[i] >= (INT_MAX / 4)) cout << i << "\t" << "INF\n";
        else cout << i << "\t" << dist[i] << "\n";
    }
}

// Example usage with a small graph.
// You can replace this graph with custom input or adapt to read from stdin.
int main() {
    // We'll build a graph with 6 vertices (0..5).
    int V = 6;
    vector<vector<pii>> adj(V);

    // Example edges (undirected or directed depending on how you add them)
    // Format: adj[u].push_back({v, weight});
    //
    // Graph structure (example):
    // 0 --(7)--> 1
    // 0 --(9)--> 2
    // 0 --(14)-> 5
    // 1 --(10)-> 2
    // 1 --(15)-> 3
    // 2 --(11)-> 3
    // 2 --(2)--> 5
    // 3 --(6)--> 4
    // 4 --(9)--> 5
    //
    // This is the classic Dijkstra example graph. Edges below are treated as undirected:
    auto add_edge_undirected = [&](int u, int v, int w) {
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    };

    add_edge_undirected(0, 1, 7);
    add_edge_undirected(0, 2, 9);
    add_edge_undirected(0, 5, 14);
    add_edge_undirected(1, 2, 10);
    add_edge_undirected(1, 3, 15);
    add_edge_undirected(2, 3, 11);
    add_edge_undirected(2, 5, 2);
    add_edge_undirected(3, 4, 6);
    add_edge_undirected(4, 5, 9);

    int source = 0; // choose source vertex
    vector<int> dist = dijkstra(V, source, adj);

    // Print results
    printDistances(dist, source);

    // Example output interpretation (for this graph):
    // Vertex  Distance from source (0)
    // 0       0
    // 1       7
    // 2       9
    // 3       20
    // 4       20
    // 5       11
    //
    // Explanation (short):
    // - best path 0->1 is weight 7
    // - best path 0->2 is weight 9
    // - best path 0->5 is 0->2->5 = 9 + 2 = 11
    // - best path 0->3 is 0->2->3 = 9 + 11 = 20 (or 0->1->3 = 7 + 15 = 22, so 20 is better)
    // - best path 0->4 is 0->2->5->4 = 9 + 2 + 9 = 20

    return 0;
}
