import java.util.*;

// OOP: Book class
class Book {
    private String title;
    private String author;
    private boolean isBorrowed;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

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

// OOP: Member class implements Runnable (Multithreading)
class Member implements Runnable {
    private String name;
    private List<Book> libraryBooks;

    public Member(String name, List<Book> libraryBooks) {
        this.name = name;
        this.libraryBooks = libraryBooks;
    }

    @Override
    public void run() {
        for (Book book : libraryBooks) {
            synchronized (book) {
                if (book.borrow()) {
                    System.out.println(name + " borrowed \"" + book.getTitle() + "\"");
                    try {
                        Thread.sleep(1000); // simulating reading time
                    } catch (InterruptedException e) {}
                    book.returnBook();
                    System.out.println(name + " returned \"" + book.getTitle() + "\"");
                } else {
                    System.out.println(name + " tried to borrow \"" + book.getTitle() + "\" but it was already borrowed");
                }
            }
        }
    }
}

// Main class
public class LibrarySystem {
    public static void main(String[] args) {
        // Collections Framework: store books
        List<Book> books = new ArrayList<>();
        books.add(new Book("Java Programming", "James Gosling"));
        books.add(new Book("Effective Java", "Joshua Bloch"));
        books.add(new Book("Clean Code", "Robert C. Martin"));

        // Collections Framework: store members
        List<Member> members = new ArrayList<>();
        members.add(new Member("Alice", books));
        members.add(new Member("Bob", books));
        members.add(new Member("Charlie", books));

        // Multithreading: each member tries to borrow books concurrently
        List<Thread> threads = new ArrayList<>();
        for (Member member : members) {
            Thread t = new Thread(member);
            threads.add(t);
            t.start();
        }

        // Wait for all threads to finish
        for (Thread t : threads) {
            try {
                t.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        // Final library book status
        System.out.println("\n=== Final Book Status ===");
        for (Book book : books) {
            System.out.println(book);
        }
    }
}
