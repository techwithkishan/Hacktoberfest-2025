import java.util.ArrayList;
import java.util.Scanner;

class Book {
    String title;
    String author;
    boolean isAvailable;

    Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true;
    }
}

class Library {
    ArrayList<Book> books = new ArrayList<>();

    // Add a new book
    void addBook(String title, String author) {
        books.add(new Book(title, author));
        System.out.println("Book added successfully!");
    }

    // View all books
    void viewBooks() {
        System.out.println("\n--- Library Books ---");
        if (books.isEmpty()) {
            System.out.println("No books available.");
            return;
        }
        for (int i = 0; i < books.size(); i++) {
            Book b = books.get(i);
            System.out.println((i + 1) + ". " + b.title + " by " + b.author + " - " + (b.isAvailable ? "Available" : "Borrowed"));
        }
    }

    // Search books by title
    void searchBook(String title) {
        boolean found = false;
        for (Book b : books) {
            if (b.title.toLowerCase().contains(title.toLowerCase())) {
                System.out.println(b.title + " by " + b.author + " - " + (b.isAvailable ? "Available" : "Borrowed"));
                found = true;
            }
        }
        if (!found) System.out.println("Book not found.");
    }

    // Borrow a book
    void borrowBook(int index) {
        if (index < 0 || index >= books.size()) {
            System.out.println("Invalid book number.");
            return;
        }
        Book b = books.get(index);
        if (b.isAvailable) {
            b.isAvailable = false;
            System.out.println("You have borrowed: " + b.title);
        } else {
            System.out.println("Sorry, this book is already borrowed.");
        }
    }

    // Return a book
    void returnBook(int index) {
        if (index < 0 || index >= books.size()) {
            System.out.println("Invalid book number.");
            return;
        }
        Book b = books.get(index);
        if (!b.isAvailable) {
            b.isAvailable = true;
            System.out.println("You have returned: " + b.title);
        } else {
            System.out.println("This book was not borrowed.");
        }
    }
}

// Main class
public class LibraryManagementSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Library library = new Library();
        int choice;

        do {
            System.out.println("\n=== Library Management System ===");
            System.out.println("1. Add Book");
            System.out.println("2. View Books");
            System.out.println("3. Search Book");
            System.out.println("4. Borrow Book");
            System.out.println("5. Return Book");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter book title: ");
                    String title = sc.nextLine();
                    System.out.print("Enter book author: ");
                    String author = sc.nextLine();
                    library.addBook(title, author);
                    break;
                case 2:
                    library.viewBooks();
                    break;
                case 3:
                    System.out.print("Enter title to search: ");
                    String searchTitle = sc.nextLine();
                    library.searchBook(searchTitle);
                    break;
                case 4:
                    library.viewBooks();
                    System.out.print("Enter book number to borrow: ");
                    int borrowNum = sc.nextInt() - 1;
                    library.borrowBook(borrowNum);
                    break;
                case 5:
                    library.viewBooks();
                    System.out.print("Enter book number to return: ");
                    int returnNum = sc.nextInt() - 1;
                    library.returnBook(returnNum);
                    break;
                case 6:
                    System.out.println("Exiting Library System...");
                    break;
                default:
                    System.out.println("Invalid choice! Try again.");
            }

        } while (choice != 6);

        sc.close();
    }
}

