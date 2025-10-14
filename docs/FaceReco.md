# Face Recognition (LBPH) Attendance System

Location: `aveenash/FaceReco/main.py`

## Overview

This module implements a simple face-recognition-based attendance system using OpenCV's LBPH recognizer and Haar cascade face detection. It includes utilities to:

- Register new users by capturing face images from a webcam
- Train an LBPH recognizer and save the model (`faces/trainer/trainer.yml`)
- Take attendance in real-time using the webcam and the trained model

## Data layout and saved artifacts

- Face images: `faces/dataset/User_<ID>_<Name>/face_###.jpg` (grayscale, 200x200)
- Trainer/model: `faces/trainer/trainer.yml` (LBPH model file)
- User metadata: `faces/trainer/user_info.pkl` (pickled dict mapping user_id -> name)
- Attendance CSV: `attendance_<YYYY-MM-DD>.csv`

## Training process

1. Register users: captures up to 50 face images per user using the webcam
2. `train_model()` collects all images and labels and calls `face_recognizer.train(faces, np.array(ids))`
3. The model is saved with `face_recognizer.write(...)` and `user_info.pkl` is written with `pickle`

Notes:

- The implementation expects directory names to follow `User_<ID>_<Name>` to extract ID and name.
- LBPH is a lightweight method appropriate for small datasets and real-time recognition on CPU.

## Usage (run the script)

Prerequisites: Python 3.x, `opencv-contrib-python`, `numpy`, `pandas`, `Pillow`.

The script will attempt to auto-install missing packages at startup. To run interactively:

```powershell
python aveenash/FaceReco/main.py
```

Follow the on-screen menu to register users, train the model, or take attendance.

## Runtime options and thresholds

- Confidence threshold used in the script: `confidence_threshold = 70` (lower is stricter in LBPH; the script computes `100 - confidence` for display)
- If the camera fails to initialize, check device permissions and camera index (defaults to 0)

## Evaluation and tips

- LBPH outputs a confidence value where smaller values indicate better matches. Tune `confidence_threshold` on a validation set to balance false accepts and false rejects.
- Recommended evaluation steps:
  - Hold-out a few images per user as a validation set
  - Compute recognition accuracy, false positive rate, false negative rate
  - Plot ROC curve if you convert match scores to probabilities or operate over thresholds

## Security & Privacy

- Store face data and attendance logs securely and follow privacy regulations. Consider encrypting storage and restricting access.

## Possible improvements

- Replace LBPH with a lightweight deep face embedding model (e.g., MobileFaceNet, FaceNet) plus an embedding-index or classifier for better accuracy.
- Add data augmentation during registration (brightness, rotation) to make the model robust to conditions.
- Add automatic evaluation scripts and test harnesses to check new user registrations and model drift.
