import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.PriorityBlockingQueue;

// Vehicle Class
class Vehicle implements Serializable {
    String type;   // Car, Bus, Ambulance, FireTruck
    int priority;  // Higher number = higher priority
    int id;
    long arrivalTime;

    Vehicle(int id, String type, int priority) {
        this.id = id;
        this.type = type;
        this.priority = priority;
        this.arrivalTime = System.currentTimeMillis();
    }

    public String toString() {
        return "Vehicle[ID=" + id + ", Type=" + type + ", Priority=" + priority + "]";
    }
}

// Traffic Signal (Runnable for Multithreading)
class TrafficSignal implements Runnable {
    String name;
    PriorityBlockingQueue<Vehicle> queue;
    int totalPassed = 0;
    int emergencyCount = 0;

    TrafficSignal(String name) {
        this.name = name;
        this.queue = new PriorityBlockingQueue<>(10, (a, b) -> b.priority - a.priority);
    }

    public void addVehicle(Vehicle v) {
        queue.add(v);
        logEvent(v + " entered at " + name);
    }

    private void logEvent(String msg) {
        String timestamp = new SimpleDateFormat("HH:mm:ss").format(new Date());
        System.out.println("[" + timestamp + "] " + msg);
        try (FileWriter fw = new FileWriter("traffic_log.txt", true)) {
            fw.write("[" + timestamp + "] " + msg + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                if (!queue.isEmpty()) {
                    Vehicle v = queue.poll();
                    long waitTime = (System.currentTimeMillis() - v.arrivalTime)/1000;
                    logEvent(name + " -> " + v + " passed the signal after " + waitTime + "s wait");
                    totalPassed++;
                    if(v.type.equalsIgnoreCase("Ambulance") || v.type.equalsIgnoreCase("FireTruck") || v.type.equalsIgnoreCase("Police")) {
                        emergencyCount++;
                    }
                    // Dynamic sleep: higher priority passes faster
                    Thread.sleep(Math.max(200, 1000 - v.priority*150));
                } else {
                    logEvent(name + " is EMPTY");
                    Thread.sleep(1500);
                }
            }
        } catch (InterruptedException e) {
            logEvent(name + " stopped.");
        }
    }

    public void printStats() {
        System.out.println(name + " Stats: Total Passed=" + totalPassed + ", Emergency Vehicles=" + emergencyCount);
    }
}

// Vehicle Generator Thread
class VehicleGenerator implements Runnable {
    TrafficSignal[] signals;
    Random rand = new Random();
    int vehicleId = 10;

    VehicleGenerator(TrafficSignal[] signals) {
        this.signals = signals;
    }

    @Override
    public void run() {
        String[] types = {"Car", "Bus", "Ambulance", "FireTruck"};
        int[] priorities = {1, 2, 5, 4};
        try {
            while (true) {
                Thread.sleep(rand.nextInt(3000) + 1000);
                int idx = rand.nextInt(signals.length);
                int typeIdx = rand.nextInt(types.length);
                Vehicle v = new Vehicle(vehicleId++, types[typeIdx], priorities[typeIdx]);
                signals[idx].addVehicle(v);
            }
        } catch (InterruptedException e) {
            System.out.println("VehicleGenerator stopped.");
        }
    }
}

// Main Class
public class SmartTrafficSystemAdvanced {
    public static void main(String[] args) throws Exception {
        TrafficSignal signalA = new TrafficSignal("Signal A");
        TrafficSignal signalB = new TrafficSignal("Signal B");

        Thread t1 = new Thread(signalA);
        Thread t2 = new Thread(signalB);
        t1.start();
        t2.start();

        TrafficSignal[] signals = {signalA, signalB};
        Thread generator = new Thread(new VehicleGenerator(signals));
        generator.start();

        // Add some initial vehicles
        signalA.addVehicle(new Vehicle(1, "Car", 1));
        signalA.addVehicle(new Vehicle(2, "Ambulance", 5));
        signalB.addVehicle(new Vehicle(3, "Bus", 2));
        signalB.addVehicle(new Vehicle(4, "Car", 1));

        // Run for 20 seconds then shutdown
        Thread.sleep(20000);
        t1.interrupt();
        t2.interrupt();
        generator.interrupt();

        t1.join();
        t2.join();
        generator.join();

        // Print final stats
        signalA.printStats();
        signalB.printStats();
    }
}
