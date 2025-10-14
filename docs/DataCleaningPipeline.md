# Data Cleaning Pipeline

Location: `python/data_cleaning_pipeline.py`

## Overview

`DataCleaningPipeline` is a utility class that centralizes common data cleaning tasks: missing value detection and handling, outlier detection/handling, normalization, and a convenience `run_full_pipeline` that executes them in order and returns a cleaned DataFrame plus a report.

## Main methods

- `detect_missing_values(df, threshold=0.5)`: returns a summary of missing values and columns exceeding the threshold
- `handle_missing_values(df, strategy='auto', numeric_strategy='mean', categorical_strategy='mode', drop_threshold=0.7)`: handles missing data using auto heuristics or explicit strategies
- `detect_outliers(df, method='iqr', threshold=3)`: finds outliers per numeric column using IQR, z-score, or modified z-score
- `handle_outliers(df, method='cap', **kwargs)`: cap, remove, or transform outliers
- `normalize_data(df, method='standard', columns=None)`: fit and apply StandardScaler, MinMaxScaler, or RobustScaler to numeric columns
- `create_cleaning_report(original_df, cleaned_df)`: returns a dictionary summarizing cleaning changes
- `run_full_pipeline(df, missing_strategy='auto', outlier_method='cap', normalization_method='standard')`: convenience method to run the full pipeline

## Example usage

```python
from python.data_cleaning_pipeline import DataCleaningPipeline
import pandas as pd

df = pd.read_csv('data.csv')
pipeline = DataCleaningPipeline()
clean_df, report = pipeline.run_full_pipeline(df)
print(report)
```

## Notes and recommendations

- The default `auto` strategy is conservative and may drop columns with very high missing ratios. Review `high_missing_columns` in the missing summary before automatic drops.
- For time-series or grouped data, perform missing-value handling per-group or with forward/backward fill as appropriate (not implemented here).
- After normalization, keep scalers if you need to transform future data consistently (scalers are stored in `pipeline.scalers`).
