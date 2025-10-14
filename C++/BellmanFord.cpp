#include <bits/stdc++.h>
using namespace std;

/*
Bellman-Ford Algorithm (Single-Source Shortest Paths with negative edges)
- Detects negative-weight cycles reachable from source.
Time Complexity: O(V * E)
Space Complexity: O(V + E)
*/

struct BF_Edge { int u, v; long long w; };

pair<vector<long long>, bool> bellman_ford(int n, int src, const vector<BF_Edge>& edges) {
    const long long INF = (1LL<<62);
    vector<long long> dist(n, INF);
    dist[src] = 0;
    // Relax edges V-1 times
    for (int i = 0; i < n - 1; ++i) {
        bool any = false;
        for (const auto& e : edges) {
            if (dist[e.u] == INF) continue;
            if (dist[e.v] > dist[e.u] + e.w) {
                dist[e.v] = dist[e.u] + e.w;
                any = true;
            }
        }
        if (!any) break;
    }
    // Check for negative cycle reachable from src
    bool neg_cycle = false;
    for (const auto& e : edges) {
        if (dist[e.u] == (1LL<<62)) continue;
        if (dist[e.v] > dist[e.u] + e.w) { neg_cycle = true; break; }
    }
    return {dist, neg_cycle};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Input format example (directed graph):
    // n m
    // u v w  (m lines)
    // src

    int n, m;
    if (!(cin >> n >> m)) {
        // Fallback demo
        n = 5; m = 7; int src = 0;
        vector<BF_Edge> edges = {
            {0,1,6},{0,2,7},{1,2,8},{1,3,5},{1,4,-4},{2,3,-3},{3,1,-2}
        };
        auto [dist, neg] = bellman_ford(n, src, edges);
        if (neg) { cout << "NEGATIVE CYCLE\n"; return 0; }
        for (int i = 0; i < n; ++i) cout << (dist[i] >= (1LL<<61) ? -1 : dist[i]) << (i+1==n?'\n':' ');
        return 0;
    }

    vector<BF_Edge> edges; edges.reserve(m);
    for (int i = 0; i < m; ++i) {
        int u, v; long long w; cin >> u >> v >> w;
        edges.push_back({u, v, w});
    }
    int src; cin >> src;
    auto [dist, neg] = bellman_ford(n, src, edges);
    if (neg) { cout << "NEGATIVE CYCLE\n"; return 0; }
    for (int i = 0; i < n; ++i) cout << (dist[i] >= (1LL<<61) ? -1 : dist[i]) << (i+1==n?'\n':' ');
    return 0;
}
