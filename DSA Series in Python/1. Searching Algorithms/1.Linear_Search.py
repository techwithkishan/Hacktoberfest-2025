"""
Title: Linear Search
Contributor: https://github.com/Him-an-shi
Issue: #132

Description:
1. Linear Search is also known as Sequential Search.
2. As the name suggests, it searches the given element sequentially, i.e., one after another.
3. It works on any type of array/list whether it is sorted or unsorted.
4. As it involves iterating through the entire sequence, the time complexity becomes O(n).
"""

def linear_search(arr, target):
    """
    Performs linear search on a list.

    Parameters:
    arr (list): List of elements.
    target: Element to search for.

    Returns:
    str: Message indicating the index if found, else not found.
    """
    for i in range(len(arr)):  # Iterating through the list
        if arr[i] == target:   # Comparing each element with target
            return f"Found {target} at index {i}"
    return f"{target} not found"


# Example usage:
arr = [10, 20, 30, 40, 50]
print(linear_search(arr, 30))  # Output: Found 30 at index 2
print(linear_search(arr, 60))  # Output: 60 not found

"""
Advantages:
1. Very simple to implement.
2. Works on both sorted and unsorted arrays.
3. No extra memory is required.

Disadvantages:
1. Inefficient for large datasets due to O(n) time complexity.
"""
