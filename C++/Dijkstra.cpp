#include <bits/stdc++.h>
using namespace std;

/*
Dijkstra's Algorithm (Single-Source Shortest Paths for non-negative weights)
Time Complexity: O((V + E) log V) with binary heap (priority_queue)
Space Complexity: O(V + E)
*/

struct Edge { int to; long long w; };

vector<long long> dijkstra(int n, int src, const vector<vector<Edge>>& g) {
    const long long INF = (1LL<<62);
    vector<long long> dist(n, INF);
    vector<int> visited(n, 0);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d,u] = pq.top(); pq.pop();
        if (visited[u]) continue;
        visited[u] = 1;
        for (const auto& e : g[u]) {
            if (dist[e.to] > d + e.w) {
                dist[e.to] = d + e.w;
                pq.push({dist[e.to], e.to});
            }
        }
    }
    return dist;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Example usage:
    // n = number of vertices (0..n-1), m = number of edges
    // Input format example:
    // 5 6
    // 0 1 2
    // 0 2 5
    // 1 2 1
    // 1 3 2
    // 2 3 1
    // 3 4 3
    // src = 0

    int n, m; 
    if (!(cin >> n >> m)) {
        // Fallback demo graph if no input provided
        n = 5; m = 6;
        vector<tuple<int,int,int>> edges = {
            {0,1,2},{0,2,5},{1,2,1},{1,3,2},{2,3,1},{3,4,3}
        };
        vector<vector<Edge>> g(n);
        for (auto [u,v,w] : edges) { g[u].push_back({v,w}); g[v]; }
        int src = 0;
        auto dist = dijkstra(n, src, g);
        for (int i = 0; i < n; ++i) cout << (dist[i] >= (1LL<<61) ? -1 : dist[i]) << (i+1==n?'\n':' ');
        return 0;
    }

    vector<vector<Edge>> g(n);
    for (int i = 0; i < m; ++i) {
        int u, v; long long w; cin >> u >> v >> w;
        g[u].push_back({v, w}); // directed edge; duplicate line for undirected
    }
    int src; cin >> src;
    auto dist = dijkstra(n, src, g);
    for (int i = 0; i < n; ++i) cout << (dist[i] >= (1LL<<61) ? -1 : dist[i]) << (i+1==n?'\n':' ');
    return 0;
}
