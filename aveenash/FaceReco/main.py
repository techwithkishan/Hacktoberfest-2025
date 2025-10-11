# facial_recognition_attendance.py
import os
import sys
import subprocess

def install_required_packages():
    """Install required packages"""
    required_packages = [
        'opencv-contrib-python',
        'numpy', 
        'pandas',
        'Pillow'
    ]
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✓ {package} is already installed")
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Install packages first
install_required_packages()

import cv2
import numpy as np
import pandas as pd
from datetime import datetime, date
import tkinter as tk
from tkinter import messagebox, simpledialog
import pickle

class FacialRecognitionAttendance:
    def __init__(self):
        # Initialize paths and detectors
        self.dataset_path = "faces/dataset"
        self.trainer_path = "faces/trainer"
        self.attendance_file = f"attendance_{date.today()}.csv"
        
        # Create directories if they don't exist
        os.makedirs(self.dataset_path, exist_ok=True)
        os.makedirs(self.trainer_path, exist_ok=True)
        
        # Initialize face detector
        self.face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        
        # Initialize face recognizer
        try:
            self.face_recognizer = cv2.face.LBPHFaceRecognizer_create()
            self.face_module_available = True
        except AttributeError:
            print("OpenCV face module not available. Some features will be limited.")
            self.face_module_available = False
            self.face_recognizer = None
        
        # Store recognized faces to avoid duplicate entries
        self.recognized_faces = set()
        
        # Load existing attendance records
        self.attendance_df = self.load_attendance()
        
        # Check if trainer exists
        self.model_trained = os.path.exists(os.path.join(self.trainer_path, "trainer.yml")) and self.face_module_available
        
        print("✅ System initialized successfully!")
        self._show_menu()
    
    def _show_menu(self):
        """Display the main menu"""
        print("\n" + "="*50)
        print("       FACIAL RECOGNITION ATTENDANCE SYSTEM")
        print("="*50)
        print("1. Register New User")
        if self.face_module_available:
            print("2. Train Model")
            print("3. Take Attendance (Face Recognition)")
        else:
            print("2. Train Model (Not Available)")
            print("3. Take Attendance (Not Available)")
        print("4. Take Attendance (Manual)")
        print("5. View Today's Attendance")
        print("6. Test Camera")
        print("7. Exit")
        print("="*50)
    
    def load_attendance(self):
        """Load existing attendance records or create new DataFrame"""
        if os.path.exists(self.attendance_file):
            return pd.read_csv(self.attendance_file)
        else:
            return pd.DataFrame(columns=['User_ID', 'Name', 'Time_In', 'Date'])
    
    def save_attendance(self):
        """Save attendance records to CSV"""
        self.attendance_df.to_csv(self.attendance_file, index=False)
    
    def test_camera(self):
        """Test if camera is working"""
        print("\n=== Testing Camera ===")
        cam = cv2.VideoCapture(0)
        
        if not cam.isOpened():
            print("❌ Error: Could not access camera")
            return False
        
        print("✅ Camera accessed successfully")
        print("Press 'q' to close camera preview")
        
        while True:
            ret, frame = cam.read()
            if not ret:
                print("❌ Failed to capture frame")
                break
            
            cv2.putText(frame, "Camera Test - Press 'q' to exit", (10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.imshow('Camera Test', frame)
            
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
        
        cam.release()
        cv2.destroyAllWindows()
        print("Camera test completed")
        return True
    
    def register_new_user(self):
        """Collect face data for new user registration"""
        print("\n=== New User Registration ===")
        
        # Get user information first
        root = tk.Tk()
        root.withdraw()
        
        user_id = simpledialog.askstring("User ID", "Enter User ID:")
        if not user_id:
            print("Registration cancelled.")
            return
        
        user_name = simpledialog.askstring("User Name", "Enter User Name:")
        if not user_name:
            print("Registration cancelled.")
            return
        
        root.destroy()
        
        # Create user directory
        user_dir = os.path.join(self.dataset_path, f"User_{user_id}_{user_name}")
        if not os.path.exists(user_dir):
            os.makedirs(user_dir)
        
        # Initialize webcam
        cam = cv2.VideoCapture(0)
        if not cam.isOpened():
            print("❌ Error: Could not access camera")
            return
        
        cam.set(3, 640)  # width
        cam.set(4, 480)  # height
        
        print(f"\nCollecting face data for {user_name}...")
        print("Look at the camera and move your head slightly.")
        print("Press 'q' to stop capturing.")
        
        count = 0
        face_detected_count = 0
        
        while True:
            ret, img = cam.read()
            if not ret:
                print("Failed to grab frame")
                break
            
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = self.face_detector.detectMultiScale(gray, 1.3, 5)
            
            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                
                # Save face image (only if we need more samples)
                if face_detected_count < 50:
                    face_img = gray[y:y+h, x:x+w]
                    
                    # Resize and save
                    face_img = cv2.resize(face_img, (200, 200))
                    cv2.imwrite(f"{user_dir}/face_{face_detected_count:03d}.jpg", face_img)
                    face_detected_count += 1
                
                cv2.putText(img, f"Captured: {face_detected_count}/50", (x, y-10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            
            # Show instructions
            cv2.putText(img, "Press 'q' to stop", (10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.putText(img, f"User: {user_name}", (10, 60), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            cv2.imshow('Register Face', img)
            
            # Check if we have enough samples or user wants to quit
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q') or face_detected_count >= 50:
                break
        
        cam.release()
        cv2.destroyAllWindows()
        
        print(f"\n✅ Registration completed! {face_detected_count} face samples collected for {user_name}.")
        if self.face_module_available:
            self.model_trained = False
    
    def train_model(self):
        """Train the face recognition model"""
        if not self.face_module_available:
            print("❌ Face recognition module not available!")
            return
        
        print("\n=== Training Face Recognition Model ===")
        
        if not os.path.exists(self.dataset_path) or not os.listdir(self.dataset_path):
            print("❌ No face data found! Please register users first.")
            return
        
        faces = []
        ids = []
        user_info = {}
        
        user_dirs = [d for d in os.listdir(self.dataset_path) if os.path.isdir(os.path.join(self.dataset_path, d))]
        
        if not user_dirs:
            print("❌ No users found in dataset!")
            return
        
        print(f"Found {len(user_dirs)} users in dataset")
        
        for user_dir in user_dirs:
            try:
                # Extract user ID and name from directory name
                parts = user_dir.split('_')
                if len(parts) >= 3:
                    user_id = int(parts[1])
                    user_name = '_'.join(parts[2:])
                    user_info[user_id] = user_name
                    
                    user_path = os.path.join(self.dataset_path, user_dir)
                    image_files = [f for f in os.listdir(user_path) if f.endswith('.jpg')]
                    
                    print(f"📷 Processing {len(image_files)} images for {user_name}...")
                    
                    for image_file in image_files:
                        image_path = os.path.join(user_path, image_file)
                        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                        
                        if img is not None:
                            faces.append(img)
                            ids.append(user_id)
                else:
                    print(f"⚠️ Skipping invalid directory: {user_dir}")
            
            except Exception as e:
                print(f"⚠️ Error processing {user_dir}: {e}")
                continue
        
        if len(faces) == 0:
            print("❌ No valid face images found for training!")
            return
        
        print(f"\n🎯 Training model with {len(faces)} face samples from {len(user_info)} users...")
        
        # Train the recognizer
        self.face_recognizer.train(faces, np.array(ids))
        
        # Save the model
        self.face_recognizer.write(os.path.join(self.trainer_path, "trainer.yml"))
        
        # Save user information
        with open(os.path.join(self.trainer_path, "user_info.pkl"), 'wb') as f:
            pickle.dump(user_info, f)
        
        self.model_trained = True
        print("✅ Training completed successfully!")
        print(f"📊 Users trained: {list(user_info.values())}")
    
    def take_attendance_face(self):
        """Take attendance using face recognition"""
        if not self.face_module_available:
            print("❌ Face recognition not available!")
            return
        
        if not self.model_trained:
            print("❌ Model not trained! Please train the model first.")
            return
        
        print("\n=== Face Recognition Attendance ===")
        print("Press 'q' to stop attendance taking.")
        
        try:
            with open(os.path.join(self.trainer_path, "user_info.pkl"), 'rb') as f:
                user_info = pickle.load(f)
            print(f"✅ Loaded {len(user_info)} users from database")
        except Exception as e:
            print(f"❌ User information not found! Please retrain the model. Error: {e}")
            return
        
        cam = cv2.VideoCapture(0)
        if not cam.isOpened():
            print("❌ Error: Could not access camera")
            return
        
        cam.set(3, 640)
        cam.set(4, 480)
        
        confidence_threshold = 70
        
        while True:
            ret, img = cam.read()
            if not ret:
                break
            
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = self.face_detector.detectMultiScale(gray, 1.3, 5)
            
            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                
                # Recognize face
                id_, confidence = self.face_recognizer.predict(gray[y:y+h, x:x+w])
                
                if confidence < confidence_threshold:
                    user_name = user_info.get(id_, "Unknown")
                    confidence_text = f" {round(100 - confidence, 2)}%"
                    
                    if id_ not in self.recognized_faces:
                        self._mark_attendance(id_, user_name)
                        cv2.putText(img, "ATTENDANCE MARKED!", (x, y+h+30), 
                                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                    
                    cv2.putText(img, user_name + confidence_text, (x, y-10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 0, 0), 2)
                else:
                    cv2.putText(img, "Unknown", (x, y-10), 
                               cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            
            cv2.putText(img, "Press 'q' to stop", (10, 30), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            cv2.imshow('Face Recognition Attendance', img)
            
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
        
        cam.release()
        cv2.destroyAllWindows()
        print("Attendance session ended.")
    
    def take_attendance_manual(self):
        """Manual attendance entry"""
        print("\n=== Manual Attendance Entry ===")
        
        root = tk.Tk()
        root.withdraw()
        
        user_id = simpledialog.askstring("Manual Entry", "Enter User ID:")
        if not user_id:
            print("Manual entry cancelled.")
            return
        
        user_name = simpledialog.askstring("Manual Entry", "Enter User Name:")
        if not user_name:
            print("Manual entry cancelled.")
            return
        
        root.destroy()
        
        self._mark_attendance(user_id, user_name)
    
    def _mark_attendance(self, user_id, user_name):
        """Mark attendance for a user"""
        current_time = datetime.now().strftime("%H:%M:%S")
        current_date = date.today().strftime("%Y-%m-%d")
        
        # Check if already marked today
        today_attendance = self.attendance_df[
            (self.attendance_df['User_ID'] == user_id) & 
            (self.attendance_df['Date'] == current_date)
        ]
        
        if not today_attendance.empty:
            print(f"⚠️ Attendance already marked for {user_name} today at {today_attendance.iloc[0]['Time_In']}")
            return
        
        new_record = pd.DataFrame({
            'User_ID': [user_id],
            'Name': [user_name],
            'Time_In': [current_time],
            'Date': [current_date]
        })
        
        self.attendance_df = pd.concat([self.attendance_df, new_record], ignore_index=True)
        self.save_attendance()
        
        if isinstance(user_id, int):
            self.recognized_faces.add(user_id)
        
        print(f"✅ Attendance marked for {user_name} at {current_time}")
    
    def view_attendance(self):
        """View today's attendance records"""
        print("\n=== Today's Attendance ===")
        
        if self.attendance_df.empty:
            print("No attendance records for today.")
        else:
            today = date.today().strftime("%Y-%m-%d")
            today_records = self.attendance_df[self.attendance_df['Date'] == today]
            
            if today_records.empty:
                print("No attendance records for today.")
            else:
                print(f"\nTotal records today: {len(today_records)}")
                print("\n" + "="*60)
                for _, record in today_records.iterrows():
                    print(f"ID: {record['User_ID']} | Name: {record['Name']} | Time: {record['Time_In']}")
                print("="*60)
        
        # Show in message box
        if not self.attendance_df.empty:
            root = tk.Tk()
            root.withdraw()
            
            today = date.today().strftime("%Y-%m-%d")
            today_records = self.attendance_df[self.attendance_df['Date'] == today]
            
            if today_records.empty:
                messagebox.showinfo("Today's Attendance", "No attendance records for today.")
            else:
                attendance_text = f"Today's Attendance ({today}):\n\n"
                for _, record in today_records.iterrows():
                    attendance_text += f"ID: {record['User_ID']} | Name: {record['Name']} | Time: {record['Time_In']}\n"
                
                messagebox.showinfo("Today's Attendance", attendance_text)
            
            root.destroy()
    
    def run(self):
        """Main program loop"""
        while True:
            try:
                choice = input("\nEnter your choice (1-7): ").strip()
                
                if choice == '1':
                    self.register_new_user()
                elif choice == '2':
                    self.train_model()
                elif choice == '3':
                    self.take_attendance_face()
                elif choice == '4':
                    self.take_attendance_manual()
                elif choice == '5':
                    self.view_attendance()
                elif choice == '6':
                    self.test_camera()
                elif choice == '7':
                    print("\nThank you for using Facial Recognition Attendance System!")
                    break
                else:
                    print("❌ Invalid choice! Please enter 1-7.")
                
                self._show_menu()
                
            except KeyboardInterrupt:
                print("\n\nProgram interrupted by user. Goodbye!")
                break
            except Exception as e:
                print(f"\n❌ An error occurred: {e}")

if __name__ == "__main__":
    print("🧠 Facial Recognition Attendance System")
    print("Initializing...")
    
    try:
        system = FacialRecognitionAttendance()
        system.run()
    except Exception as e:
        print(f"❌ Failed to initialize system: {e}")
        print("Please make sure all dependencies are installed correctly.")