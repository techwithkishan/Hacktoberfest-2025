#include <bits/stdc++.h>
using namespace std;

/*
Kruskal's Algorithm (Minimum Spanning Tree for undirected graphs)
Time Complexity: O(E log E) due to sorting edges and near-constant DSU ops
Space Complexity: O(V)
*/

struct DSU {
    int n; vector<int> p, r;
    DSU(int n=0): n(n), p(n), r(n,0) { iota(p.begin(), p.end(), 0); }
    int find(int x){ return p[x]==x?x:p[x]=find(p[x]); }
    bool unite(int a,int b){ a=find(a); b=find(b); if(a==b) return false; if(r[a]<r[b]) swap(a,b); p[b]=a; if(r[a]==r[b]) r[a]++; return true; }
};

struct KEdge { int u,v; long long w; };

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Input format (undirected graph):
    // n m
    // u v w  (m lines)

    int n,m;
    if(!(cin>>n>>m)){
        // Fallback demo
        n=4; m=5;
        vector<KEdge> edges={{0,1,1},{0,2,4},{1,2,2},{1,3,6},{2,3,3}};
        sort(edges.begin(), edges.end(), [](const KEdge&a,const KEdge&b){return a.w<b.w;});
        DSU dsu(n); long long total=0; vector<KEdge> chosen;
        for(auto &e:edges){ if(dsu.unite(e.u,e.v)){ total+=e.w; chosen.push_back(e);} }
        cout<<"MST_WEIGHT "<<total<<"\n";
        for(auto &e:chosen) cout<<e.u<<" "<<e.v<<" "<<e.w<<"\n";
        return 0;
    }

    vector<KEdge> edges; edges.reserve(m);
    for(int i=0;i<m;++i){ int u,v; long long w; cin>>u>>v>>w; edges.push_back({u,v,w}); }

    sort(edges.begin(), edges.end(), [](const KEdge&a,const KEdge&b){return a.w<b.w;});
    DSU dsu(n); long long total=0; vector<KEdge> chosen; chosen.reserve(n-1);
    int joins=0;
    for(auto &e:edges){ if(dsu.unite(e.u,e.v)){ total+=e.w; chosen.push_back(e); if(++joins==n-1) break; } }

    if(joins!=n-1) cout<<"DISCONNECTED\n";
    cout<<"MST_WEIGHT "<<total<<"\n";
    for(auto &e:chosen) cout<<e.u<<" "<<e.v<<" "<<e.w<<"\n";
    return 0;
}
