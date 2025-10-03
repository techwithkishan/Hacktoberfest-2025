import java.io.*;
import java.util.*;
import java.util.concurrent.PriorityBlockingQueue;

// Vehicle Class
class Vehicle implements Serializable {
    String type;   // Car, Bus, Ambulance
    int priority;  // Higher number = higher priority
    int id;

    Vehicle(int id, String type, int priority) {
        this.id = id;
        this.type = type;
        this.priority = priority;
    }

    public String toString() {
        return "Vehicle[ID=" + id + ", Type=" + type + ", Priority=" + priority + "]";
    }
}

// Traffic Signal (Runnable for Multithreading)
class TrafficSignal implements Runnable {
    String name;
    PriorityBlockingQueue<Vehicle> queue;

    TrafficSignal(String name) {
        this.name = name;
        this.queue = new PriorityBlockingQueue<>(10, (a, b) -> b.priority - a.priority);
    }

    public void addVehicle(Vehicle v) {
        queue.add(v);
        System.out.println(v + " entered at " + name);
    }

    @Override
    public void run() {
        try {
            while(true) {
                if(!queue.isEmpty()) {
                    Vehicle v = queue.poll();
                    System.out.println(name + " -> " + v + " passed the signal");
                    Thread.sleep(1000); // simulate passing time
                } else {
                    System.out.println(name + " is EMPTY");
                    Thread.sleep(2000);
                }
            }
        } catch (InterruptedException e) {
            System.out.println(name + " stopped.");
        }
    }
}

// Main Class
public class SmartTrafficSystem {
    public static void main(String[] args) throws Exception {
        // Create signals
        TrafficSignal signalA = new TrafficSignal("Signal A");
        TrafficSignal signalB = new TrafficSignal("Signal B");

        // Run signals in parallel
        Thread t1 = new Thread(signalA);
        Thread t2 = new Thread(signalB);
        t1.start();
        t2.start();

        // Add vehicles
        signalA.addVehicle(new Vehicle(1, "Car", 1));
        signalA.addVehicle(new Vehicle(2, "Ambulance", 5));
        signalB.addVehicle(new Vehicle(3, "Bus", 2));
        signalB.addVehicle(new Vehicle(4, "Car", 1));

        // Save logs to file
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("traffic_log.dat"))) {
            oos.writeObject(new Vehicle(5, "FireTruck", 4));
        }

        // Load logs
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("traffic_log.dat"))) {
            Vehicle v = (Vehicle) ois.readObject();
            System.out.println("Loaded from file: " + v);
        }
    }
}
