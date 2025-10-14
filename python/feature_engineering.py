import pandas as pd
from sklearn.preprocessing import OneHotEncoder, LabelEncoder, StandardScaler, MinMaxScaler
from sklearn.feature_selection import SelectKBest, chi2, f_classif

class FeatureEngineering:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.encoders = {}
        self.scalers = {}

    # --------------------
    # Encoding
    # --------------------
    def label_encode(self, columns):
        """Label encode specified columns"""
        for col in columns:
            le = LabelEncoder()
            self.df[col] = le.fit_transform(self.df[col])
            self.encoders[col] = le
        return self.df

    def one_hot_encode(self, columns):
        """One-hot encode specified columns"""
        ohe = OneHotEncoder(sparse_output=False, drop='first')
        encoded = ohe.fit_transform(self.df[columns])
        encoded_df = pd.DataFrame(encoded, columns=ohe.get_feature_names_out(columns))
        self.df = pd.concat([self.df.drop(columns, axis=1), encoded_df], axis=1)
        self.encoders['one_hot'] = ohe
        return self.df

    # --------------------
    # Scaling
    # --------------------
    def standard_scale(self, columns):
        """Standard scale specified columns"""
        scaler = StandardScaler()
        self.df[columns] = scaler.fit_transform(self.df[columns])
        self.scalers['standard'] = scaler
        return self.df

    def minmax_scale(self, columns):
        """Min-max scale specified columns"""
        scaler = MinMaxScaler()
        self.df[columns] = scaler.fit_transform(self.df[columns])
        self.scalers['minmax'] = scaler
        return self.df

    # --------------------
    # Feature Selection
    # --------------------
    def select_kbest(self, X, y, k=10, score_func='chi2'):
        """Select top k features based on chi2 or f_classif"""
        if score_func == 'chi2':
            selector = SelectKBest(score_func=chi2, k=k)
        elif score_func == 'f_classif':
            selector = SelectKBest(score_func=f_classif, k=k)
        else:
            raise ValueError("score_func must be 'chi2' or 'f_classif'")

        X_new = selector.fit_transform(X, y)
        selected_features = X.columns[selector.get_support()]
        return pd.DataFrame(X_new, columns=selected_features)

# --------------------
# Example Usage
# --------------------
if __name__ == "__main__":
    # Sample dataset
    data = {
        'Gender': ['Male', 'Female', 'Female', 'Male'],
        'Country': ['US', 'UK', 'IN', 'US'],
        'Age': [23, 45, 31, 35],
        'Salary': [50000, 60000, 40000, 52000],
        'Purchased': [0, 1, 0, 1]
    }

    df = pd.DataFrame(data)

    fe = FeatureEngineering(df)

    # --------------------
    # Encoding
    # --------------------
    df = fe.label_encode(['Gender'])
    df = fe.one_hot_encode(['Country'])

   
    df = fe.standard_scale(['Age', 'Salary'])
   

    # --------------------
    # Feature Selection
    # --------------------
    X = df.drop('Purchased', axis=1)
    y = df['Purchased']

   
    df_selected = fe.select_kbest(X, y, k=3, score_func='f_classif')

    print("Processed DataFrame:\n", df)
    print("\nTop Features:\n", df_selected)
