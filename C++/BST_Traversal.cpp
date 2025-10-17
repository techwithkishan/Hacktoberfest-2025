// File: BST_Traversal.cpp
// Purpose: Demonstrate Binary Search Tree (BST) insertion and traversal methods.
// Author: Aakash (Hacktoberfest 2025 - Day 4)
//
// Problem summary:
//  - Build a Binary Search Tree from given keys.
//  - Perform Inorder, Preorder, and Postorder traversals.
//
// BST properties:
//   For each node:
//     - Left subtree has values < node->data
//     - Right subtree has values > node->data
//
// Time complexity: O(n)
// Space complexity: O(h) for recursion stack (h = height of tree)

#include <bits/stdc++.h>
using namespace std;

// Define a node structure for the BST
struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Insert a node into BST
Node* insert(Node* root, int key) {
    if (!root) return new Node(key);
    if (key < root->data)
        root->left = insert(root->left, key);
    else if (key > root->data)
        root->right = insert(root->right, key);
    return root;
}

// Inorder traversal (Left, Root, Right)
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

// Preorder traversal (Root, Left, Right)
void preorder(Node* root) {
    if (!root) return;
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

// Postorder traversal (Left, Right, Root)
void postorder(Node* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}

int main() {
    vector<int> keys = {50, 30, 70, 20, 40, 60, 80};

    Node* root = nullptr;
    for (int key : keys)
        root = insert(root, key);

    cout << "Binary Search Tree created with keys: ";
    for (int k : keys) cout << k << " ";
    cout << "\n\n";

    cout << "Inorder traversal (sorted): ";
    inorder(root);
    cout << "\n";

    cout << "Preorder traversal: ";
    preorder(root);
    cout << "\n";

    cout << "Postorder traversal: ";
    postorder(root);
    cout << "\n";

    // Expected output (may vary by formatting):
    // Inorder  : 20 30 40 50 60 70 80
    // Preorder : 50 30 20 40 70 60 80
    // Postorder: 20 40 30 60 80 70 50

    return 0;
}
