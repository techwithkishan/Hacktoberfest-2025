#include <iostream>
#include <vector>
using namespace std;

void waveSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i += 2) {
        if (i > 0 && arr[i] < arr[i - 1])
            swap(arr[i], arr[i - 1]);
        if (i < n - 1 && arr[i] < arr[i + 1])
            swap(arr[i], arr[i + 1]);
    }
}

int main() {
    vector<int> arr = {3, 6, 5, 10, 7, 20};
    waveSort(arr);

    cout << "Wave Sorted Array: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
    return 0;
}