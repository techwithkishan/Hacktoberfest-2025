import java.util.ArrayList;
import java.util.Scanner;

// Patient class to store patient details
class Patient {
    int id;
    String name;
    int age;
    String disease;

    Patient(int id, String name, int age, String disease) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.disease = disease;
    }
}

// Hospital Management System class
class Hospital {
    ArrayList<Patient> patients = new ArrayList<>();
    int nextId = 1; // Auto-increment ID

    // Add new patient
    void addPatient(String name, int age, String disease) {
        patients.add(new Patient(nextId, name, age, disease));
        System.out.println("Patient added with ID: " + nextId);
        nextId++;
    }

    // View all patients
    void viewPatients() {
        if (patients.isEmpty()) {
            System.out.println("No patients found.");
            return;
        }
        System.out.println("\n--- Patient Records ---");
        for (Patient p : patients) {
            System.out.println("ID: " + p.id + ", Name: " + p.name + ", Age: " + p.age + ", Disease: " + p.disease);
        }
    }

    // Update patient details
    void updatePatient(int id, String name, int age, String disease) {
        for (Patient p : patients) {
            if (p.id == id) {
                p.name = name;
                p.age = age;
                p.disease = disease;
                System.out.println("Patient details updated.");
                return;
            }
        }
        System.out.println("Patient with ID " + id + " not found.");
    }

    // Delete patient
    void deletePatient(int id) {
        for (int i = 0; i < patients.size(); i++) {
            if (patients.get(i).id == id) {
                patients.remove(i);
                System.out.println("Patient record deleted.");
                return;
            }
        }
        System.out.println("Patient with ID " + id + " not found.");
    }
}

// Main class
public class HospitalManagementSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Hospital hospital = new Hospital();
        int choice;

        do {
            System.out.println("\n=== Hospital Management System ===");
            System.out.println("1. Add Patient");
            System.out.println("2. View Patients");
            System.out.println("3. Update Patient");
            System.out.println("4. Delete Patient");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter patient name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter age: ");
                    int age = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter disease: ");
                    String disease = sc.nextLine();
                    hospital.addPatient(name, age, disease);
                    break;
                case 2:
                    hospital.viewPatients();
                    break;
                case 3:
                    hospital.viewPatients();
                    System.out.print("Enter patient ID to update: ");
                    int updateId = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter new name: ");
                    String newName = sc.nextLine();
                    System.out.print("Enter new age: ");
                    int newAge = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter new disease: ");
                    String newDisease = sc.nextLine();
                    hospital.updatePatient(updateId, newName, newAge, newDisease);
                    break;
                case 4:
                    hospital.viewPatients();
                    System.out.print("Enter patient ID to delete: ");
                    int deleteId = sc.nextInt();
                    sc.nextLine();
                    hospital.deletePatient(deleteId);
                    break;
                case 5:
                    System.out.println("Exiting Hospital Management System...");
                    break;
                default:
                    System.out.println("Invalid choice! Try again.");
            }
        } while (choice != 5);

        sc.close();
    }
}

