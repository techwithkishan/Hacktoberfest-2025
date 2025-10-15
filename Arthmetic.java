import java.util.*;

// Custom Exception for overflow conditions
class OverflowException extends Exception {
    public OverflowException(String message) {
        super(message);
    }
}

// Custom Exception for division by zero
class DivisionByZeroException extends Exception {
    public DivisionByZeroException(String message) {
        super(message);
    }
}

public class Arthmetic {
    // Method to compute the modular inverse
    public static long modInverse(long a, long m) {
        a = a % m;
        for (long x = 1; x < m; x++) {
            if ((a * x) % m == 1) {
                return x;
            }
        }
        return -1; // Inverse doesn't exist
    }

    // Method to compute the greatest common divisor
    public static long gcd(long a, long b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    public static void main(String[] args) {
        long a = 0, b = 0, add, sub, multi, exp, modInv, mod, gcdVal;
        System.out.println("Welcome to Arthmetic Operations!");
        System.out.println("You will be prompted to enter two integers (a and b).");
        System.out.println("The program will compute and display the following operations:");
        System.out.println("Addition, Subtraction, Multiplication, Division, Exponentiation, Inverse, Modular Inverse, Modulus, and GCD.");
        System.out.println("Note: Division by zero and exponentiation overflow will be handled with appropriate messages.");
        System.out.println("Let's get started!");
        try(Scanner sc = new Scanner(System.in);) {
            System.out.print("Press Enter to continue...");
            sc.nextLine();
            System.out.print("Enter First number: ");
            a = sc.nextLong();
            if (a > Integer.MAX_VALUE || a < Integer.MIN_VALUE) {
                throw new OverflowException("First number is out of bounds.");
            }
            System.out.print("Enter Second Number: ");
            b = sc.nextLong();
            if (b > Integer.MAX_VALUE || b < Integer.MIN_VALUE) {
                throw new OverflowException("Second number is out of bounds.");
            }
        } catch (InputMismatchException e) {
            System.err.println("Invalid Input! Please enter Integer values!");
            return;
        } catch (OverflowException e) {
            System.out.println(e.getMessage());
            return; // Terminate early in case of overflow
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return; // Terminate early if there's an unexpected error
        }

        // Perform calculations with exception handling
        try {
            add = a + b;
            System.out.println("The Sum is: " + add);

            sub = a - b;
            System.out.println("The Difference is: " + sub);

            // Handling division by zero
            if (b == 0) {
                throw new DivisionByZeroException("Division by zero is not allowed.");
            } else {
                double div = 1.0 * a / b;
                System.out.println("The Division is: " + div);
            }

            multi = a * b;
            System.out.println("The Multiplication is: " + multi);

            // Handling potential overflow for exponentiation
            exp = (long) Math.pow(a, b);
            if (exp == Long.MAX_VALUE) {
                throw new OverflowException("Exponentiation overflow occurred.");
            }
            System.out.println("The Exponent is: " + exp);

            // Inverse of a and b (handling zero cases)
            if (a == 0) {
                System.out.println("Inverse of a is undefined.");
            } else {
                double inverseA = 1.0 / a;
                System.out.println("The Inverse of a is: " + inverseA);
            }

            if (b == 0) {
                System.out.println("Inverse of b is undefined.");
            } else {
                double inverseB = 1.0 / b;
                System.out.println("The Inverse of b is: " + inverseB);
            }

            // Modulo inverse calculation
            modInv = modInverse(a, b);
            if (modInv == -1) {
                System.out.println("Modular Inverse doesn't exist.");
            } else {
                System.out.println("The Modular Inverse is: " + modInv);
            }

            mod = a % b;
            System.out.println("The Modulus is: " + mod);

            gcdVal = gcd(a, b);
            System.out.println("The GCD is: " + gcdVal);
        } catch (DivisionByZeroException e) {
            System.out.println(e.getMessage());
        } catch (OverflowException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        }
    }
}
