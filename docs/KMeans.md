# KMeans (From-scratch implementation)

Location: `python/kmeans.py`

## Overview

This is an educational, from-scratch implementation of the K-Means clustering algorithm. It follows the classical Forgy initialization (random sample centroids), iterative assignment and update steps, and convergence checking by centroid movement.

## Public API

Class: `KMeans`

- __init__(k=3, max_iters=100): number of clusters and max iterations
- fit(X): Run K-Means on data X (numpy array of shape (n_samples, n_features)).
- Attributes after fit:
  - centroids: shape (k, n_features)
  - labels: array of shape (n_samples,) with cluster indices

## Implementation notes

- Distance metric: Euclidean distance
- Empty cluster handling: keeps the previous centroid if a cluster becomes empty
- Convergence: uses `np.allclose(old_centroids, new_centroids)` to stop early

## Usage example

Run the included script to generate synthetic 2D data and visualize results (requires matplotlib):

```powershell
python python/kmeans.py
```

Visualization is supported only for 2D data (X.shape[1] == 2). For higher dimensions, inspect `labels` and `centroids` programmatically.

## Suggestions

- Allow re-initialization strategies for empty clusters (re-sample or choose farthest point)
- Add metrics like inertia (sum of squared distances) and silhouette score
- Vectorize distance computations for speed using broadcasting
