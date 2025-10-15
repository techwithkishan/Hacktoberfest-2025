import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * The Book class represents a single book with a title, author, and borrowing status
 * Methods to borrow and return are synchronized to ensure thread-safety
 */

class Book {
    private String title;
    private String author;
    private boolean isBorrowed;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

    // Synchronized methods ensure that only one thread can borrow or return a book at a time
    public synchronized boolean borrow() {
        if (!isBorrowed) {
            isBorrowed = true;
            return true;
        }
        return false;
    }

    public synchronized void returnBook() {
        isBorrowed = false;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return title + " by " + author + (isBorrowed ? " (Borrowed)" : " (Available)");
    }
}

/**
 * The Library class is implemented as a thread-safe Singleton
 * This ensures that there is only one instance of the library throughout the application
 * providing a single, centralized point of access to the book collection
 */

class Library {
    // The 'volatile' keyword ensures that multiple threads handle the 'instance' variable correctly when it is being initialized to the Singleton instance
    private static volatile Library instance;
    private List<Book> books;

    // The constructor is private to prevent instantiation from other classes
    private Library() {
        // Initialize the library's book collection here
        books = new ArrayList<>();
        books.add(new Book("Java Programming", "James Gosling"));
        books.add(new Book("Effective Java", "Joshua Bloch"));
        books.add(new Book("Clean Code", "Robert C. Martin"));
    }

    /**
     * Provides the global access point to the Singleton Library instance.
     * Uses double-checked locking for thread-safe and efficient lazy initialization.
     */
    public static Library getInstance() {
        // First check (not synchronized) for performance.
        if (instance == null) {
            // Synchronize on the class object to ensure only one thread can create the instance
            synchronized (Library.class) {

                // Synchronized to prevent race conditions

                if (instance == null) {
                    instance = new Library();
                }
            }
        }
        return instance;
    }

    // Provides access to the library's book collection
    public List<Book> getBooks() {
        return Collections.unmodifiableList(books); // Return an unmodifiable list for safety.
    }
}


/**
 * The Member class represents a library member who can borrow books.
 * It implements Runnable to simulate concurrent borrowing by multiple members.
 */

class Member implements Runnable {
    private String name;

    public Member(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        // The member gets the book list directly from the single Library instance
        List<Book> libraryBooks = Library.getInstance().getBooks();

        for (Book book : libraryBooks) {
            // The synchronized block on the 'book' object ensures they prevent race conditions
            synchronized (book) {
                if (book.borrow()) {
                    System.out.println(name + " borrowed \"" + book.getTitle() + "\"");
                    try {
                        // Simulating the time a member spends with the book.
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                    book.returnBook();
                    System.out.println(name + " returned \"" + book.getTitle() + "\"");
                } else {
                    System.out.println(name + " tried to borrow \"" + book.getTitle() + "\" but it was already borrowed.");
                }
            }
        }
    }
}

/**
 * The Main class to run the library simulation
 */

public class LibrarySystem {
    public static void main(String[] args) {
        System.out.println("Library simulation started.");

        // Get the single instance of the Library
        Library library = Library.getInstance();

        // Create members as they no longer need the book list passed to them
        List<Thread> threads = new ArrayList<>();
        threads.add(new Thread(new Member("Alice")));
        threads.add(new Thread(new Member("Bob")));
        threads.add(new Thread(new Member("Charlie")));

        // Start all threads to simulate concurrent borrowing
        for (Thread t : threads) {
            t.start();
        }

        // Wait for all threads to complete their execution
        for (Thread t : threads) {
            try {
                t.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        /// Final library book status
        System.out.println("\n=== Final Book Status ===");
        for (Book book : library.getBooks()) {
            System.out.println(book);
        }
    }
}