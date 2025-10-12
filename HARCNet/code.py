import torch
import torch.nn as nn
import torch.nn.functional as F
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load dataset
data = load_wine()
X = data.data
y = data.target

scaler = StandardScaler()
X = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

X_train = torch.tensor(X_train, dtype=torch.float32)
X_test = torch.tensor(X_test, dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.long)
y_test = torch.tensor(y_test, dtype=torch.long)


# --- UNIQUE MODEL ---
class HARCNet(nn.Module):
    def __init__(self, input_dim, num_classes):
        super(HARCNet, self).__init__()

        # 1️⃣ Feature weighting (learnable feature importance)
        self.feature_weights = nn.Parameter(torch.ones(input_dim))

        # 2️⃣ Dense Capsule Block (vectorized transformation)
        self.capsule_dim = 8
        self.num_capsules = 4
        self.capsule_transform = nn.Linear(
            input_dim, self.num_capsules * self.capsule_dim)

        # 3️⃣ Self-Attention Gate
        self.attn_query = nn.Linear(self.capsule_dim, self.capsule_dim)
        self.attn_key = nn.Linear(self.capsule_dim, self.capsule_dim)
        self.attn_value = nn.Linear(self.capsule_dim, self.capsule_dim)

        # 4️⃣ Residual Dense Layers
        self.fc1 = nn.Linear(self.capsule_dim * self.num_capsules, 64)
        self.fc2 = nn.Linear(64, 64)
        self.residual = nn.Linear(self.capsule_dim * self.num_capsules, 64)

        # 5️⃣ Output Layer
        self.output = nn.Linear(64, num_classes)

    def forward(self, x):
        # Apply feature weighting
        x = x * self.feature_weights

        # Capsule transformation
        caps = self.capsule_transform(x)
        caps = caps.view(-1, self.num_capsules, self.capsule_dim)

        # Attention mechanism over capsules
        Q = self.attn_query(caps)
        K = self.attn_key(caps)
        V = self.attn_value(caps)
        attn_weights = F.softmax(torch.bmm(Q, K.transpose(
            1, 2)) / (self.capsule_dim ** 0.5), dim=-1)
        attended = torch.bmm(attn_weights, V)

        # Flatten capsule output
        flat = attended.view(-1, self.num_capsules * self.capsule_dim)

        # Residual dense connection
        res = F.relu(self.fc1(flat))
        out = F.relu(self.fc2(res) + self.residual(flat))

        # Classification output
        out = self.output(out)
        return out


# --- Train the Model ---
model = HARCNet(input_dim=X_train.shape[1], num_classes=len(data.target_names))
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(50):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()

    if (epoch+1) % 10 == 0:
        with torch.no_grad():
            preds = model(X_test).argmax(1)
            acc = (preds == y_test).float().mean().item()
        print(f"Epoch {epoch+1}: Loss={loss.item():.4f}, Test Acc={acc:.4f}")
