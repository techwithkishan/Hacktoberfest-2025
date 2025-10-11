import java.util.ArrayList;
import java.util.Scanner;

// Account class
class Account {
    int accountNumber;
    String name;
    double balance;

    Account(int accountNumber, String name, double balance) {
        this.accountNumber = accountNumber;
        this.name = name;
        this.balance = balance;
    }
}

// SBI Banking System class
class SBI {
    ArrayList<Account> accounts = new ArrayList<>();
    int nextAccountNumber = 1001; // Auto-increment account number

    // Create new account
    void createAccount(String name, double initialDeposit) {
        accounts.add(new Account(nextAccountNumber, name, initialDeposit));
        System.out.println("Account created successfully! Your Account Number: " + nextAccountNumber);
        nextAccountNumber++;
    }

    // Deposit money
    void deposit(int accountNumber, double amount) {
        Account acc = findAccount(accountNumber);
        if(acc != null){
            acc.balance += amount;
            System.out.println("Deposit successful! New Balance: $" + acc.balance);
        } else {
            System.out.println("Account not found.");
        }
    }

    // Withdraw money
    void withdraw(int accountNumber, double amount) {
        Account acc = findAccount(accountNumber);
        if(acc != null){
            if(amount <= acc.balance){
                acc.balance -= amount;
                System.out.println("Withdrawal successful! New Balance: $" + acc.balance);
            } else {
                System.out.println("Insufficient balance!");
            }
        } else {
            System.out.println("Account not found.");
        }
    }

    // Check balance
    void checkBalance(int accountNumber) {
        Account acc = findAccount(accountNumber);
        if(acc != null){
            System.out.println("Account Balance: $" + acc.balance);
        } else {
            System.out.println("Account not found.");
        }
    }

    // View account details
    void viewAccount(int accountNumber) {
        Account acc = findAccount(accountNumber);
        if(acc != null){
            System.out.println("\n--- Account Details ---");
            System.out.println("Account Number: " + acc.accountNumber);
            System.out.println("Account Holder: " + acc.name);
            System.out.println("Balance: $" + acc.balance);
        } else {
            System.out.println("Account not found.");
        }
    }

    // Find account by number
    private Account findAccount(int accountNumber) {
        for(Account acc : accounts){
            if(acc.accountNumber == accountNumber) return acc;
        }
        return null;
    }
}

// Main class
public class SBIBankingSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        SBI bank = new SBI();
        int choice;

        do {
            System.out.println("\n=== SBI Banking System ===");
            System.out.println("1. Create Account");
            System.out.println("2. Deposit Money");
            System.out.println("3. Withdraw Money");
            System.out.println("4. Check Balance");
            System.out.println("5. View Account Details");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch(choice) {
                case 1:
                    System.out.print("Enter your name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter initial deposit: ");
                    double deposit = sc.nextDouble();
                    sc.nextLine();
                    bank.createAccount(name, deposit);
                    break;
                case 2:
                    System.out.print("Enter account number: ");
                    int accNumDeposit = sc.nextInt();
                    System.out.print("Enter amount to deposit: ");
                    double depAmount = sc.nextDouble();
                    sc.nextLine();
                    bank.deposit(accNumDeposit, depAmount);
                    break;
                case 3:
                    System.out.print("Enter account number: ");
                    int accNumWithdraw = sc.nextInt();
                    System.out.print("Enter amount to withdraw: ");
                    double witAmount = sc.nextDouble();
                    sc.nextLine();
                    bank.withdraw(accNumWithdraw, witAmount);
                    break;
                case 4:
                    System.out.print("Enter account number: ");
                    int accNumBalance = sc.nextInt();
                    sc.nextLine();
                    bank.checkBalance(accNumBalance);
                    break;
                case 5:
                    System.out.print("Enter account number: ");
                    int accNumView = sc.nextInt();
                    sc.nextLine();
                    bank.viewAccount(accNumView);
                    break;
                case 6:
                    System.out.println("Exiting SBI Banking System...");
                    break;
                default:
                    System.out.println("Invalid choice! Try again.");
            }

        } while(choice != 6);

        sc.close();
    }
}
