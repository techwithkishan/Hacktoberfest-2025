import java.util.*;

class ParkingSpot {
    int spotNumber;
    boolean isAvailable;
    String vehicleNumber;
    Date parkedTime;

    public ParkingSpot(int spotNumber) {
        this.spotNumber = spotNumber;
        this.isAvailable = true;
    }

    public void parkVehicle(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
        this.isAvailable = false;
        this.parkedTime = new Date();
    }

    public void removeVehicle() {
        this.vehicleNumber = null;
        this.isAvailable = true;
        this.parkedTime = null;
    }
}

public class SmartParkingSystem {
    private static final int TOTAL_SPOTS = 10;
    private static final List<ParkingSpot> parkingSpots = new ArrayList<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        for (int i = 1; i <= TOTAL_SPOTS; i++) {
            parkingSpots.add(new ParkingSpot(i));
        }

        while (true) {
            System.out.println("\n===== 🚗 SMART PARKING SYSTEM =====");
            System.out.println("1. Park Vehicle");
            System.out.println("2. Remove Vehicle");
            System.out.println("3. Show Available Spots");
            System.out.println("4. Show Parked Vehicles");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1 -> parkVehicle(sc);
                case 2 -> removeVehicle(sc);
                case 3 -> showAvailableSpots();
                case 4 -> showParkedVehicles();
                case 5 -> {
                    System.out.println("Exiting system... Thank you!");
                    return;
                }
                default -> System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void parkVehicle(Scanner sc) {
        System.out.print("Enter vehicle number: ");
        String vehicleNumber = sc.next();

        for (ParkingSpot spot : parkingSpots) {
            if (spot.isAvailable) {
                spot.parkVehicle(vehicleNumber);
                System.out.println("✅ Vehicle parked at spot: " + spot.spotNumber);
                return;
            }
        }
        System.out.println("❌ No available parking spots!");
    }

    private static void removeVehicle(Scanner sc) {
        System.out.print("Enter spot number to free: ");
        int spotNumber = sc.nextInt();

        if (spotNumber < 1 || spotNumber > TOTAL_SPOTS) {
            System.out.println("Invalid spot number!");
            return;
        }

        ParkingSpot spot = parkingSpots.get(spotNumber - 1);
        if (spot.isAvailable) {
            System.out.println("⚠️ This spot is already empty!");
        } else {
            long parkedDuration = (new Date().getTime() - spot.parkedTime.getTime()) / 1000;
            double parkingFee = calculateFee(parkedDuration);
            System.out.println("🚗 Vehicle " + spot.vehicleNumber + " removed from spot " + spotNumber);
            System.out.println("🕒 Duration: " + parkedDuration + " seconds");
            System.out.println("💰 Parking Fee: ₹" + parkingFee);
            spot.removeVehicle();
        }
    }

    private static void showAvailableSpots() {
        System.out.println("\nAvailable Parking Spots:");
        for (ParkingSpot spot : parkingSpots) {
            if (spot.isAvailable) {
                System.out.print(spot.spotNumber + " ");
            }
        }
        System.out.println();
    }

    private static void showParkedVehicles() {
        System.out.println("\nCurrently Parked Vehicles:");
        for (ParkingSpot spot : parkingSpots) {
            if (!spot.isAvailable) {
                System.out.println("Spot " + spot.spotNumber + " → " + spot.vehicleNumber + " (Parked at: " + spot.parkedTime + ")");
            }
        }
    }

    private static double calculateFee(long seconds) {
        // Simple rate: ₹10 for first 60 seconds, ₹5 for every extra 60 seconds
        if (seconds <= 60) return 10;
        return 10 + ((seconds - 60) / 60) * 5;
    }
}
