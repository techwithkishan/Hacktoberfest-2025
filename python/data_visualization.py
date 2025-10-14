import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

"""
This Python script creates a number of example plots using the matplotlib and seaborn libraries.
It includes:
1. Bar plot: Number of claims by car make
2. Line plot: Insurance sales over months
3. Scatter plot: Driver age vs. Car age colored by car make
4. Heatmap: Correlation matrix of numerical features
5. Horizontal bar plot: Number of claims by city size
6. Histogram: Distribution of driver age
7. Pair plot: Pairwise relationships in the dataset

The data has been generated randomly for demonstration purposes.
"""

def main():
    # Set the theme for the plots using seaborn
    sns.set_theme(style="whitegrid")

    # Seed for reproducibility
    np.random.seed(42)

    # Generate sample car insurance claims data
    data = pd.DataFrame({
        "Car Make": np.random.choice(["Toyota", "BMW", "Renault", "Ford", "Dodge"], size=100),
        "City Size": np.random.choice(["Small", "Medium", "Large"], size=100),
        "Car Age": np.random.randint(0, 20, size=100),
        "Driver Age": np.random.randint(18, 70, size=100),
        "Claim": np.random.choice([0, 1], size=100, p=[0.7, 0.3])
    })

    # Generate sample insurance sales data
    sales_data = pd.DataFrame({
        "Month": pd.date_range(start="2025-01-01", periods=12, freq='ME'),
        "Sales": np.random.randint(1000, 5000, size=12)
    })

    # 1. Bar plot: Number of claims by car make
    plt.figure(figsize=(10, 6))
    sns.countplot(data=data, x="Car Make", hue="Claim", palette="Set2")
    plt.title("Number of Claims by Car Make")
    plt.xlabel("Car Make")
    plt.ylabel("Number of Claims")
    plt.legend(title="Claim", labels=["No Claim", "Claim"])
    plt.show()

    # 2. Line plot: Insurance sales over months
    plt.figure(figsize=(10, 6))
    sns.lineplot(data=sales_data, x="Month", y="Sales", marker="o", color="b")
    plt.title("Insurance Sales Over Months")
    plt.xlabel("Month")
    plt.ylabel("Sales")
    plt.xticks(rotation=45)
    plt.show()

    # 3. Scatter plot: Driver age vs. Car age colored by car make
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=data, x="Driver Age", y="Car Age", hue="Car Make")
    plt.title("Driver Age vs. Car Age by Car Make")
    plt.xlabel("Driver Age")
    plt.ylabel("Car Age")
    plt.legend(title="Car Make")
    plt.show()

    # 4. Heatmap: Correlation matrix of numerical features
    plt.figure(figsize=(8, 6))
    corr = data[["Car Age", "Driver Age", "Claim"]].corr()
    sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)
    plt.title("Correlation Matrix")
    plt.show()

    # 5. Horizontal bar plot: Number of claims by city size
    plt.figure(figsize=(10, 6))
    sns.barplot(
        data=data, 
        x="Claim", 
        y="City Size", 
        estimator=np.sum, 
        errorbar=None, 
        hue="City Size",
        palette="Set3",
        order=["Small", "Medium", "Large"]
    )
    plt.title("Number of Claims by City Size")
    plt.xlabel("Number of Claims")
    plt.ylabel("City Size")
    plt.show()

    # 6. Histogram: Distribution of driver age
    plt.figure(figsize=(10, 6))
    sns.histplot(data=data, x="Driver Age", bins=15, kde=True, color="m")
    plt.title("Distribution of Driver Age")
    plt.xlabel("Driver Age")
    plt.ylabel("Frequency")
    plt.show()

    # 7. Pair plot: Pairwise relationships in the dataset
    sns.pairplot(data, hue="Car Make", diag_kind="kde", palette="Set1")
    plt.suptitle("Pairwise Relationships in the Dataset", y=1)
    plt.show()

if __name__ == "__main__":
    main()