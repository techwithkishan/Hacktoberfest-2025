
// Problem Link: https://leetcode.com/problems/maximum-units-on-a-truck/description/
// Q-1710. Maximum Units on a Truck

import java.util.Arrays;

public class FractionalKnapsack {

    public static void main(String[] args) {
        int[][] boxTypes = {{1, 3}, {2, 2}, {3, 1}};
        int truckSize = 4;
        FractionalKnapsack solution = new FractionalKnapsack();
        System.out.println(solution.maximumUnits(boxTypes, truckSize));
    }

    public int maximumUnits(int[][] boxTypes, int truckSize) {

  

        // Sort on the basis of number Of Units Per Box in descending order.
        Arrays.sort(boxTypes, (a, b) -> Integer.compare(b[1], a[1]));
        int max = 0;
        for(int i = 0;i<boxTypes.length;i++){
            if(truckSize-boxTypes[i][0]>=0){  // checking that if currbox will fits in the remaining space available
                max += boxTypes[i][0]*boxTypes[i][1];
                truckSize -= boxTypes[i][0];
            }else{
                max += truckSize * boxTypes[i][1];  // if entire box doesn't fits in we will fill some units and the space will exhauxt after this
                break;  // so we stops
            }
        }
        return max;
    }
}

