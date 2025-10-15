// File: MergeSort.cpp
// Purpose: Clean, commented implementation of Merge Sort (divide & conquer).
// Compile: g++ -std=c++17 MergeSort.cpp -O2 -o mergesort
// Run (example): ./mergesort
//
// What this does (plain English):
//   Merge Sort splits the array into halves recursively, sorts each half,
//   and then merges the two sorted halves. It's stable and runs in O(n log n).
//
// Author: Aakash (example style). Written to be beginner-friendly and easy to review.

#include <bits/stdc++.h>
using namespace std;

// Merge two sorted subarrays arr[l..m] and arr[m+1..r]
void mergeRange(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    // Temporary vectors
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

    // Merge back into arr[l..r]
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {         // stable: <= keeps original order for equal elements
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    // Copy remaining elements if any
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Main recursive merge sort function
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;            // base case: zero or one element
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);          // sort left half
    mergeSort(arr, m + 1, r);      // sort right half
    mergeRange(arr, l, m, r);      // merge sorted halves
}

// Utility to print array
void printArray(const vector<int>& arr) {
    for (int x : arr) cout << x << ' ';
    cout << '\n';
}

int main() {
    // Example: you can replace this with custom input or adapt to read from stdin
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    cout << "Original array:\n";
    printArray(arr);

    mergeSort(arr, 0, (int)arr.size() - 1);

    cout << "Sorted array (ascending):\n";
    printArray(arr);

    // Expected output:
    // Original array:
    // 38 27 43 3 9 82 10
    // Sorted array (ascending):
    // 3 9 10 27 38 43 82

    return 0;
}
