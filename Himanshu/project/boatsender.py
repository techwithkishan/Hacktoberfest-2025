import socket
import subprocess
import threading

def connect_to_server(server_ip, server_port):
    # Create a socket object
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Connect to the server
    s.connect((server_ip, server_port))
    
    # Send a message to the server
    s.send(b'Hello, server!')
    
    # Receive a response from the server
    response = s.recv(1024)
    print(f'Received from server: {response.decode()}')
    
    # Close the connection
    s.close()

def execute_command(command):
    # Execute the command on the local machine
    output = subprocess.check_output(command, shell=True)
    return output.decode()

def start_bot():
    # Bot code here
    pass

def main():
    # Server IP address and port
    server_ip = '192.168.1.100'
    server_port = 8080
    
    # Start the bot
    bot_thread = threading.Thread(target=start_bot)
    bot_thread.start()
    
    # Connect to the server
    connect_to_server(server_ip, server_port)
    
    # Execute a command on the local machine
    command = 'whoami'
    output = execute_command(command)
    print(f'Command output: {output}')

if __name__ == '__main__':
    main()