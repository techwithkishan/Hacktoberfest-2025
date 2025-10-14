from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

texts = ["I love this project", "This is terrible", "Fantastic job", "I hate bugs"]
labels = ["pos", "neg", "pos", "neg"]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)
model = MultinomialNB().fit(X, labels)

def predict_sentiment(text):
    x = vectorizer.transform([text])
    return model.predict(x)[0]

if __name__ == "__main__":
    while True:
        user = input("Enter a sentence (or 'exit'): ")
        if user == "exit":
            break
        print("Sentiment:", predict_sentiment(user))
