#include <bits/stdc++.h>
using namespace std;

class SegmentTree {
private:
    vector<int> tree;
    int n;
    bool isMinTree; // true for min tree, false for max tree

    int combine(int a, int b) {
        return isMinTree ? min(a, b) : max(a, b);
    }

    void build(vector<int> &arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
        } else {
            int mid = (start + end) / 2;
            build(arr, 2*node, start, mid);
            build(arr, 2*node+1, mid+1, end);
            tree[node] = combine(tree[2*node], tree[2*node+1]);
        }
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid)
                update(2*node, start, mid, idx, val);
            else
                update(2*node+1, mid+1, end, idx, val);
            tree[node] = combine(tree[2*node], tree[2*node+1]);
        }
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) {
            return isMinTree ? INT_MAX : INT_MIN;
        }
        if (l <= start && end <= r) {
            return tree[node];
        }
        int mid = (start + end) / 2;
        int p1 = query(2*node, start, mid, l, r);
        int p2 = query(2*node+1, mid+1, end, l, r);
        return combine(p1, p2);
    }

public:
    SegmentTree(vector<int> &arr, bool minTree=true) {
        n = arr.size();
        isMinTree = minTree;
        tree.resize(4*n);
        build(arr, 1, 0, n-1);
    }

    void update(int idx, int val) {
        update(1, 0, n-1, idx, val);
    }

    int query(int l, int r) {
        return query(1, 0, n-1, l, r);
    }
};

// Example usage
int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    SegmentTree segTree(arr, true); // true = min tree
    cout << "Min in range [1,4]: " << segTree.query(1,4) << endl;
    segTree.update(1, 0);
    cout << "Min in range [1,4] after update: " << segTree.query(1,4) << endl;
    return 0;
}
