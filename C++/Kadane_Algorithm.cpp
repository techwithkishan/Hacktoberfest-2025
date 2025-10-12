#include <iostream>
#include <vector>
using namespace std;

// Function to implement Kadane's Algorithm
int kadane(const vector<int>& nums) {
    int max_current = nums[0];
    int max_global = nums[0];

    for (size_t i = 1; i < nums.size(); ++i) {
        max_current+= nums[i];
        if(max_current<0){
            max_current=0;
        }
        max_global = max(max_global, max_current);
    }
    return max_global;
}

int main() {
    vector<int> arr = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Maximum subarray sum is " << kadane(arr) << endl;
    return 0;
}