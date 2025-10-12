#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int total = n * (n + 1) / 2;
        int sum = 0;

        for (int num : nums)
            sum += num;

        return total - sum;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {3, 0, 1};
    cout << "Missing Number: " << sol.missingNumber(nums) << endl;
    return 0;
}
