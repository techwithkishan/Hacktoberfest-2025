"""Data Visualization Examples
================================

This script demonstrates common data visualization techniques using
Matplotlib and Seaborn. It can be imported as a module or executed as a
stand‑alone CLI tool to generate example plots.

Features
--------
1. Synthetic dataset generation (categorical + numerical)
2. Multiple chart types:
   - Line Plot
   - Bar Chart
   - Histogram & KDE
   - Scatter Plot with regression line
   - Box & Violin Plots
   - Heatmap (correlation matrix)
   - Pair Plot (scatter matrix)
   - Pie / Donut Chart
3. Simple command line interface to choose which plots to render
4. Saves figures to an output directory (default: ./viz_outputs)
5. Easily extensible – add your own plot_* functions following the pattern

Usage
-----
From repository root (after installing requirements):

    python -m python.data_visualization_examples --all
    python -m python.data_visualization_examples --plots line bar scatter
    python -m python.data_visualization_examples --style darkgrid --out results --dpi 150

Installation
------------
Install required libraries (matplotlib, seaborn, pandas, numpy):

    pip install -r python/requirements-data-viz.txt

Or individually:

    pip install matplotlib seaborn pandas numpy

Notes
-----
- The script avoids heavy dependencies; seaborn auto-loads matplotlib.
- When run in headless environments, set the MPL backend, e.g.:

    import matplotlib; matplotlib.use("Agg")

"""
from __future__ import annotations

import argparse
import os
from dataclasses import dataclass
from typing import Callable, Dict, List

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Global seaborn style (overridable via CLI)
sns.set_theme(style="whitegrid")

RNG = np.random.default_rng(42)

@dataclass
class Dataset:
    df: pd.DataFrame


def make_dataset(n: int = 200) -> Dataset:
    """Generate a synthetic dataset.

    Columns:
        x: sequential index
        category: one of ['A','B','C']
        subgroup: one of ['X','Y']
        value1/value2: noisy signals
    """
    x = np.arange(n)
    category = RNG.choice(list("ABC"), size=n, p=[0.4, 0.35, 0.25])
    subgroup = RNG.choice(["X", "Y"], size=n)

    # Create two related numeric series with noise
    base_signal = np.sin(x / 10) + x * 0.02
    value1 = base_signal + RNG.normal(0, 0.4, size=n)
    value2 = base_signal * 0.5 + RNG.normal(0, 0.5, size=n)

    df = pd.DataFrame(
        {
            "x": x,
            "category": category,
            "subgroup": subgroup,
            "value1": value1,
            "value2": value2,
        }
    )
    return Dataset(df=df)

# ---- Plot functions -------------------------------------------------------
PlotFunc = Callable[[Dataset, argparse.Namespace], None]


def _prep_save(args: argparse.Namespace, name: str):
    os.makedirs(args.out, exist_ok=True)
    path = os.path.join(args.out, f"{name}.{args.format}")
    plt.tight_layout()
    plt.savefig(path, dpi=args.dpi)
    if not args.no_show:
        plt.show()
    plt.close()
    print(f"Saved: {path}")


def plot_line(ds: Dataset, args: argparse.Namespace):
    """Line plot showing two value series."""
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.plot(ds.df["x"], ds.df["value1"], label="value1", color="#1f77b4")
    ax.plot(ds.df["x"], ds.df["value2"], label="value2", color="#ff7f0e")
    ax.set_title("Line Plot of Value Series")
    ax.set_xlabel("x")
    ax.set_ylabel("values")
    ax.legend()
    _prep_save(args, "line_plot")


def plot_bar(ds: Dataset, args: argparse.Namespace):
    """Bar chart: mean of value1 by category."""
    fig, ax = plt.subplots(figsize=(6, 4))
    means = ds.df.groupby("category")["value1"].mean().reset_index()
    sns.barplot(data=means, x="category", y="value1", ax=ax, palette="viridis")
    ax.set_title("Mean of value1 by Category")
    _prep_save(args, "bar_chart")


def plot_hist(ds: Dataset, args: argparse.Namespace):
    """Histogram + KDE of value1 distribution."""
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.histplot(ds.df["value1"], kde=True, color="#2ca02c", ax=ax)
    ax.set_title("Distribution of value1")
    _prep_save(args, "histogram")


def plot_scatter(ds: Dataset, args: argparse.Namespace):
    """Scatter of value1 vs value2 colored by category with regression line."""
    fig, ax = plt.subplots(figsize=(6, 5))
    sns.scatterplot(data=ds.df, x="value1", y="value2", hue="category", style="subgroup", ax=ax)
    # Add simple regression line for overall relationship
    coeffs = np.polyfit(ds.df["value1"], ds.df["value2"], 1)
    xline = np.linspace(ds.df["value1"].min(), ds.df["value1"].max(), 100)
    yline = np.polyval(coeffs, xline)
    ax.plot(xline, yline, color="black", lw=2, label=f"fit y={coeffs[0]:.2f}x+{coeffs[1]:.2f}")
    ax.legend()
    ax.set_title("Scatter Plot with Regression Line")
    _prep_save(args, "scatter_plot")


def plot_box_violin(ds: Dataset, args: argparse.Namespace):
    """Combined box & violin for value1 by category."""
    fig, ax = plt.subplots(figsize=(7, 4))
    sns.violinplot(data=ds.df, x="category", y="value1", inner=None, color="#9edae5", ax=ax)
    sns.boxplot(data=ds.df, x="category", y="value1", width=0.3, showcaps=True, boxprops={"facecolor": "white"}, ax=ax)
    ax.set_title("Violin + Box Plot of value1 by Category")
    _prep_save(args, "box_violin")


def plot_heatmap(ds: Dataset, args: argparse.Namespace):
    """Correlation matrix heatmap."""
    fig, ax = plt.subplots(figsize=(5, 4))
    corr = ds.df[["value1", "value2", "x"]].corr()
    sns.heatmap(corr, annot=True, cmap="coolwarm", ax=ax, fmt=".2f")
    ax.set_title("Correlation Heatmap")
    _prep_save(args, "heatmap")


def plot_pairplot(ds: Dataset, args: argparse.Namespace):
    """Pairplot for numerical features colored by category."""
    g = sns.pairplot(ds.df, vars=["value1", "value2", "x"], hue="category", corner=True)
    g.fig.suptitle("Pair Plot", y=1.02)
    os.makedirs(args.out, exist_ok=True)
    path = os.path.join(args.out, f"pairplot.{args.format}")
    g.fig.savefig(path, dpi=args.dpi)
    if not args.no_show:
        plt.show()
    plt.close(g.fig)
    print(f"Saved: {path}")


def plot_pie(ds: Dataset, args: argparse.Namespace):
    """Pie/Donut chart showing category proportion."""
    fig, ax = plt.subplots(figsize=(5, 5))
    counts = ds.df["category"].value_counts().sort_index()
    wedges, texts = ax.pie(counts, labels=counts.index, autopct="%1.1f%%", startangle=90, pctdistance=0.8)
    # Donut hole
    centre_circle = plt.Circle((0, 0), 0.55, fc="white")
    fig.gca().add_artist(centre_circle)
    ax.set_title("Category Distribution (Donut Chart)")
    _prep_save(args, "pie_donut")

# Registry of plots
PLOTS: Dict[str, PlotFunc] = {
    "line": plot_line,
    "bar": plot_bar,
    "hist": plot_hist,
    "scatter": plot_scatter,
    "boxviolin": plot_box_violin,
    "heatmap": plot_heatmap,
    "pair": plot_pairplot,
    "pie": plot_pie,
}


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Generate example data visualizations.")
    parser.add_argument("--plots", nargs="*", choices=sorted(PLOTS.keys()), help="Specific plots to generate")
    parser.add_argument("--all", action="store_true", help="Generate all available plot types")
    parser.add_argument("--out", default="viz_outputs", help="Output directory for saved figures")
    parser.add_argument("--dpi", type=int, default=120, help="Figure resolution")
    parser.add_argument("--format", choices=["png", "jpg", "pdf", "svg"], default="png", help="Image format")
    parser.add_argument("--style", default="whitegrid", help="Seaborn style (e.g., darkgrid, white, ticks)")
    parser.add_argument("--no-show", action="store_true", help="Do not display figures interactively")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    parser.add_argument("--rows", type=int, default=200, help="Number of synthetic rows to generate")
    return parser


def main(argv: List[str] | None = None):
    parser = build_arg_parser()
    args = parser.parse_args(argv)

    # Style & seed
    sns.set_theme(style=args.style)
    global RNG
    RNG = np.random.default_rng(args.seed)

    ds = make_dataset(args.rows)

    if not args.plots and not args.all:
        parser.print_help()
        print("\nNo plots selected. Use --all or specify with --plots.")
        return 0

    selected = list(PLOTS.keys()) if args.all else args.plots

    for key in selected:
        print(f"Generating plot: {key}")
        PLOTS[key](ds, args)

    print("Done.")
    return 0


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())
