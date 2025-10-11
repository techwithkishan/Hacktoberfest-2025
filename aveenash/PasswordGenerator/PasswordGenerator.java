import java.util.Random;
import java.util.Scanner;

public class PasswordGenerator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();

        System.out.println("🔒 Welcome to Password Generator!");
        System.out.print("Enter password length: ");
        int length = sc.nextInt();

        // Characters to choose from
        String letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String digits = "0123456789";
        String symbols = "!@#$%^&*()-_=+[]{};:,.<>?";
        String allChars = letters + digits + symbols;

        StringBuilder password = new StringBuilder();

        // Generate random password
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(allChars.length());
            password.append(allChars.charAt(index));
        }

        System.out.println("Your secure password is: " + password);
        sc.close();
    }
}
