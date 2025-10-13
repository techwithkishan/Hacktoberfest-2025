import re
import argparse
from collections import Counter, defaultdict
from datetime import datetime
import matplotlib.pyplot as plt

def parse_log_line(line):
    # Works for Apache/Nginx-like access logs
    match = re.search(r'(\d+\.\d+\.\d+\.\d+).*\[(.*?)\].*\"(.*?)\" (\d+) (\d+|-)', line)
    if match:
        ip = match.group(1)
        time_str = match.group(2)
        status = int(match.group(4))
        try:
            time = datetime.strptime(time_str.split()[0], "%d/%b/%Y:%H:%M:%S")
        except Exception:
            time = None
        return ip, status, time
    return None, None, None

def analyze_log(file_path):
    ip_counter = Counter()
    status_counter = Counter()
    hourly_activity = defaultdict(int)

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            ip, status, time = parse_log_line(line)
            if ip:
                ip_counter[ip] += 1
                status_counter[status] += 1
                if time:
                    hour = time.strftime("%Y-%m-%d %H:00")
                    hourly_activity[hour] += 1

    print("📊 Top 5 IPs:")
    for ip, count in ip_counter.most_common(5):
        print(f"{ip}: {count} requests")

    print("\n📈 Status Codes:")
    for code, count in status_counter.most_common():
        print(f"{code}: {count}")

    # Visualization
    if hourly_activity:
        plt.figure(figsize=(10,5))
        hours = sorted(hourly_activity.keys())
        values = [hourly_activity[h] for h in hours]
        plt.plot(hours, values, marker='o')
        plt.title("Requests per Hour")
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Log Analyzer & Security Monitor")
    parser.add_argument("file", help="Path to log file (e.g. access.log)")
    args = parser.parse_args()
    analyze_log(args.file)
