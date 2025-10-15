package com.hacktoberfest2025;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Hacktoberfest 2025 Java Statistics Generator
 * 
 * This class demonstrates Java programming concepts while generating
 * meaningful statistics for Hacktoberfest participation.
 * 
 * Perfect for contributors wanting to add Java-related features!
 */
public class HacktoberfestStats {
    
    private static final String GITHUB_API_BASE = "https://api.github.com";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final String repoOwner;
    private final String repoName;
    private final String githubToken;
    
    public HacktoberfestStats(String repoOwner, String repoName, String githubToken) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
        this.githubToken = githubToken;
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }
    
    /**
     * Contributor class to represent GitHub contributors
     */
    public static class Contributor {
        private String login;
        private int contributions;
        private String avatarUrl;
        private String htmlUrl;
        
        // Constructors
        public Contributor() {}
        
        public Contributor(String login, int contributions, String avatarUrl, String htmlUrl) {
            this.login = login;
            this.contributions = contributions;
            this.avatarUrl = avatarUrl;
            this.htmlUrl = htmlUrl;
        }
        
        // Getters and Setters
        public String getLogin() { return login; }
        public void setLogin(String login) { this.login = login; }
        
        public int getContributions() { return contributions; }
        public void setContributions(int contributions) { this.contributions = contributions; }
        
        public String getAvatarUrl() { return avatarUrl; }
        public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
        
        public String getHtmlUrl() { return htmlUrl; }
        public void setHtmlUrl(String htmlUrl) { this.htmlUrl = htmlUrl; }
        
        @Override
        public String toString() {
            return String.format("%s (%d contributions)", login, contributions);
        }
    }
    
    /**
     * PullRequest class to represent GitHub pull requests
     */
    public static class PullRequest {
        private int number;
        private String title;
        private String state;
        private String createdAt;
        private String mergedAt;
        private String userLogin;
        
        // Constructors
        public PullRequest() {}
        
        // Getters and Setters
        public int getNumber() { return number; }
        public void setNumber(int number) { this.number = number; }
        
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
        
        public String getCreatedAt() { return createdAt; }
        public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
        
        public String getMergedAt() { return mergedAt; }
        public void setMergedAt(String mergedAt) { this.mergedAt = mergedAt; }
        
        public String getUserLogin() { return userLogin; }
        public void setUserLogin(String userLogin) { this.userLogin = userLogin; }
        
        @Override
        public String toString() {
            return String.format("#%d: %s (%s)", number, title, state);
        }
    }
    
    /**
     * Statistics class to hold all Hacktoberfest statistics
     */
    public static class Statistics {
        private String repository;
        private int totalPRs;
        private int mergedPRs;
        private int openPRs;
        private int totalContributors;
        private List<Contributor> topContributors;
        private List<PullRequest> recentPRs;
        private String generatedAt;
        
        public Statistics() {
            this.topContributors = new ArrayList<>();
            this.recentPRs = new ArrayList<>();
            this.generatedAt = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }
        
        // Getters and Setters
        public String getRepository() { return repository; }
        public void setRepository(String repository) { this.repository = repository; }
        
        public int getTotalPRs() { return totalPRs; }
        public void setTotalPRs(int totalPRs) { this.totalPRs = totalPRs; }
        
        public int getMergedPRs() { return mergedPRs; }
        public void setMergedPRs(int mergedPRs) { this.mergedPRs = mergedPRs; }
        
        public int getOpenPRs() { return openPRs; }
        public void setOpenPRs(int openPRs) { this.openPRs = openPRs; }
        
        public int getTotalContributors() { return totalContributors; }
        public void setTotalContributors(int totalContributors) { this.totalContributors = totalContributors; }
        
        public List<Contributor> getTopContributors() { return topContributors; }
        public void setTopContributors(List<Contributor> topContributors) { this.topContributors = topContributors; }
        
        public List<PullRequest> getRecentPRs() { return recentPRs; }
        public void setRecentPRs(List<PullRequest> recentPRs) { this.recentPRs = recentPRs; }
        
        public String getGeneratedAt() { return generatedAt; }
        public void setGeneratedAt(String generatedAt) { this.generatedAt = generatedAt; }
    }
    
    /**
     * Fetch contributors from GitHub API
     */
    public List<Contributor> fetchContributors() throws IOException, InterruptedException {
        String url = String.format("%s/repos/%s/%s/contributors", GITHUB_API_BASE, repoOwner, repoName);
        
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET();
        
        if (githubToken != null && !githubToken.isEmpty()) {
            requestBuilder.header("Authorization", "token " + githubToken);
        }
        
        HttpRequest request = requestBuilder.build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new RuntimeException("GitHub API request failed with status: " + response.statusCode());
        }
        
        JsonNode jsonNode = objectMapper.readTree(response.body());
        List<Contributor> contributors = new ArrayList<>();
        
        for (JsonNode node : jsonNode) {
            Contributor contributor = new Contributor(
                node.get("login").asText(),
                node.get("contributions").asInt(),
                node.get("avatar_url").asText(),
                node.get("html_url").asText()
            );
            contributors.add(contributor);
        }
        
        return contributors;
    }
    
    /**
     * Fetch pull requests from GitHub API
     */
    public List<PullRequest> fetchPullRequests() throws IOException, InterruptedException {
        String url = String.format("%s/repos/%s/%s/pulls?state=all", GITHUB_API_BASE, repoOwner, repoName);
        
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET();
        
        if (githubToken != null && !githubToken.isEmpty()) {
            requestBuilder.header("Authorization", "token " + githubToken);
        }
        
        HttpRequest request = requestBuilder.build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new RuntimeException("GitHub API request failed with status: " + response.statusCode());
        }
        
        JsonNode jsonNode = objectMapper.readTree(response.body());
        List<PullRequest> pullRequests = new ArrayList<>();
        
        for (JsonNode node : jsonNode) {
            PullRequest pr = new PullRequest();
            pr.setNumber(node.get("number").asInt());
            pr.setTitle(node.get("title").asText());
            pr.setState(node.get("state").asText());
            pr.setCreatedAt(node.get("created_at").asText());
            
            if (node.has("merged_at") && !node.get("merged_at").isNull()) {
                pr.setMergedAt(node.get("merged_at").asText());
            }
            
            pr.setUserLogin(node.get("user").get("login").asText());
            pullRequests.add(pr);
        }
        
        return pullRequests;
    }
    
    /**
     * Generate comprehensive Hacktoberfest statistics
     */
    public Statistics generateStatistics() throws IOException, InterruptedException {
        System.out.println("🎃 Generating Hacktoberfest 2025 Statistics with Java...");
        
        Statistics stats = new Statistics();
        stats.setRepository(repoOwner + "/" + repoName);
        
        // Fetch data
        List<Contributor> contributors = fetchContributors();
        List<PullRequest> pullRequests = fetchPullRequests();
        
        // Analyze pull requests
        int mergedCount = 0;
        int openCount = 0;
        
        for (PullRequest pr : pullRequests) {
            if ("open".equals(pr.getState())) {
                openCount++;
            } else if (pr.getMergedAt() != null && !pr.getMergedAt().isEmpty()) {
                mergedCount++;
            }
        }
        
        // Set statistics
        stats.setTotalPRs(pullRequests.size());
        stats.setMergedPRs(mergedCount);
        stats.setOpenPRs(openCount);
        stats.setTotalContributors(contributors.size());
        
        // Get top contributors (first 10)
        stats.setTopContributors(contributors.subList(0, Math.min(10, contributors.size())));
        
        // Get recent PRs (first 5)
        stats.setRecentPRs(pullRequests.subList(0, Math.min(5, pullRequests.size())));
        
        return stats;
    }
    
    /**
     * Print statistics to console
     */
    public void printStatistics(Statistics stats) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("🎃 Hacktoberfest 2025 Statistics (Java Edition)");
        System.out.println("Repository: " + stats.getRepository());
        System.out.println("Generated: " + stats.getGeneratedAt());
        System.out.println("=".repeat(60));
        System.out.println("📊 Total Pull Requests: " + stats.getTotalPRs());
        System.out.println("✅ Merged Pull Requests: " + stats.getMergedPRs());
        System.out.println("🔄 Open Pull Requests: " + stats.getOpenPRs());
        System.out.println("👥 Total Contributors: " + stats.getTotalContributors());
        System.out.println("=".repeat(60));
        
        if (!stats.getTopContributors().isEmpty()) {
            System.out.println("🏆 Top Contributors:");
            for (int i = 0; i < Math.min(5, stats.getTopContributors().size()); i++) {
                Contributor contributor = stats.getTopContributors().get(i);
                System.out.println("  " + (i + 1) + ". " + contributor);
            }
        }
        
        if (!stats.getRecentPRs().isEmpty()) {
            System.out.println("\n🔄 Recent Pull Requests:");
            for (int i = 0; i < Math.min(5, stats.getRecentPRs().size()); i++) {
                PullRequest pr = stats.getRecentPRs().get(i);
                System.out.println("  " + pr);
            }
        }
        
        System.out.println("\n🎉 Happy Hacktoberfest 2025! ☕");
    }
    
    /**
     * Main method to run the statistics generator
     */
    public static void main(String[] args) {
        System.out.println("🎃 Hacktoberfest 2025 Java Statistics Generator");
        System.out.println("=".repeat(50));
        
        // Configuration
        String repoOwner = "hari7261";
        String repoName = "Hacktoberfest-2025";
        String githubToken = System.getenv("GITHUB_TOKEN"); // Optional: set GITHUB_TOKEN environment variable
        
        if (githubToken == null || githubToken.isEmpty()) {
            System.out.println("💡 Tip: Set GITHUB_TOKEN environment variable for higher API rate limits");
        }
        
        try {
            HacktoberfestStats statsGenerator = new HacktoberfestStats(repoOwner, repoName, githubToken);
            Statistics stats = statsGenerator.generateStatistics();
            statsGenerator.printStatistics(stats);
            
        } catch (Exception e) {
            System.err.println("Error generating statistics: " + e.getMessage());
            e.printStackTrace();
        }
    }
}