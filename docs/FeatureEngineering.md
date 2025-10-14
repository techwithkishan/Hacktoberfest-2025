# Feature Engineering utilities

Location: `python/feature_engineering.py`

## Overview

`FeatureEngineering` is a small helper class around common preprocessing steps for tabular data: label encoding, one-hot encoding, scaling, and selecting top-k features.

## Main methods

- `label_encode(columns)`: fits a `LabelEncoder` per column and replaces values with integer labels. Encoders are saved in `self.encoders`.
- `one_hot_encode(columns)`: fits a `OneHotEncoder` and replaces specified columns with one-hot columns. Encoder saved under `self.encoders['one_hot']`.
- `standard_scale(columns)`: fits `StandardScaler` and replaces columns with standardized values; scaler saved in `self.scalers`.
- `minmax_scale(columns)`: fits `MinMaxScaler` and applies min-max scaling.
- `select_kbest(X, y, k=10, score_func='chi2')`: returns a DataFrame with top-k features selected by `SelectKBest` using `chi2` or `f_classif`.

## Example

```python
from python.feature_engineering import FeatureEngineering
import pandas as pd

df = pd.read_csv('data.csv')
fe = FeatureEngineering(df)
df = fe.label_encode(['Gender'])
df = fe.one_hot_encode(['Country'])
df = fe.standard_scale(['Age', 'Salary'])

X = df.drop('Target', axis=1)
y = df['Target']
X_selected = fe.select_kbest(X, y, k=5, score_func='f_classif')
```

## Notes

- `one_hot_encode` uses `drop='first'` to avoid multicollinearity by default.
- `select_kbest` expects numeric X; if you have categorical features, encode them first.
- The object stores fitted encoders/scalers for reuse on new data.
