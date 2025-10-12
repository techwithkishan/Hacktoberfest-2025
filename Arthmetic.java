import java.util.*;

public class Arthmetic {
    public static int modInverse(int a, int m) {
        a = a % m;
        for (int x = 1; x < m; x++) {
            if ((a * x) % m == 1) {
                return x;
            }
        }
        return -1; // Inverse doesn't exist
    }

    public static int gcd(int a, int b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first number: ");
        int a, b;
        try {
            a = sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("Invalid input. Please enter an integer.");
            sc.close();
            return;
        }

        System.out.print("Enter Second Number: ");
        try {
            b = sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("Invalid input. Please enter an integer.");
            sc.close();
            return;
        }
        sc.close();

        int add = a + b;
        System.out.println("The Sum is: " + add);
        int sub = a - b;
        System.out.println("The Difference is: " + sub);
        double div = 1.0 * a / b;
        System.out.println("The Division is: " + div);
        int multi = a * b;
        System.out.println("The Multiplication is: " + multi);
        long exp = (long) Math.pow(a, b);
        System.out.println("The Exponent is: " + exp);
        double inverseA = 1.0 / a, inverseB = 1.0 / b;
        System.out.println("The Inverse of a is: " + inverseA);
        System.out.println("The Inverse of b is: " + inverseB);
        int modInv = modInverse(a, b);
        if (modInv == -1) {
            System.out.println("Modular Inverse doesn't exist");
        } else {
            System.out.println("The Modular Inverse is: " + modInv);
        }
        int mod = a % b;
        System.out.println("The Modulus is: " + mod);
        int gcdVal = gcd(a, b);
        System.out.println("The GCD is: " + gcdVal);
    }
}
