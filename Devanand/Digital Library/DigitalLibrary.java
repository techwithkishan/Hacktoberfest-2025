import java.io.*;
import java.util.*;

// Book class (OOP)
class Book implements Serializable {
    private int id;
    private String title;
    private String author;
    private String genre;
    private int availableCopies;

    public Book(int id, String title, String author, String genre, int availableCopies) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.availableCopies = availableCopies;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getGenre() { return genre; }
    public int getAvailableCopies() { return availableCopies; }

    public void borrowBook() { if (availableCopies > 0) availableCopies--; }
    public void returnBook() { availableCopies++; }

    @Override
    public String toString() {
        return "[" + id + "] " + title + " by " + author + " | Genre: " + genre + " | Copies: " + availableCopies;
    }
}

// User class (OOP)
class User implements Serializable {
    private int id;
    private String name;
    private List<Integer> borrowedBooks;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = new ArrayList<>();
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public List<Integer> getBorrowedBooks() { return borrowedBooks; }

    public void borrowBook(int bookId) { borrowedBooks.add(bookId); }
    public void returnBook(int bookId) { borrowedBooks.remove(Integer.valueOf(bookId)); }

    @Override
    public String toString() {
        return "User [" + id + "] " + name + " | Borrowed: " + borrowedBooks;
    }
}

// Library class (Collections + File Handling)
class Library {
    private Map<Integer, Book> books = new HashMap<>();
    private Map<Integer, User> users = new HashMap<>();

    private final String BOOKS_FILE = "books.dat";
    private final String USERS_FILE = "users.dat";

    public Library() {
        loadData();
    }

    // Add book
    public void addBook(Book book) {
        books.put(book.getId(), book);
        saveData();
    }

    // Add user
    public void addUser(User user) {
        users.put(user.getId(), user);
        saveData();
    }

    // Borrow book
    public void borrowBook(int userId, int bookId) {
        User user = users.get(userId);
        Book book = books.get(bookId);
        if (user != null && book != null && book.getAvailableCopies() > 0) {
            book.borrowBook();
            user.borrowBook(bookId);
            System.out.println(user.getName() + " borrowed " + book.getTitle());
        } else {
            System.out.println("Borrowing failed!");
        }
        saveData();
    }

    // Return book
    public void returnBook(int userId, int bookId) {
        User user = users.get(userId);
        Book book = books.get(bookId);
        if (user != null && book != null && user.getBorrowedBooks().contains(bookId)) {
            book.returnBook();
            user.returnBook(bookId);
            System.out.println(user.getName() + " returned " + book.getTitle());
        } else {
            System.out.println("Return failed!");
        }
        saveData();
    }

    // Show all books
    public void showBooks() {
        for (Book b : books.values()) {
            System.out.println(b);
        }
    }

    // Show all users
    public void showUsers() {
        for (User u : users.values()) {
            System.out.println(u);
        }
    }

    // Save data to file (serialization)
    private void saveData() {
        try (ObjectOutputStream out1 = new ObjectOutputStream(new FileOutputStream(BOOKS_FILE));
             ObjectOutputStream out2 = new ObjectOutputStream(new FileOutputStream(USERS_FILE))) {
            out1.writeObject(books);
            out2.writeObject(users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Load data from file
    private void loadData() {
        try (ObjectInputStream in1 = new ObjectInputStream(new FileInputStream(BOOKS_FILE));
             ObjectInputStream in2 = new ObjectInputStream(new FileInputStream(USERS_FILE))) {
            books = (Map<Integer, Book>) in1.readObject();
            users = (Map<Integer, User>) in2.readObject();
        } catch (Exception e) {
            // first run (files may not exist)
            books = new HashMap<>();
            users = new HashMap<>();
        }
    }
}

// Main class (User interaction)
public class DigitalLibrary {
    public static void main(String[] args) {
        Library library = new Library();
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n===== Digital Library Menu =====");
            System.out.println("1. Add Book");
            System.out.println("2. Add User");
            System.out.println("3. Borrow Book");
            System.out.println("4. Return Book");
            System.out.println("5. Show All Books");
            System.out.println("6. Show All Users");
            System.out.println("0. Exit");
            System.out.print("Choose: ");

            int choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1 -> {
                    System.out.print("Enter Book ID: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter Title: ");
                    String title = sc.nextLine();
                    System.out.print("Enter Author: ");
                    String author = sc.nextLine();
                    System.out.print("Enter Genre: ");
                    String genre = sc.nextLine();
                    System.out.print("Enter Available Copies: ");
                    int copies = sc.nextInt();
                    library.addBook(new Book(id, title, author, genre, copies));
                }
                case 2 -> {
                    System.out.print("Enter User ID: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter User Name: ");
                    String name = sc.nextLine();
                    library.addUser(new User(id, name));
                }
                case 3 -> {
                    System.out.print("Enter User ID: ");
                    int uid = sc.nextInt();
                    System.out.print("Enter Book ID: ");
                    int bid = sc.nextInt();
                    library.borrowBook(uid, bid);
                }
                case 4 -> {
                    System.out.print("Enter User ID: ");
                    int uid = sc.nextInt();
                    System.out.print("Enter Book ID: ");
                    int bid = sc.nextInt();
                    library.returnBook(uid, bid);
                }
                case 5 -> library.showBooks();
                case 6 -> library.showUsers();
                case 0 -> {
                    System.out.println("Exiting...");
                    return;
                }
                default -> System.out.println("Invalid choice!");
            }
        }
    }
}
