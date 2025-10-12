import java.util.*;
import java.util.concurrent.*;

// OOP: Sensor class
class Sensor {
    private String type;
    private double value;

    public Sensor(String type) {
        this.type = type;
        this.value = 0;
    }

    public synchronized void updateValue(double value) {
        this.value = value;
        System.out.println(Thread.currentThread().getName() + " - " + type + " Sensor updated: " + value);
    }

    public synchronized double getValue() {
        return value;
    }

    public String getType() {
        return type;
    }
}

// Multithreading: SensorSimulator implements Runnable
class SensorSimulator implements Runnable {
    private Sensor sensor;
    private Random random = new Random();

    public SensorSimulator(Sensor sensor) {
        this.sensor = sensor;
    }

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            double newValue = 0;
            switch (sensor.getType()) {
                case "Temperature": newValue = 20 + random.nextDouble() * 15; break;
                case "Humidity": newValue = 30 + random.nextDouble() * 50; break;
                case "Wind Speed": newValue = 0 + random.nextDouble() * 20; break;
            }
            sensor.updateValue(newValue);

            try {
                Thread.sleep(1000); // wait 1 sec before next reading
            } catch (InterruptedException e) {}
        }
    }
}

// Main Weather Monitoring System
public class WeatherMonitoringSystem {
    public static void main(String[] args) {
        // Collections Framework: Store sensors
        List<Sensor> sensors = new ArrayList<>();
        sensors.add(new Sensor("Temperature"));
        sensors.add(new Sensor("Humidity"));
        sensors.add(new Sensor("Wind Speed"));

        // Multithreading: Start sensor simulators
        List<Thread> threads = new ArrayList<>();
        for (Sensor s : sensors) {
            Thread t = new Thread(new SensorSimulator(s), s.getType() + "-Thread");
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

        // Display final sensor readings
        System.out.println("\n=== Final Sensor Readings ===");
        for (Sensor s : sensors) {
            System.out.println(s.getType() + ": " + String.format("%.2f", s.getValue()));
        }
    }
}
