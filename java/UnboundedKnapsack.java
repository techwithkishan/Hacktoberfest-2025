
//Unbounded Knapsack Problem using Dynamic Programming
//Leetcode Coin Change 2 Problem

public class UnboundedKnapsack {
    public static void main(String[] args) {
        int amount = 5;
        int[] coins = {1, 2, 5};
        UnboundedKnapsack solution = new UnboundedKnapsack();
        System.out.println(solution.change(amount, coins));
    }
   
    public int change(int amount, int[] coins) {
        int[][] dp = new int[amount + 1][coins.length + 1];
        // Base case: There's only one way to make the amount 0 that is by choosing no coins
        for (int j = 0; j <= coins.length; j++) {
            dp[0][j] = 1;
        }

        for (int amt = 1; amt <= amount; amt++) {
            for (int j = 1; j <= coins.length; j++) {
                int pick = 0;
                if (amt >= coins[j - 1]) {
                    pick = dp[amt - coins[j - 1]][j]; // pick coin j-1
                }
                int noPick = dp[amt][j - 1]; // don’t pick coin j-1
                dp[amt][j] = pick + noPick;
            }
        }
        return dp[amount][coins.length];
    }

}
