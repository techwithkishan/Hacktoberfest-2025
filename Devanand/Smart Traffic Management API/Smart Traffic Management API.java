package com.example.trafficapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.*;
import java.util.concurrent.PriorityBlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;

// Main Application
@SpringBootApplication
@RestController
@EnableScheduling
public class SmartTrafficApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartTrafficApiApplication.class, args);
    }

    // --- Models ---
    static class Vehicle {
        public int id;
        public String type;
        public int priority;
        public long arrivalTime;

        Vehicle(int id, String type, int priority) {
            this.id = id;
            this.type = type;
            this.priority = priority;
            this.arrivalTime = System.currentTimeMillis();
        }
    }

    static class TrafficSignal {
        public String name;
        public PriorityBlockingQueue<Vehicle> queue = new PriorityBlockingQueue<>(10, (a,b) -> b.priority - a.priority);
        public AtomicInteger totalPassed = new AtomicInteger(0);
        public AtomicInteger emergencyCount = new AtomicInteger(0);

        TrafficSignal(String name) { this.name = name; }

        public void addVehicle(Vehicle v) {
            queue.add(v);
            logEvent(v + " entered " + name);
        }

        public void logEvent(String msg){
            System.out.println(new Date() + " - " + msg);
        }

        public Map<String,Object> getStatus() {
            Map<String,Object> map = new HashMap<>();
            map.put("signal", name);
            map.put("queueSize", queue.size());
            map.put("vehicles", queue);
            map.put("totalPassed", totalPassed.get());
            map.put("emergencyCount", emergencyCount.get());
            return map;
        }

        public void processNextVehicle() {
            Vehicle v = queue.poll();
            if(v != null){
                totalPassed.incrementAndGet();
                if(v.type.equalsIgnoreCase("Ambulance") || v.type.equalsIgnoreCase("FireTruck") || v.type.equalsIgnoreCase("Police")) {
                    emergencyCount.incrementAndGet();
                }
                logEvent(name + " -> " + v + " passed the signal");
            }
        }
    }

    // --- Signals ---
    private TrafficSignal signalA = new TrafficSignal("Signal A");
    private TrafficSignal signalB = new TrafficSignal("Signal B");
    private AtomicInteger vehicleIdCounter = new AtomicInteger(1);

    private TrafficSignal[] signals = new TrafficSignal[]{signalA, signalB};
    private Random rand = new Random();

    // --- API Endpoints ---
    @PostMapping("/vehicle")
    public ResponseEntity<String> addVehicle(@RequestParam String type, @RequestParam(defaultValue="1") int priority) {
        int id = vehicleIdCounter.getAndIncrement();
        Vehicle v = new Vehicle(id,type,priority);
        // Randomly assign to a signal
        TrafficSignal s = signals[rand.nextInt(signals.length)];
        s.addVehicle(v);
        return ResponseEntity.ok("Vehicle " + id + " added to " + s.name);
    }

    @PostMapping("/emergency")
    public ResponseEntity<String> addEmergencyVehicle(@RequestParam String type) {
        return addVehicle(type,5); // Emergency always priority 5
    }

    @GetMapping("/signals")
    public List<Map<String,Object>> getSignals() {
        List<Map<String,Object>> list = new ArrayList<>();
        for(TrafficSignal s : signals){
            list.add(s.getStatus());
        }
        return list;
    }

    // --- Scheduled processing of vehicles every 1 second ---
    @Scheduled(fixedRate = 1000)
    public void processSignals() {
        for(TrafficSignal s : signals){
            s.processNextVehicle();
        }
    }
}
