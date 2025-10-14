#include <bits/stdc++.h>
using namespace std;

/*
Floyd–Warshall Algorithm (All-Pairs Shortest Paths)
- Works with negative edges; detects negative cycles.
Time Complexity: O(V^3)
Space Complexity: O(V^2)
*/

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Input format (directed graph):
    // n m
    // u v w  (m lines)

    int n, m;
    if (!(cin >> n >> m)) {
        // Fallback demo graph
        n = 4; m = 5;
        vector<tuple<int,int,long long>> es = {
            {0,1,5},{0,3,10},{1,2,3},{2,3,1},{3,0,-2}
        };
        const long long INF = (1LL<<60);
        vector<vector<long long>> dist(n, vector<long long>(n, INF));
        for (int i = 0; i < n; ++i) dist[i][i] = 0;
        for (auto [u,v,w] : es) dist[u][v] = min(dist[u][v], w);
        for (int k = 0; k < n; ++k)
            for (int i = 0; i < n; ++i)
                for (int j = 0; j < n; ++j)
                    if (dist[i][k] < INF && dist[k][j] < INF)
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
        bool neg = false;
        for (int i = 0; i < n; ++i) if (dist[i][i] < 0) neg = true;
        if (neg) cout << "NEGATIVE CYCLE\n";
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) cout << (dist[i][j] >= INF/2 ? -1 : dist[i][j]) << (j+1==n?'\n':' ');
        }
        return 0;
    }

    const long long INF = (1LL<<60);
    vector<vector<long long>> dist(n, vector<long long>(n, INF));
    for (int i = 0; i < n; ++i) dist[i][i] = 0;

    for (int i = 0; i < m; ++i) {
        int u, v; long long w; cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v], w);
    }

    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                if (dist[i][k] < INF && dist[k][j] < INF)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);

    bool neg = false;
    for (int i = 0; i < n; ++i) if (dist[i][i] < 0) neg = true;
    if (neg) cout << "NEGATIVE CYCLE\n";

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) cout << (dist[i][j] >= INF/2 ? -1 : dist[i][j]) << (j+1==n?'\n':' ');
    }

    return 0;
}
