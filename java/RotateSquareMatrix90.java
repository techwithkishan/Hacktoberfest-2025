public class RotateSquareMatrix90 {

    public static void rotateMatrix(int arr[][]) {

        int n=arr.length;

        int res[][]=new int[n][n];
        for (int i = 0; i < arr.length; i++) {

            for (int j = 0; j < arr.length; j++) {
                res[n-j-1][i]=arr[i][j];
            }
        }

        for (int i = 0; i < res.length; i++) {
            System.arraycopy(res, 0, arr, 0, n);
        }

        for (int i = 0; i < arr.length; i++) {

            for (int j = 0; j < arr.length; j++) {
                System.out.print(res[i][j]+" ");
            }
            System.out.println();
        }

    }

    public static void main(String[] args) {

        int[][] mat = {
                {1, 2, 3, 4},
                {5, 6, 7, 8},
                {9, 10, 11, 12},
                {13, 14, 15, 16}
        };

        rotateMatrix(mat);
    }
}
