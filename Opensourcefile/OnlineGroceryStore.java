import java.util.*;

// OOP: Product class
class Product {
    private String name;
    private int stock;
    private double price;

    public Product(String name, int stock, double price) {
        this.name = name;
        this.stock = stock;
        this.price = price;
    }

    public synchronized boolean purchase(int quantity) {
        if (stock >= quantity) {
            stock -= quantity;
            return true;
        }
        return false;
    }

    public String getName() {
        return name;
    }

    public int getStock() {
        return stock;
    }

    @Override
    public String toString() {
        return name + " | Stock: " + stock + " | Price: $" + price;
    }
}

// OOP + Multithreading: Customer class implements Runnable
class Customer implements Runnable {
    private String name;
    private List<Product> products;

    public Customer(String name, List<Product> products) {
        this.name = name;
        this.products = products;
    }

    @Override
    public void run() {
        Random rand = new Random();
        for (int i = 0; i < 3; i++) { // Each customer tries 3 purchases
            Product p = products.get(rand.nextInt(products.size()));
            int quantity = rand.nextInt(3) + 1; // buy 1-3 units
            synchronized (p) {
                if (p.purchase(quantity)) {
                    System.out.println(name + " purchased " + quantity + " of " + p.getName());
                } else {
                    System.out.println(name + " tried to purchase " + quantity + " of " + p.getName() + " but stock is insufficient");
                }
            }
            try { Thread.sleep(500); } catch (InterruptedException e) {}
        }
    }
}

// Main class
public class OnlineGroceryStore {
    public static void main(String[] args) {
        // Collections Framework: Store products
        List<Product> products = new ArrayList<>();
        products.add(new Product("Apple", 10, 0.5));
        products.add(new Product("Milk", 5, 1.2));
        products.add(new Product("Bread", 8, 1.0));
        products.add(new Product("Eggs", 12, 0.2));

        // Create customers
        List<Customer> customers = new ArrayList<>();
        customers.add(new Customer("Alice", products));
        customers.add(new Customer("Bob", products));
        customers.add(new Customer("Charlie", products));

        // Multithreading: Start customer orders
        List<Thread> threads = new ArrayList<>();
        for (Customer c : customers) {
            Thread t = new Thread(c);
            threads.add(t);
            t.start();
        }

        // Wait for all threads to finish
        for (Thread t : threads) {
            try { t.join(); } catch (InterruptedException e) { e.printStackTrace(); }
        }

        // Final stock
        System.out.println("\n=== Final Product Stock ===");
        for (Product p : products) {
            System.out.println(p);
        }
    }
}
