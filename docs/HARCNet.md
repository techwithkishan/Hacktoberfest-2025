# HARCNet (Hybrid Attention Residual Capsule Network)

Location: `HARCNet/code.py` and `HARCNet/readme.md`

## Overview

HARCNet is a compact neural architecture designed for tabular data. It combines:

- Learnable per-feature weighting (adaptive feature importance)
- A dense capsule-style transformation that groups features into vector "capsules"
- A self-attention gate operating over capsules
- Residual dense layers for stable training

The repository contains a runnable example that trains HARCNet on the scikit-learn Wine dataset.

## Architecture (summary)

- Input: scaled features (example uses `StandardScaler`)
- Feature weighting: a learnable parameter vector multiplies the input features
- Capsule block: a linear transform maps features to `num_capsules * capsule_dim` then reshaped to (num_capsules, capsule_dim)
- Self-attention: query/key/value projections applied per-capsule; attention computed with scaled dot-product and applied to value vectors
- Flatten and pass through two fully-connected layers with a residual connection
- Output linear layer produces class logits

Key hyperparameters (as used in example):

- capsule_dim = 8
- num_capsules = 4
- hidden dense sizes = 64
- optimizer = Adam(lr=0.001)
- epochs = 50 (example)

## Training process (from example)

1. Load data: scikit-learn Wine dataset
2. Standardize features with `StandardScaler`
3. Train/test split: test_size=0.2
4. Convert numpy arrays to `torch.tensor`
5. Instantiate `HARCNet(input_dim, num_classes)`
6. Loss = `CrossEntropyLoss()`; Optimizer = `Adam`
7. Training loop performs forward, computes loss, backward, and optimizer.step() for 50 epochs
8. Example prints validation accuracy every 10 epochs

## Evaluation

The example computes simple classification accuracy on the test split using:

preds = model(X_test).argmax(1)
acc = (preds == y_test).float().mean().item()

For more robust evaluation consider adding:

- Precision / Recall / F1 (per-class)
- Confusion matrix
- Cross-validation (k-fold)
- Calibration checks for probability outputs (softmax)

## Usage (how to run the example)

Prerequisites: Python 3.8+, PyTorch, scikit-learn

1. Install dependencies (example):

```powershell
pip install torch torchvision torchaudio scikit-learn numpy
```

2. Run the script:

```powershell
python HARCNet/code.py
```

Notes:

- The model and example are simple and intended for experimentation. For production use, add reproducible seeds, checkpointing, logging, and argument parsing.
- To save a trained model, add `torch.save(model.state_dict(), 'harcnet.pth')` and load with `model.load_state_dict(...)`.

## Suggested Improvements

- Add command-line flags (argparse) for dataset, epochs, lr, and architecture params
- Add model checkpointing and evaluation callbacks
- Add more datasets and a small hyperparameter search
- Provide unit tests that check forward pass shapes and training step
