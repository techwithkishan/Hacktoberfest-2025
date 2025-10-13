public class FractionalKnapsack {
    private Integer[][] dp;
    public static void main(String[] args) {
        int[][] boxTypes = {{1, 3}, {2, 2}, {3, 1}};
        int truckSize = 4;
        FractionalKnapsack solution = new FractionalKnapsack();
        System.out.println(solution.maximumUnits(boxTypes, truckSize));
    }
    
    public int maximumUnits(int[][] boxTypes, int truckSize) {
        dp = new Integer[boxTypes.length][truckSize + 1];
        return put(boxTypes, 0, truckSize, 0);
    }
    
    public int put(int[][] arr, int index, int size, int value){

        if(size < 0){
            return -1;
        }

        if(index >= arr.length){
            return value;
        }
        if(dp[index][size] != null){
            return dp[index][size];
        }

        int res1 = put(arr, index + 1, size, value);
        int res2 = -1;

        for(int i = 1; i <= arr[index][0]; i++){
            res2 = Math.max(res2, put(arr, index + 1, size - i, value + arr[index][1] * i));
        }
        
        dp[index][size] = Math.max(res1, res2);
        return dp[index][size];
    }
}

