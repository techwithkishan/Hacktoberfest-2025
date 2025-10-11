import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class WifiScanner {

    public static void main(String[] args) {
        String os = System.getProperty("os.name").toLowerCase();
        System.out.println("Detected OS: " + os);

        try {
            List<WifiNetwork> networks;
            if (os.contains("win")) {
                networks = scanWindows();
            } else if (os.contains("mac")) {
                networks = scanMac();
            } else { // assume Linux / Unix-like
                networks = scanLinux();
            }

            if (networks.isEmpty()) {
                System.out.println("No networks found (or command not available).");
            } else {
                System.out.println("Found networks:");
                for (WifiNetwork n : networks) {
                    System.out.println(n);
                }
            }
        } catch (Exception e) {
            System.err.println("Error during scan: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ----------------------------
    // Platform-specific scanners
    // ----------------------------

    private static List<WifiNetwork> scanWindows() throws Exception {
        // Uses: netsh wlan show networks mode=bssid
        List<String> out = runCommand("netsh", "wlan", "show", "networks", "mode=bssid");
        return parseNetsh(out);
    }

    private static List<WifiNetwork> parseNetsh(List<String> lines) {
        List<WifiNetwork> networks = new ArrayList<>();
        WifiNetwork current = null;
        for (String raw : lines) {
            String line = raw.trim();
            if (line.startsWith("SSID ") && line.contains(":")) {
                // "SSID 1 : MyNetwork"
                if (current != null) networks.add(current);
                current = new WifiNetwork();
                String ssid = line.substring(line.indexOf(":") + 1).trim();
                current.ssid = ssid;
            } else if (line.startsWith("Network type")) {
                // ignore
            } else if (line.startsWith("Authentication")) {
                if (current != null) current.security = line.substring(line.indexOf(":") + 1).trim();
            } else if (line.startsWith("BSSID ")) {
                if (current != null) {
                    String bssid = line.substring(line.indexOf(":") + 1).trim();
                    // sometimes BSSID line is like "BSSID 1 : 00:11:22:33:44:55 (something)"
                    current.bssid = bssid.split(" ")[0];
                }
            } else if (line.startsWith("Signal")) {
                if (current != null) current.signal = line.substring(line.indexOf(":") + 1).trim();
            } else if (line.startsWith("Radio type")) {
                // optional
            }
        }
        if (current != null) networks.add(current);
        return networks;
    }

    private static List<WifiNetwork> scanMac() throws Exception {
        // macOS: use /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s
        // in many macOS, "airport" is at that path; some users add a symlink to /usr/local/bin/airport
        List<String> out = runCommand("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport", "-s");
        return parseAirport(out);
    }

    private static List<WifiNetwork> parseAirport(List<String> lines) {
        List<WifiNetwork> networks = new ArrayList<>();
        boolean headerSkipped = false;
        for (String raw : lines) {
            if (!headerSkipped) {
                // first line is column headers: SSID BSSID RSSI CHANNEL HT CC SECURITY
                headerSkipped = true;
                continue;
            }
            if (raw.trim().isEmpty()) continue;
            // airport columns may be spaced; easiest is to split by multiple spaces
            String[] parts = raw.trim().split("\\s{2,}");
            WifiNetwork n = new WifiNetwork();
            if (parts.length >= 1) n.ssid = parts[0].trim();
            if (parts.length >= 2) n.bssid = parts[1].trim();
            if (parts.length >= 3) n.signal = parts[2].trim(); // RSSI
            if (parts.length >= 6) n.security = parts[parts.length - 1].trim();
            networks.add(n);
        }
        return networks;
    }

    private static List<WifiNetwork> scanLinux() throws Exception {
        // Try nmcli (NetworkManager) first, then fall back to "iwlist"
        try {
            List<String> out = runCommand("nmcli", "-f", "SSID,BSSID,SIGNAL,SECURITY", "device", "wifi", "list");
            return parseNmcli(out);
        } catch (Exception e) {
            // fallback to iwlist (requires sudo on many distros)
            List<String> out = runCommand("sh", "-c", "iwlist scanning");
            return parseIwlist(out);
        }
    }

    private static List<WifiNetwork> parseNmcli(List<String> lines) {
        List<WifiNetwork> list = new ArrayList<>();
        boolean headerSkipped = false;
        for (String raw : lines) {
            if (!headerSkipped) { headerSkipped = true; continue; } // skip header
            String line = raw.trim();
            if (line.isEmpty()) continue;
            // nmcli output columns may be separated by 2+ spaces; safer to split on 2+ spaces
            String[] cols = line.split("\\s{2,}");
            WifiNetwork n = new WifiNetwork();
            if (cols.length >= 1) n.ssid = cols[0].trim();
            if (cols.length >= 2) n.bssid = cols[1].trim();
            if (cols.length >= 3) n.signal = cols[2].trim();
            if (cols.length >= 4) n.security = cols[3].trim();
            list.add(n);
        }
        return list;
    }

    private static List<WifiNetwork> parseIwlist(List<String> lines) {
        List<WifiNetwork> networks = new ArrayList<>();
        WifiNetwork current = null;
        for (String raw : lines) {
            String line = raw.trim();
            if (line.startsWith("Cell ")) {
                if (current != null) networks.add(current);
                current = new WifiNetwork();
                // line example: Cell 01 - Address: 00:11:22:33:44:55
                int idx = line.indexOf("Address:");
                if (idx >= 0) current.bssid = line.substring(idx + 8).trim();
            } else if (line.startsWith("ESSID:")) {
                if (current != null) current.ssid = stripQuotes(line.substring(6).trim());
            } else if (line.startsWith("Quality=") || line.startsWith("Signal level=") || line.contains("Signal level=")) {
                if (current != null) current.signal = line;
            } else if (line.startsWith("Encryption key:")) {
                if (current != null) current.security = line.substring(line.indexOf(":") + 1).trim();
            } else if (line.startsWith("IE:")) {
                // may contain WPA/WPA2 info
                if (current != null && current.security != null && current.security.equalsIgnoreCase("on")) {
                    current.security = current.security + " / " + line;
                }
            }
        }
        if (current != null) networks.add(current);
        return networks;
    }

    // ----------------------------
    // Utility: run command and capture output
    // ----------------------------
    private static List<String> runCommand(String... cmd) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.redirectErrorStream(true);
        Process p = pb.start();

        List<String> output = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                output.add(line);
            }
        }
        int exit = p.waitFor();
        if (exit != 0) {
            // Some commands return non-zero even when they print info; we won't fail strictly on nonzero
            // But if output is empty, indicate failure.
            if (output.isEmpty()) {
                throw new RuntimeException("Command failed or not found: " + String.join(" ", cmd));
            }
        }
        return output;
    }

    private static String stripQuotes(String s) {
        if (s == null) return null;
        s = s.trim();
        if ((s.startsWith("\"") && s.endsWith("\"")) || (s.startsWith("'") && s.endsWith("'"))) {
            return s.substring(1, s.length() - 1);
        }
        return s;
    }

    // ----------------------------
    // Simple holder for parsed results
    // ----------------------------
    static class WifiNetwork {
        String ssid = "";
        String bssid = "";
        String signal = "";
        String security = "";

        @Override
        public String toString() {
            return String.format("SSID: %s | BSSID: %s | Signal: %s | Security: %s",
                    (ssid.isEmpty() ? "<hidden/empty>" : ssid),
                    (bssid.isEmpty() ? "-" : bssid),
                    (signal.isEmpty() ? "-" : signal),
                    (security.isEmpty() ? "-" : security));
        }
    }
}
