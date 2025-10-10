public class Rotate_Array {

    public static void reverse(int arr[],int a,int b){

        while(a<b){
            int t=arr[a];
            arr[a]=arr[b];
            arr[b]=t;
            a++;
            b--;
        }
    }
    public static void rotate1(int[] arr, int k) {

        k=k%arr.length;

        if(arr.length==1){
            return;
        }

        reverse(arr,0,arr.length-1);

        int a=0,b=k-1;
        reverse(arr, a, b);

        a=k;b=arr.length-1;
        reverse(arr, a, b);

    }

    public static void main(String[] args) {

        int[] nums ={1,2,3,4,5,6,7};
        int k = 2;

        rotate1(nums, k);

        for (int i : nums) {
            System.out.print(i+" ");
        }

    }
}
