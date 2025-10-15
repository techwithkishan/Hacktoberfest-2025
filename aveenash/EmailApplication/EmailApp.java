import java.util.*;

class Email {
    private String firstName;
    private String lastName;
    private String password;
    private String department;
    private int mailboxCapacity = 500;
    private String alternateEmail;
    private String email;
    private String companySuffix = "company.com";

    // Constructor
    public Email(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;

        // Call a method to ask for department
        this.department = setDepartment();

        // Combine elements to generate email
        this.email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@" + department + "." + companySuffix;

        // Generate random password
        this.password = randomPassword(10);

        System.out.println("\nNew Employee: " + firstName + " " + lastName);
        System.out.println("Department: " + this.department);
        System.out.println("Email Created: " + this.email);
        System.out.println("Password: " + this.password);
    }

    // Ask for department
    private String setDepartment() {
        System.out.println("Department Codes:\n1. Sales\n2. Development\n3. Accounting\n0. None");
        System.out.print("Enter department code: ");
        Scanner in = new Scanner(System.in);
        int choice = in.nextInt();
        switch (choice) {
            case 1:
                return "sales";
            case 2:
                return "dev";
            case 3:
                return "acct";
            default:
                return "general";
        }
    }

    // Generate random password
    private String randomPassword(int length) {
        String passwordSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
        char[] password = new char[length];
        Random rand = new Random();
        for (int i = 0; i < length; i++) {
            int randIndex = rand.nextInt(passwordSet.length());
            password[i] = passwordSet.charAt(randIndex);
        }
        return new String(password);
    }

    // Set mailbox capacity
    public void setMailboxCapacity(int capacity) {
        this.mailboxCapacity = capacity;
    }

    // Set alternate email
    public void setAlternateEmail(String altEmail) {
        this.alternateEmail = altEmail;
    }

    // Change password
    public void changePassword(String password) {
        this.password = password;
    }

    // Get methods
    public int getMailboxCapacity() {
        return mailboxCapacity;
    }

    public String getAlternateEmail() {
        return alternateEmail;
    }

    public String getPassword() {
        return password;
    }

    public String showInfo() {
        return "\nEMPLOYEE INFORMATION\n" +
               "Name: " + firstName + " " + lastName +
               "\nCompany Email: " + email +
               "\nMailbox Capacity: " + mailboxCapacity + "MB" +
               "\nAlternate Email: " + alternateEmail;
    }
}

public class EmailApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter first name: ");
        String fname = sc.nextLine();
        System.out.print("Enter last name: ");
        String lname = sc.nextLine();

        Email em1 = new Email(fname, lname);

        System.out.print("\nDo you want to set an alternate email? (y/n): ");
        char ch = sc.next().charAt(0);
        if (ch == 'y' || ch == 'Y') {
            System.out.print("Enter alternate email: ");
            sc.nextLine(); // consume newline
            String alt = sc.nextLine();
            em1.setAlternateEmail(alt);
        }

        System.out.println(em1.showInfo());
    }
}

