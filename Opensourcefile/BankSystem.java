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
        account.deposit(2000);
        account.withdraw(1000);
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

        // Multithreading: Each account will have multiple transactions
        System.out.println("\n=== Starting Transactions (Multithreading) ===");
        List<Thread> threads = new ArrayList<>();

        for (BankAccount acc : bankAccounts.values()) {
            Thread t1 = new Thread(new BankTask(acc), acc.getAccountHolder() + "-Thread1");
            Thread t2 = new Thread(new BankTask(acc), acc.getAccountHolder() + "-Thread2");
            threads.add(t1);
            threads.add(t2);
            t1.start();
            t2.start();
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
