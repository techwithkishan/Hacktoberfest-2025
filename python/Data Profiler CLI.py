import pandas as pd
import numpy as np
import argparse

def profile_csv(file_path):
    df = pd.read_csv(file_path)
    print("📁 File:", file_path)
    print("\nColumns:", df.columns.tolist())
    print("\nData Types:\n", df.dtypes)
    print("\nMissing Values:\n", df.isnull().sum())
    print("\nBasic Stats:\n", df.describe(include='all'))
    print("\nCorrelation Matrix:\n", df.corr(numeric_only=True))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Simple CSV Profiler")
    parser.add_argument("file", help="Path to CSV file")
    args = parser.parse_args()
    profile_csv(args.file)
