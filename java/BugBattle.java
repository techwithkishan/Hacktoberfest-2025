import java.util.*;

public class BugBattle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();
        int playerHealth = 100;
        int bugHealth = 100;

        System.out.println("🐞 A Wild BUG Appeared!");
        System.out.println("Fix it before it crashes your code!\n");

        while (playerHealth > 0 && bugHealth > 0) {
            System.out.println("Your HP: " + playerHealth + " | Bug HP: " + bugHealth);
            System.out.print("Choose: [1] Attack [2] Defend [3] Heal → ");
            int choice = sc.nextInt();

            int bugMove = random.nextInt(3) + 1; // bug’s move

            if (choice == 1) {
                int dmg = random.nextInt(20) + 5;
                bugHealth -= dmg;
                System.out.println("💥 You hit the bug for " + dmg + " damage!");
            } else if (choice == 2) {
                System.out.println("🛡️ You defend. Reduced damage this turn!");
            } else if (choice == 3) {
                int heal = random.nextInt(15) + 5;
                playerHealth = Math.min(100, playerHealth + heal);
                System.out.println("💊 You restored " + heal + " HP!");
            }

            // Bug attacks
            if (bugHealth > 0) {
                int bugDmg = random.nextInt(20) + 5;
                if (choice == 2) bugDmg /= 2;
                playerHealth -= bugDmg;
                System.out.println("🐞 Bug bites you for " + bugDmg + " damage!");
            }

            System.out.println("---------------------------------");
        }

        if (playerHealth <= 0) System.out.println("💀 You were defeated by the bug!");
        else System.out.println("🎉 You squashed the bug successfully!");
        sc.close();
    }
}
