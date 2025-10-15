import java.util.*;

// OOP: BankAccount class (Encapsulation, Abstraction)
class BankAccount {
    private String accountHolder;
    private int accountNumber;
    private double balance;

    public BankAccount(String accountHolder, int accountNumber, double balance) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Synchronized methods for thread safety (Multithreading concept)
    public synchronized void deposit(double amount) {
        balance += amount;
        System.out.println(Thread.currentThread().getName() + " deposited " + amount + " | Balance: " + balance);
    }

    public synchronized void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
            System.out.println(Thread.currentThread().getName() + " withdrew " + amount + " | Balance: " + balance);
        } else {
            System.out.println(Thread.currentThread().getName() + " insufficient funds!");
        }
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    @Override
    public String toString() {
        return accountHolder + " [Acc No: " + accountNumber + ", Balance: " + balance + "]";
    }
}

// Multithreading: Deposit and Withdraw tasks
class BankTask implements Runnable {
    private BankAccount account;

    public BankTask(BankAccount account) {
        this.account = account;
    }

    @Override
    public void run() {
        Random rand = new Random();
        // Perform 5 random deposit/withdrawal operations
        for (int i = 0; i < 5; i++) {
            boolean depositOp = rand.nextBoolean();
            double amount = 500 + rand.nextInt(2000); // random amount between 500 and 2500
            if (depositOp) {
                account.deposit(amount);
            } else {
                account.withdraw(amount);
            }
            try {
                Thread.sleep(rand.nextInt(200)); // random short delay
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}

// Main class demonstrating OOP + Threads + Collections
public class BankSystem {
    public static void main(String[] args) {
        // Collections Framework: Using HashMap to store accounts
        Map<Integer, BankAccount> bankAccounts = new HashMap<>();

        // Creating accounts (OOP: objects)
        bankAccounts.put(101, new BankAccount("Alice", 101, 5000));
        bankAccounts.put(102, new BankAccount("Bob", 102, 3000));
        bankAccounts.put(103, new BankAccount("Charlie", 103, 7000));

        // Display all accounts using Collection
        System.out.println("=== All Bank Accounts ===");
        for (BankAccount acc : bankAccounts.values()) {
            System.out.println(acc);
        }

        // Multithreading: Each account will have multiple random transactions
        System.out.println("\n=== Starting Random Transactions (Multithreading) ===");
        List<Thread> threads = new ArrayList<>();

        for (BankAccount acc : bankAccounts.values()) {
            // 4 threads per account for random deposit/withdrawal
            for (int i = 1; i <= 4; i++) {
                Thread t = new Thread(new BankTask(acc), acc.getAccountHolder() + "-RandomThread" + i);
                threads.add(t);
                t.start();
            }
        }

        // Simultaneous overdraw attempts: 3 threads per account try to overdraw
        System.out.println("\n=== Simultaneous Overdraw Attempts ===");
        for (BankAccount acc : bankAccounts.values()) {
            double overdrawAmount = acc.getBalance() + 5000; // always more than available
            for (int i = 1; i <= 3; i++) {
                Thread t = new Thread(() -> acc.withdraw(overdrawAmount), acc.getAccountHolder() + "-OverdrawThread" + i);
                threads.add(t);
                t.start();
            }
        }

        // Wait for all threads to finish
        for (Thread t : threads) {
            try {
                t.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        // Final summary
        System.out.println("\n=== Final Account Balances ===");
        for (BankAccount acc : bankAccounts.values()) {
            System.out.println(acc);
        }
    }
}
