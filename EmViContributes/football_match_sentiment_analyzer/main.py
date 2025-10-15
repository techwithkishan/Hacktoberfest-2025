import pandas as pd # for data manipulation
from sklearn.model_selection import train_test_split # for splitting data
# from sklearn.feature_extraction.text import CountVectorizer # for turning text into vectors
# from sklearn.linear_model import LogisticRegression # for classification on data
# from sklearn.metrics import accuracy_score # for evaluating model performance
from sklearn.feature_extraction.text import TfidfVectorizer # checks how important a word is to a document in a collection 
from sklearn.preprocessing import LabelEncoder # converts nuetral, positive and negative to values
from tensorflow.keras.models import Sequential # for creating neural network model
from tensorflow.keras.layers import Dense, Dropout # dense helps to build a neural network dropout enseures no overfitting

# Load dataset
data = pd.read_csv("dataset.csv")

# train-test split:
# splitting 80-20 for training and testing. this ensures that model would be able to genralize well on unseen data.
# random state locks the data on randomizing everytime we run the code
X_train, X_test,y_train, y_test = train_test_split(data['review'], data["sentiment"],test_size=0.2, random_state=42)

# text vecotrization:
# converts text data into numerical vectors(row, column format) that machine learning models can understand.
# the tfidf was upgraded and max_featues keeps 5000 top most relevant words
# vectorizer = CountVectorizer()
vectorizer = TfidfVectorizer(max_features=5000)

# fit transform learns vocabulary while transform uses same vocabulary data
X_train_vectors = vectorizer.fit_transform(X_train)
X_test_vectors = vectorizer.transform(X_test)

# Update encode labels
encoder = LabelEncoder()
y_train_enc = encoder.fit_transform(y_train)
y_test_enc = encoder.transform(y_test)

# Model training:
# model = LogisticRegression()
# # learning from training data X_train_vectors the vectored sentence and y_train the labels
# model.fit(X_train_vectors, y_train)
# upgrade building a neural network
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train_vectors.shape[1],)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dense(3, activation='softmax')  # 3 classes: positive, negative, neutral
])

#compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

#Train model
model.fit(X_train_vectors.toarray(),y_train_enc, epochs=10, batch_size=32, validation_split=0.2)

# Evaluation
# predictions = model.predict(X_test_vectors)
# accuracy = accuracy_score(y_test, predictions)
loss, accuracy = model.evaluate(X_test_vectors.toarray(), y_test_enc)
print(f"Model Accuracy: {accuracy*100:.2f}%")

# Prediction:
user_input = input("Enter a football match review: ")
user_vector = vectorizer.transform([user_input]).toarray()
prediction = model.predict(user_vector)
sentiment = encoder.inverse_transform([prediction.argmax()])[0]
print(f"Predicted Sentiment: {sentiment.capitalize()}")