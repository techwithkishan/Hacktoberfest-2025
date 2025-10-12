import numpy as np
import matplotlib.pyplot as plt

class KMeans:
    """
    K-Means clustering algorithm implementation from scratch.

    Attributes:
        k (int): The number of clusters to form.
        max_iters (int): The maximum number of iterations for the algorithm.
        centroids (np.ndarray): The final computed centroids after fitting.
        labels (np.ndarray): The cluster index assigned to each data point.
    """

    def __init__(self, k=3, max_iters=100):
        """
        Initializes the KMeans object.

        Args:
            k (int): The number of clusters (default: 3).
            max_iters (int): The maximum number of iterations (default: 100).
        """
        self.k = k
        self.max_iters = max_iters
        self.centroids = None
        self.labels = None

    def _euclidean_distance(self, X1, X2):
        """Calculates the Euclidean distance between two points or arrays of points."""
        # Note: axis=-1 sums along the last dimension (the features)
        return np.sqrt(np.sum((X1 - X2)**2, axis=-1))

    def _initialize_centroids(self, X):
        """Randomly selects k data points as initial centroids (Forgy method)."""
        # Randomly select k unique indices
        random_indices = np.random.choice(X.shape[0], self.k, replace=False)
        # Set the corresponding data points as initial centroids
        self.centroids = X[random_indices]

    def _assign_clusters(self, X):
        """
        Assigns each data point to the nearest centroid.

        Returns:
            np.ndarray: An array containing the cluster index for each data point.
        """
        # Calculate distance from each point to every centroid
        # X is (n_samples, n_features), self.centroids is (k, n_features)
        distances = np.zeros((X.shape[0], self.k))

        for i, centroid in enumerate(self.centroids):
            # Calculate distance between all points in X and the current centroid
            distances[:, i] = self._euclidean_distance(X, centroid)
        
        # The cluster label is the index of the minimum distance
        return np.argmin(distances, axis=1)

    def _update_centroids(self, X, labels):
        """
        Recalculates the centroids based on the mean of all points assigned to that cluster.
        
        Returns:
            np.ndarray: The newly computed centroids.
        """
        new_centroids = np.zeros(self.centroids.shape)
        for i in range(self.k):
            # Find all data points assigned to cluster i
            cluster_points = X[labels == i]
            
            if len(cluster_points) > 0:
                # Calculate the mean of these points (the new centroid)
                new_centroids[i] = np.mean(cluster_points, axis=0)
            else:
                # Handle empty cluster: keep the old centroid (or re-initialize)
                new_centroids[i] = self.centroids[i]
                
        return new_centroids

    def fit(self, X):
        """
        Runs the K-Means clustering algorithm.

        Args:
            X (np.ndarray): The input data matrix (n_samples, n_features).
        """
        if X is None or len(X) == 0:
            raise ValueError("Input data X cannot be None or empty.")
            
        # 1. Initialize centroids
        self._initialize_centroids(X)
        
        print(f"Starting K-Means with k={self.k}...")
        
        for iteration in range(self.max_iters):
            # Store current centroids to check for convergence
            old_centroids = self.centroids.copy()

            # 2. Assignment Step
            self.labels = self._assign_clusters(X)

            # 3. Update Step (Recalculate means)
            self.centroids = self._update_centroids(X, self.labels)

            # 4. Check for convergence: stop if centroids haven't moved significantly
            if np.allclose(old_centroids, self.centroids):
                print(f"K-Means converged after {iteration + 1} iterations.")
                break
        else:
            print(f"K-Means finished {self.max_iters} iterations without full convergence.")

        return self

# ----------------------------------------------------------------------
# Example Usage and Visualization
# ----------------------------------------------------------------------

def generate_data(n_samples=300):
    """Generates synthetic 2D data for clustering."""
    np.random.seed(42)  # for reproducibility
    # Create three distinct clusters
    cluster1 = np.random.normal(loc=[2, 2], scale=1.0, size=(n_samples // 3, 2))
    cluster2 = np.random.normal(loc=[8, 3], scale=1.5, size=(n_samples // 3, 2))
    # Use remaining samples for the third cluster
    cluster3 = np.random.normal(loc=[3, 9], scale=0.8, size=(n_samples - 2 * (n_samples // 3), 2))
    
    X = np.vstack([cluster1, cluster2, cluster3])
    return X

def visualize_clusters(X, labels, centroids):
    """
    Plots the clustered data and their centroids using matplotlib.
    Requires 2D data (n_samples, 2).
    """
    
    if X.shape[1] != 2:
        print("Visualization is only supported for 2-dimensional data.")
        return

    plt.figure(figsize=(10, 7))
    
    # Scatter plot data points, colored by cluster
    unique_labels = np.unique(labels)
    for i in unique_labels:
        # Plot points belonging to cluster i
        plt.scatter(X[labels == i, 0], X[labels == i, 1], 
                    label=f'Cluster {i}', alpha=0.6, edgecolors='w')

    # Plot the centroids
    plt.scatter(centroids[:, 0], centroids[:, 1], 
                marker='X', s=200, color='red', 
                label='Centroids', edgecolors='k', linewidths=1.5)

    plt.title(f'K-Means Clustering (k={len(centroids)}) from Scratch')
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.show()

if __name__ == '__main__':
    # Define the number of clusters
    K_VALUE = 3

    # 1. Generate synthetic data
    data = generate_data(n_samples=400)
    print(f"Data shape: {data.shape}")

    # 2. Initialize and run K-Means
    kmeans_model = KMeans(k=K_VALUE, max_iters=500)
    kmeans_model.fit(data)

    # 3. Get results
    final_labels = kmeans_model.labels
    final_centroids = kmeans_model.centroids

    # 4. Visualize the results
    if final_labels is not None and final_centroids is not None:
        visualize_clusters(data, final_labels, final_centroids)