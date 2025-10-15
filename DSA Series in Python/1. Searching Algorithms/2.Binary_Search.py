"""
Title: Binary Search
Contributor: https://github.com/Him-an-shi
Issue: #132

Description:
Binary Search is an efficient searching technique used only on sorted arrays or lists.
Instead of checking each element one by one like Linear Search, it compares the target 
with the middle element. Based on the comparison, it eliminates half of the remaining 
search space in every step.

Example to understand:
Let arr = [10, 20, 30, 40, 50] and target = 40

Step 1: mid = (0+4)//2 = 2 -> arr[2] = 30 (30 < 40) → Search in right half [40, 50]
Step 2: mid = (3+4)//2 = 3 -> arr[3] = 40 (Match found)

Time Complexity Explanation:
- The array reduces like n → n/2 → n/4 → n/8 → ... → 1.
- This forms log₂(n) steps, so time complexity is O(log n).
- Best Case: O(1) → if the middle element is the target.
- Worst/Average Case: O(log n).
- Space Complexity: O(1) → for iterative implementation.
"""

def binary_search(arr, target):
    """
    Performs binary search on a sorted list.

    Parameters:
    arr (list): Sorted list of elements.
    target: Element to search for.

    Returns:
    str: Message indicating the index if found, else not found.
    """
    left, right = 0, len(arr) - 1  # Search boundaries

    while left <= right:
        mid = left + (right - left) // 2  # Middle index

        if arr[mid] == target:  # If target found
            return f"Found {target} at index {mid}"
        elif arr[mid] < target:  # Target is in right half
            left = mid + 1
        else:  # Target is in left half
            right = mid - 1

    return f"{target} not found"


# Example usage:
arr = [10, 20, 30, 40, 50]  # Must be sorted
print(binary_search(arr, 40))  # Output: Found 40 at index 3
print(binary_search(arr, 60))  # Output: 60 not found

'''Optimization Note:
This iterative approach can further be written using recursion, which makes the logic 
more aligned with the divide-and-conquer paradigm, improving code readability and 
structural clarity.'''

def binary_search_recursive(arr, target, left, right):
    # Recursive function to perform binary search.
    
    if left > right:  # Base condition: element not found
        return f"{target} not found"

    mid = left + (right - left) // 2  # Middle index

    if arr[mid] == target:  # Target found
        return f"Found {target} at index {mid}"
    elif arr[mid] < target:  # Search in right half
        return binary_search_recursive(arr, target, mid + 1, right)
    else:  # Search in left half
        return binary_search_recursive(arr, target, left, mid - 1)


# Example usage:
arr = [10, 20, 30, 40, 50]  # Must be sorted
print(binary_search_recursive(arr, 40, 0, len(arr) - 1))  # Output: Found 40 at index 3
print(binary_search_recursive(arr, 60, 0, len(arr) - 1))  # Output: 60 not found

"""
Advantages:
1. Faster than Linear Search with time complexity O(log n).
2. Efficient for large datasets.
3. Reduces the search space by half each time.

Disadvantages:
1. Works only on sorted arrays.
2. More complex to implement compared to Linear Search.
"""
#Q:704 on leetode- https://leetcode.com/problems/binary-search/description/