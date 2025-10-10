import java.util.*;
import java.util.concurrent.*;

// OOP: TrafficSignal class represents each signal in the city
class TrafficSignal {
    private String location;
    private boolean greenLight;

    public TrafficSignal(String location) {
        this.location = location;
        this.greenLight = false;
    }

    public synchronized void turnGreen() {
        greenLight = true;
        System.out.println("🚦 Signal at " + location + " is now GREEN!");
    }

    public synchronized void turnRed() {
        greenLight = false;
        System.out.println("🚦 Signal at " + location + " is now RED!");
    }

    public synchronized boolean isGreen() {
        return greenLight;
    }

    public String getLocation() {
        return location;
    }
}

// OOP + Multithreading: Vehicle class implementing Runnable
class Vehicle implements Runnable {
    private String vehicleId;
    private TrafficSignal signal;

    public Vehicle(String vehicleId, TrafficSignal signal) {
        this.vehicleId = vehicleId;
        this.signal = signal;
    }

    @Override
    public void run() {
        System.out.println("🚗 " + vehicleId + " is waiting at " + signal.getLocation());
        try {
            synchronized (signal) {
                while (!signal.isGreen()) {
                    signal.wait();  // wait until the signal turns green
                }
                System.out.println("✅ " + vehicleId + " passed through " + signal.getLocation());
            }
        } catch (InterruptedException e) {
            System.out.println(vehicleId + " interrupted!");
        }
    }
}

// Controller to manage multiple signals
class TrafficController implements Runnable {
    private List<TrafficSignal> signals;

    public TrafficController(List<TrafficSignal> signals) {
        this.signals = signals;
    }

    @Override
    public void run() {
        try {
            while (true) {
                for (TrafficSignal signal : signals) {
                    synchronized (signal) {
                        signal.turnGreen();
                        signal.notifyAll();  // allow vehicles to move
                    }
                    Thread.sleep(3000); // green for 3 seconds
                    signal.turnRed();
                    Thread.sleep(1000); // small pause before next signal
                }
            }
        } catch (InterruptedException e) {
            System.out.println("Traffic controller stopped!");
        }
    }
}

// Main driver
public class SmartTrafficSystem {
    public static void main(String[] args) {
        // Collections Framework: Store signals
        List<TrafficSignal> signals = new ArrayList<>();
        signals.add(new TrafficSignal("Crossroad A"));
        signals.add(new TrafficSignal("Crossroad B"));
        signals.add(new TrafficSignal("Crossroad C"));

        // Start traffic controller (multithreading)
        Thread controller = new Thread(new TrafficController(signals), "TrafficController");
        controller.start();

        // Create vehicles for each signal
        List<Thread> vehicles = new ArrayList<>();
        int id = 1;
        for (TrafficSignal s : signals) {
            for (int i = 0; i < 3; i++) {  // 3 vehicles per signal
                Thread v = new Thread(new Vehicle("Vehicle-" + (id++), s));
                vehicles.add(v);
                v.start();
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {}
            }
        }
    }
}
