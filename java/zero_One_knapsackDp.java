
// 0-1 Knapsack Problem using Dynamic Programming
//Leetcode Problem (416)- Partition Equal Subset Sum
//Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.


public class zero_One_knapsackDp {
    public static void main(String[] args) {
        int[] nums = {1, 5, 11, 5};
        zero_One_knapsackDp solution = new zero_One_knapsackDp();
        System.out.println(solution.canPartition(nums));
    }
    public boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        if (totalSum % 2 != 0) return false;
        int targetSum = totalSum / 2;
        boolean[] dp = new boolean[targetSum + 1];
        dp[0] = true;
        for (int num : nums) {
            for (int currSum = targetSum; currSum >= num; currSum--) {
                dp[currSum] = dp[currSum] || dp[currSum - num];
                if (dp[targetSum]) return true;
            }
        }
        return dp[targetSum];
    }
    
}
    

