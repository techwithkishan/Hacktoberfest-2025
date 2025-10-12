# binary_search.py
# Implementation of binary search algorithm (iterative and recursive)

# Performs an iterative binary search to find the target in a sorted array.
    
# Args:
#     arr (list): Sorted list of numbers
#     target (int/float): Value to search for
        
# Returns:
#     int: Index of target if found, -1 if not found
        
# Time Complexity: O(log n)
# Space Complexity: O(1)
def binary_search_iterative(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1


# Performs a recursive binary search to find the target in a sorted array.
    
# Args:
#     arr (list): Sorted list of numbers
#     target (int/float): Value to search for
#     left (int): Left boundary of search
#     right (int): Right boundary of search
        
# Returns:
#     int: Index of target if found, -1 if not found
        
# Time Complexity: O(log n)
# Space Complexity: O(log n) due to recursive call stack

def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
        
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

def binary_search_recursive_wrapper(arr, target):
    return binary_search_recursive(arr, target, 0, len(arr) - 1)

# Test cases
if __name__ == "__main__":
    # Test case 1: Normal case with target present
    test_arr1 = [1, 3, 5, 7, 9, 11, 13, 15]
    assert binary_search_iterative(test_arr1, 7) == 3, "Iterative test case 1 failed"
    assert binary_search_recursive_wrapper(test_arr1, 7) == 3, "Recursive test case 1 failed"
    
    # Test case 2: Target not present
    test_arr2 = [2, 4, 6, 8, 10]
    assert binary_search_iterative(test_arr2, 5) == -1, "Iterative test case 2 failed"
    assert binary_search_recursive_wrapper(test_arr2, 5) == -1, "Recursive test case 2 failed"
    
    # Test case 3: Empty array
    test_arr3 = []
    assert binary_search_iterative(test_arr3, 1) == -1, "Iterative test case 3 failed"
    assert binary_search_recursive_wrapper(test_arr3, 1) == -1, "Recursive test case 3 failed"
    
    # Test case 4: Single element array (target present)
    test_arr4 = [42]
    assert binary_search_iterative(test_arr4, 42) == 0, "Iterative test case 4 failed"
    assert binary_search_recursive_wrapper(test_arr4, 42) == 0, "Recursive test case 4 failed"
    
    # Test case 5: Single element array (target not present)
    assert binary_search_iterative(test_arr4, 10) == -1, "Iterative test case 5 failed"
    assert binary_search_recursive_wrapper(test_arr4, 10) == -1, "Recursive test case 5 failed"
    
    # Test case 6: Target at boundaries
    test_arr6 = [1, 2, 3, 4, 5]
    assert binary_search_iterative(test_arr6, 1) == 0, "Iterative test case 6a failed"
    assert binary_search_iterative(test_arr6, 5) == 4, "Iterative test case 6b failed"
    assert binary_search_recursive_wrapper(test_arr6, 1) == 0, "Recursive test case 6a failed"
    assert binary_search_recursive_wrapper(test_arr6, 5) == 4, "Recursive test case 6b failed"
    
    print("All test cases passed!")