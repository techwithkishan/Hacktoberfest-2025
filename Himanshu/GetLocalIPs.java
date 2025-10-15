import java.net.*;
import java.util.*;
import java.util.concurrent.*;
import java.io.*;

public class GetLocalIPs {
    public static void main(String[] args) throws Exception {
        boolean doScan = args.length > 0 && (args[0].equalsIgnoreCase("scan") || args[0].equalsIgnoreCase("-s"));

        System.out.println("Hostname: " + InetAddress.getLocalHost().getHostName());

        Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();
        List<InterfaceInfo> interfaces = new ArrayList<>();

        while (nets.hasMoreElements()) {
            NetworkInterface netint = nets.nextElement();
            // skip loopback and down interfaces
            try {
                if (!netint.isUp() || netint.isLoopback()) continue;
            } catch (SocketException e) {
                continue;
            }

            InterfaceInfo info = new InterfaceInfo(netint.getName(), netint.getDisplayName());

            for (InterfaceAddress ia : netint.getInterfaceAddresses()) {
                InetAddress addr = ia.getAddress();
                if (addr == null) continue;
                String host = addr.getHostAddress();
                short prefix = ia.getNetworkPrefixLength();
                info.addresses.add(new Addr(host, prefix));
            }

            if (!info.addresses.isEmpty()) interfaces.add(info);
        }

        if (interfaces.isEmpty()) {
            System.out.println("No active network interfaces found.");
            return;
        }

        for (InterfaceInfo ii : interfaces) {
            System.out.println("\nInterface: " + ii.name + " (" + ii.displayName + ")");
            for (Addr a : ii.addresses) {
                System.out.printf("  - %s (prefix=%d)\n", a.address, a.prefix);
            }
        }

        if (!doScan) {
            System.out.println("\nRun with argument 'scan' to perform a quick local subnet ping-sweep for nearby hosts (may require time and network privileges).");
            return;
        }

        System.out.println("\nStarting a safe subnet scan (this may take a few seconds)...");

        for (InterfaceInfo ii : interfaces) {
            for (Addr a : ii.addresses) {
                if (isIPv4(a.address) && a.prefix >= 16 && a.prefix <= 30) {
                    scanSubnet(a.address, a.prefix);
                } else {
                    System.out.println("Skipping scan for " + a.address + " (not IPv4 or prefix out of safe range [16..30]).");
                }
            }
        }
    }

    static class InterfaceInfo {
        String name, displayName;
        List<Addr> addresses = new ArrayList<>();
        InterfaceInfo(String n, String d) { name = n; displayName = d; }
    }

    static class Addr {
        String address;
        short prefix;
        Addr(String a, short p) { address = a; prefix = p; }
    }

    static boolean isIPv4(String ip) {
        return ip != null && ip.indexOf(':') == -1;
    }

    static void scanSubnet(String ipStr, int prefix) throws Exception {
        System.out.println("\nScanning subnet for IP " + ipStr + " /" + prefix);

        long ip = ipv4ToLong(ipStr);
        int hostBits = 32 - prefix;
        long hosts = (hostBits >= 31) ? 0 : (1L << hostBits) - 2; // exclude network/broadcast

        if (hosts <= 0 || hosts > 4096) {
            System.out.println("  Subnet is too large or has no hosts to scan (hosts=" + hosts + "). Skipping.");
            return;
        }

        long network = (ip >> hostBits) << hostBits;

        List<String> targets = new ArrayList<>();
        for (long i = 1; i <= hosts; i++) {
            long candidate = network + i;
            String candIp = longToIPv4(candidate);
            if (candIp.equals(ipStr)) continue;
            targets.add(candIp);
        }

        ExecutorService ex = Executors.newFixedThreadPool(Math.min(200, targets.size()));
        List<Future<String>> futures = new ArrayList<>();

        for (String t : targets) {
            futures.add(ex.submit(() -> {
                if (isReachable(t, 700)) return t;
                return null;
            }));
        }

        List<String> alive = new ArrayList<>();
        for (Future<String> f : futures) {
            try {
                String r = f.get(1200, TimeUnit.MILLISECONDS);
                if (r != null) alive.add(r);
            } catch (TimeoutException te) {
                // ignore slow
            } catch (Exception e) {
                // ignore
            }
        }

        ex.shutdownNow();

        if (alive.isEmpty()) {
            System.out.println("  No hosts responded in this subnet.");
        } else {
            System.out.println("  Hosts found (" + alive.size() + "):");
            for (String h : alive) System.out.println("    - " + h);
        }
    }

    static boolean isReachable(String ip, int timeoutMs) {
        try {
            InetAddress addr = InetAddress.getByName(ip);
            boolean ok = addr.isReachable(timeoutMs);
            if (ok) return true;
        } catch (Exception e) {
            // fallthrough to OS ping
        }

        // Fallback to system ping (Windows)
        try {
            ProcessBuilder pb = new ProcessBuilder("ping", "-n", "1", "-w", String.valueOf(timeoutMs), ip);
            pb.redirectErrorStream(true);
            Process p = pb.start();
            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                if (line.toLowerCase().contains("ttl=")) {
                    p.destroyForcibly();
                    return true;
                }
            }
            p.waitFor(1200, TimeUnit.MILLISECONDS);
        } catch (Exception ex) {
            // ignore
        }

        return false;
    }

    static long ipv4ToLong(String ip) {
        String[] parts = ip.split("\\.");
        long res = 0;
        for (int i = 0; i < 4; i++) {
            res = (res << 8) + Integer.parseInt(parts[i]);
        }
        return res;
    }

    static String longToIPv4(long val) {
        return String.format("%d.%d.%d.%d", (val >> 24) & 0xff, (val >> 16) & 0xff, (val >> 8) & 0xff, val & 0xff);
    }
}
