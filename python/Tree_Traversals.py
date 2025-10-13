"""
Binary tree traversal Algorithms Iterative and Recursive implementations

This module provides a TreeNode class and functions to perform the four standard tree traversals:
- Preorder (Recursive and Iterative)
- Inorder (Recursive and Iterative)
- Postorder (Recursive and Iterative)
- Level-order (Iterative and Recursive)

--- Complexity Analysis ---
Let N be the number of nodes and H be the height of the tree.
Time Complexity (All functions): O(N)
Space Complexity (Recursive & Iterative DFS): O(H) (worst case O(N))
Space Complexity (Level-order): O(W) where W is max width (worst case O(N))
"""

import collections
from typing import Optional, List, Deque

class TreeNode:
    """Define node in a binary tree."""
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right

# Preorder Traversal (Root, Left, Right)

def preorder_recursive(root: Optional[TreeNode]) -> List[int]:
    result = []
    def traverse(node):
        if not node:
            return
        result.append(node.val)  # Visit root
        traverse(node.left)      # Traverse left
        traverse(node.right)     # Traverse right
    traverse(root)
    return result

def preorder_iterative(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val) # Visit root
        # Push right child first so left is processed first (LIFO)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
            
    return result

# Inorder Traversal (Left, Root, Right)

def inorder_recursive(root: Optional[TreeNode]) -> List[int]:
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)      # Traverse left
        result.append(node.val)  # Visit root
        traverse(node.right)     # Traverse right
    traverse(root)
    return result

def inorder_iterative(root: Optional[TreeNode]) -> List[int]:
    result = []
    stack = []
    current = root
    
    while current or stack:
        # Go as far left as possible
        while current:
            stack.append(current)
            current = current.left
        
        # Backtrack from the empty left node
        current = stack.pop()
        result.append(current.val) # Visit the node
        
        # Now, visit the right subtree
        current = current.right
        
    return result

# Postorder Traversal (Left, Right, Root)

def postorder_recursive(root: Optional[TreeNode]) -> List[int]:
    result = []
    def traverse(node):
        if not node:
            return
        traverse(node.left)      # Traverse left
        traverse(node.right)     # Traverse right
        result.append(node.val)  # Visit root
    traverse(root)
    return result

def postorder_iterative(root: Optional[TreeNode]) -> List[int]:
    """
    This approach traverses in (Root, Right, Left) order and then reverses the result to get (Left, Right, Root)
    """
    if not root:
        return []
        
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push left child first so right is processed first
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
            
    # Reverse the result to get the correct postorder
    return result[::-1]

# Level-order Traversal (Breadth-First)

def level_order_iterative(root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []
    result = []
    queue: Deque[TreeNode] = collections.deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result

def level_order_recursive(root: Optional[TreeNode]) -> List[int]:
    levels = []
    def _traverse_level(node: Optional[TreeNode], level: int):
        if not node:
            return
        if level == len(levels):
            levels.append([])
        levels[level].append(node.val)
        _traverse_level(node.left, level + 1)
        _traverse_level(node.right, level + 1)
    
    _traverse_level(root, 0)
    return [val for level_list in levels for val in level_list]

# Example

# Construct a sample binary tree for demonstration
    #        1
    #       / \
    #      2   3
    #     / \ / \
    #    4  5 6  7

if __name__ == "__main__":
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)

    print("--- Testing Traversal Functions ---\n")

    # Preorder: [1, 2, 4, 5, 3, 6, 7]
    print(f"Preorder (Recursive): {preorder_recursive(root)}")
    print(f"Preorder (Iterative): {preorder_iterative(root)}\n")

    # Inorder: [4, 2, 5, 1, 6, 3, 7]
    print(f"Inorder (Recursive):  {inorder_recursive(root)}")
    print(f"Inorder (Iterative):  {inorder_iterative(root)}\n")

    # Postorder: [4, 5, 2, 6, 7, 3, 1]
    print(f"Postorder (Recursive):{postorder_recursive(root)}")
    print(f"Postorder (Iterative):{postorder_iterative(root)}\n")

    # Level-order: [1, 2, 3, 4, 5, 6, 7]
    print(f"Level-order (Iterative): {level_order_iterative(root)}")
    print(f"Level-order (Recursive): {level_order_recursive(root)}")