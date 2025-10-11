// Rock, Paper, Scissors Game in Java
// Created in a simple and human-friendly way 😊

import java.util.Random;
import java.util.Scanner;

public class RockPaperScissor {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        Random random = new Random();

        System.out.println("🎮 Welcome to Rock, Paper, Scissors Game!");
        System.out.println("------------------------------------------");


        while (true) {
            System.out.println("\nChoose one:");
            System.out.println("1. Rock");
            System.out.println("2. Paper");
            System.out.println("3. Scissors");
            System.out.println("4. Exit");

            System.out.print("👉 Enter your choice (1-4): ");
            int userChoice = sc.nextInt();

       
            if (userChoice == 4) {
                System.out.println("👋 Thanks for playing! Goodbye!");
                break;
            }

            if (userChoice < 1 || userChoice > 4) {
                System.out.println("❌ Invalid choice! Please choose between 1 and 4.");
                continue;
            }

            // Computer makes a random choice (1 to 3)
            int computerChoice = random.nextInt(3) + 1;

            // Display what both chose
            System.out.println("\nYou chose: " + getChoiceName(userChoice));
            System.out.println("Computer chose: " + getChoiceName(computerChoice));

            // Decide winner
            if (userChoice == computerChoice) {
                System.out.println("🤝 It's a tie!");
            } 
            else if ((userChoice == 1 && computerChoice == 3) ||
                     (userChoice == 2 && computerChoice == 1) ||
                     (userChoice == 3 && computerChoice == 2)) {
                System.out.println("🎉 You win!");
            } 
            else {
                System.out.println("💻 Computer wins!");
            }
        }

        sc.close(); // Close scanner to avoid resource leak
    }

    // Helper function to convert number to choice name
    public static String getChoiceName(int choice) {
        switch (choice) {
            case 1: return "Rock 🪨";
            case 2: return "Paper 📄";
            case 3: return "Scissors ✂️";
            default: return "Invalid";
        }
    }
}
