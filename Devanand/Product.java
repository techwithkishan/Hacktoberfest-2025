
import java.util.*;

class Product {
    int id;
    String name;
    double price;
    int popularity; // higher = more recommended

    // Constructor
    Product(int id, String name, double price, int popularity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.popularity = popularity;
    }

    public void display() {
        System.out.println("ID: " + id + " | " + name + " | $" + price + " | Popularity: " + popularity);
    }
}

public class ShoppingCart {
    static ArrayList<Product> cart = new ArrayList<>();
    static HashMap<Integer, Product> catalog = new HashMap<>();
    static HashMap<String, Double> coupons = new HashMap<>();
    static Queue<Product> wishlist = new LinkedList<>();
    static PriorityQueue<Product> recommendations = new PriorityQueue<>((a, b) -> b.popularity - a.popularity);

    // Add product to cart
    public static void addToCart(int id) {
        if (catalog.containsKey(id)) {
            cart.add(catalog.get(id));
            System.out.println(catalog.get(id).name + " added to cart!");
        } else {
            System.out.println("Product not found!");
        }
    }

    // Remove product
    public static void removeFromCart(int id) {
        cart.removeIf(p -> p.id == id);
        System.out.println("Product removed from cart!");
    }

    // View cart
    public static void viewCart() {
        if(cart.isEmpty()) {
            System.out.println("Cart is empty!");
        } else {
            for(Product p : cart) {
                p.display();
            }
        }
    }

    // Sort cart by price
    public static void sortCartByPrice() {
        cart.sort((a, b) -> Double.compare(a.price, b.price));
        System.out.println("Cart sorted by price!");
        viewCart();
    }

    // Apply coupon
    public static void applyCoupon(String code) {
        double total = calculateTotal();
        if(coupons.containsKey(code)) {
            double discount = coupons.get(code);
            total -= total * discount;
            System.out.println("Coupon applied! Final Price: $" + total);
        } else {
            System.out.println("Invalid coupon!");
        }
    }

    // Calculate total
    public static double calculateTotal() {
        double sum = 0;
        for(Product p : cart) sum += p.price;
        return sum;
    }

    // Show recommendations
    public static void showRecommendations() {
        System.out.println("Recommended Products:");
        int count = 0;
        for(Product p : recommendations) {
            if(count++ >= 3) break;
            p.display();
        }
    }

    public static void main(String[] args) {
        // Product Catalog
        catalog.put(1, new Product(1, "Laptop", 800, 95));
        catalog.put(2, new Product(2, "Phone", 500, 90));
        catalog.put(3, new Product(3, "Headphones", 100, 85));
        catalog.put(4, new Product(4, "Smartwatch", 200, 80));

        // Coupons
        coupons.put("NEW10", 0.10);
        coupons.put("SALE20", 0.20);

        // Recommendations
        recommendations.addAll(catalog.values());

        // Demo
        addToCart(1);
        addToCart(3);
        viewCart();

        System.out.println("Sorting by price:");
        sortCartByPrice();

        System.out.println("Total before coupon: $" + calculateTotal());
        applyCoupon("NEW10");

        showRecommendations();
    }
}
