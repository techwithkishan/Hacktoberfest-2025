package com.example.candydash;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final List<Score> scores = Collections.synchronizedList(new ArrayList<>());
    private final AtomicLong idGenerator = new AtomicLong();

    @GetMapping
    public List<Score> listTop(@RequestParam(defaultValue = "10") int limit) {
        synchronized (scores) {
            return scores.stream()
                    .sorted(Comparator.comparingInt(Score::getPoints).reversed())
                    .limit(limit)
                    .toList();
        }
    }

    @PostMapping
    public ResponseEntity<Score> submit(@RequestBody ScoreRequest req) {
        if (req == null || req.name == null || req.points < 0) {
            return ResponseEntity.badRequest().build();
        }
        Score s = new Score(idGenerator.incrementAndGet(), req.name, req.points);
        scores.add(s);
        return ResponseEntity.ok(s);
    }

    // Inner DTO classes
    public static class ScoreRequest {
        public String name;
        public int points;
    }

    public static class Score {
        private long id;
        private String name;
        private int points;

        public Score() {}

        public Score(long id, String name, int points) {
            this.id = id;
            this.name = name;
            this.points = points;
        }

        public long getId() { return id; }
        public void setId(long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public int getPoints() { return points; }
        public void setPoints(int points) { this.points = points; }
    }
}