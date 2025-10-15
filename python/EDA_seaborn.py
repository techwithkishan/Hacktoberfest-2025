import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
import os


def load_data():
    """Load Titanic dataset from Seaborn"""
    df = sns.load_dataset('titanic')
    print(f"Dataset loaded successfully! Shape: {df.shape}")
    return df


def summarize_data(df):
    """Display dataset information, statistics, and missing values"""
    print("\n Basic Information:")
    print(df.info())

    print("\n Statistical Summary:")
    print(df.describe(include='all').T)

    print("\n Missing Values:")
    print(df.isnull().sum())


def visualize_data(df, output_dir="eda_outputs"):
    """Generate visualizations for EDA"""
    os.makedirs(output_dir, exist_ok=True)

    # Distribution of age
    plt.figure(figsize=(8, 4))
    sns.histplot(df['age'].dropna(), kde=True, color='skyblue')
    plt.title("Distribution of Age")
    plt.savefig(os.path.join(output_dir, "age_distribution.png"))
    plt.close()

    # Survival count
    plt.figure(figsize=(6, 4))
    sns.countplot(x='survived', data=df, palette='Set2')
    plt.title("Survival Count")
    plt.savefig(os.path.join(output_dir, "survival_count.png"))
    plt.close()

    # Survival by gender
    plt.figure(figsize=(6, 4))
    sns.countplot(x='sex', hue='survived', data=df, palette='coolwarm')
    plt.title("Survival by Gender")
    plt.savefig(os.path.join(output_dir, "survival_by_gender.png"))
    plt.close()

    # Survival by class
    plt.figure(figsize=(6, 4))
    sns.countplot(x='class', hue='survived', data=df, palette='viridis')
    plt.title("Survival by Passenger Class")
    plt.savefig(os.path.join(output_dir, "survival_by_class.png"))
    plt.close()



def correlation_analysis(df, output_dir="eda_outputs"):
    """Compute and visualize correlation matrix"""
    os.makedirs(output_dir, exist_ok=True)
    numeric_df = df.select_dtypes(include='number')
    corr = numeric_df.corr()

    print("\n🔗 Correlation Matrix:\n", corr)

    plt.figure(figsize=(10, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.2f')
    plt.title("Feature Correlation Heatmap")
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "correlation_heatmap.png"))
    plt.close()



def pairwise_plot(df, output_dir="eda_outputs"):
    """Generate pairplot for numeric relationships"""
    os.makedirs(output_dir, exist_ok=True)
    sns.pairplot(df[['age', 'fare', 'pclass', 'survived']].dropna(), hue='survived', palette='husl')
    plt.savefig(os.path.join(output_dir, "pairwise_plot.png"))
    plt.close()


def main():
    """Run complete EDA pipeline"""
    df = load_data()
    summarize_data(df)
    visualize_data(df)
    correlation_analysis(df)
    pairwise_plot(df)

    print("\n EDA Completed! Plots saved in 'eda_outputs/' folder.")

if __name__ == "__main__":
    main()