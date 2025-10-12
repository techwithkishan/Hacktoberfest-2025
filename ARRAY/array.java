import java.util.*;


public class array {
//bubble sort :
//time-complexity
// best case:O(n)
// AverageCAse:O(n^2)
//Worst Case:O(n^2)

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
    //Quick Sort
    //time-complexity
    // best:O(nlog n)
    // Average:0(n log n)
    // worst:O(n^2)

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }

        swap(arr, i + 1, high);
        return i + 1;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

// Merge Sort
// Time-Complexity:
// Best:O(log n)
// worst :O(n log n)
// Average :O(n log n)
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] L = new int[n1];
        int[] R = new int[n2];


        for (int i = 0; i < n1; i++)
            L[i] = arr[left + i];
        for (int j = 0; j < n2; j++)
            R[j] = arr[mid + 1 + j];

        int i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    
    public static void printArray(int[] arr) {
        for (int a : arr)
            System.out.print(a + " ");
        System.out.println();
    }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size of array: ");
        int size = sc.nextInt();

        int[] arr = new int[size];
        System.out.println("Enter " + size + " elements:");
        for (int i = 0; i < size; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("\nOriginal Array:");
        printArray(arr);

        System.out.println("\nChoose Sorting Algorithm:");
        System.out.println("1. Bubble Sort");
        System.out.println("2. Quick Sort");
        System.out.println("3. Merge Sort");
        System.out.print("Enter your choice: ");
        int choice = sc.nextInt();

        long startTime, endTime;

        switch (choice) {
            case 1:
                startTime = System.nanoTime();
                bubbleSort(arr);
                endTime = System.nanoTime();
                System.out.println("\nSorted using Bubble Sort:");
                printArray(arr);
                System.out.println("Execution Time: " + (endTime - startTime) + " ns");
                break;

            case 2:
                startTime = System.nanoTime();
                quickSort(arr, 0, arr.length - 1);
                endTime = System.nanoTime();
                System.out.println("\nSorted using Quick Sort:");
                printArray(arr);
                System.out.println("Execution Time: " + (endTime - startTime) + " ns");
                break;

            case 3:
                startTime = System.nanoTime();
                mergeSort(arr, 0, arr.length - 1);
                endTime = System.nanoTime();
                System.out.println("\nSorted using Merge Sort:");
                printArray(arr);
                System.out.println("Execution Time: " + (endTime - startTime) + " ns");
                break;

            default:
                System.out.println("Invalid choice!");
        }

        sc.close();
    }
}



        
