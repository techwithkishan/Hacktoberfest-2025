import socket
import cv2
import numpy as np

def hack_cctv(ip_address, port):
    # Create a socket object
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    # Connect to the CCTV camera
    s.connect((ip_address, port))
    
    # Receive video data from the camera
    while True:
        data = s.recv(4096)
        if not data:
            break
        
        # Decode the video data
        frame = cv2.imdecode(np.frombuffer(data, np.uint8), -1)
        
        # Display the video
        cv2.imshow('CCTV Camera', frame)
        
        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    # Close the connection
    s.close()
    cv2.destroyAllWindows()

# Example usage
hack_cctv('192.168.1.100', 554)