                                              ARRAYS

An array is a collection of items of the same variable type that are stored at contiguous memory locations. It is one of the most popular and simple data structures used in programming.
Basic terminologies of Array
•	Array Element: Elements are items stored in an array.
•	Array Index: Elements are accessed by their indexes. Indexes in most of the programming languages start from 0. 
•	Why do we Need Arrays?
•	Assume there is a class of five students and if we have to keep records of their marks in examination then, we can do this by declaring five variables individual and keeping track of records but what if the number of students becomes very large, it would be challenging to manipulate and maintain the data. So we use an array of students.

Types of Arrays : 
One dimensional array : A simple linear sequence of elements, like a list or row.
Multi-dimensional array : An array of arrays such as 2D matrix (rows and columns).
Complexity Analysis : 
Time Complexity : 
Access (Random access) : O(1) : Accessing any element by its index is constant-time operation. The memory address is calculated directly.
Search (Unsorted Array) : O(n):  In the worse case, you must check every element sequentially (linear search).
Insertion/Deletion at End : O(1) : If the array is not full, adding/removing the last element is constant time.
 Insertion/Deletion at Start/Middle : O(n): Requires shifting all subsequent elements to maintain contiguity which takes time proportional to the number of elements shifted.
Space Complexity:
O(n) : The space to store n elements grows linearly with the number of elements. Arrays are generally very memory-efficient because they don’t store pointers.
USE CASES:
Arrays are the most common data structure and are used as the foundation for implementing many other structures.
•	Matrix/Grid Representation: Multi-dimensional arrays are the natural way to represent tables, image pixels, game boards (like chess or Tic-Tac-Toe), and mathematical matrices.
•	Lookup Tables: Arrays are used when fast, indexed lookup is critical, such as storing key-value pairs where the keys are indices (e.g., in a simple frequency counter).
•	Implementation of Other Structures: Arrays are often used to implement the underlying storage for:
•	Heaps and Priority Queues: Using an array representation to manage the tree structure efficiently.
•	Stacks and Queues: A dynamic array can serve as the backend storage.
•	Sorting Algorithms: Many efficient sorting algorithms, such as Merge Sort and Quick Sort, operate directly on arrays.
•	Data Aggregation: Storing a fixed collection of records, scores, or measurements that need to be processed sequentially or randomly accessed.
Advantages of Array Data Structure:
•	Efficient and Fast Access: Arrays allow direct and efficient access to any element in the collection with constant access time, as the data is stored in contiguous memory locations.
•	Memory Efficiency: Arrays store elements in contiguous memory, allowing efficient allocation in a single block and does not require extra storage for linking different blocks.
•	Versatility: Arrays can be used to store a wide range of data types, including integers, floating-point numbers, characters, and even complex data structures such as objects and pointers.
•	Compatibility with hardware: The array data structure is compatible with most hardware architectures, making it a versatile tool for programming in a wide range of environments.
Disadvantages of Array Data Structure:
•	Fixed Size: Arrays have a fixed size set at creation. Expanding an array requires creating a new one and copying elements, which is time-consuming and memory-intensive. Even dynamic sized arrays internally use fixed sized memory allocation and de-allocation.
•	Memory Allocation Issues: Allocating large arrays can cause memory exhaustion, leading to crashes, especially on systems with limited resources.
•	Insertion and Deletion Challenges: Adding or removing elements requires shifting subsequent elements, making these operations inefficient.



                                                 STACKS

A Stack is a linear data structure that follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out). LIFO implies that the element that is inserted last, comes out first and FILO implies that the element that is inserted first, comes out last.
It behaves like a stack of plates, where the last plate added is the first one to be removed. Think of it this way:
Pushing an element onto the stack is like adding a new plate on top.
Popping an element removes the top plate from the stack.

The two primary operations associated with a stack are:
1.	Push: Adds an element to the top of the stack.
2.	Pop: Removes the element from the top of the stack and returns it.
Other common auxiliary operations include:
•	Peek (or Top): Returns the top element without removing it.
•	IsEmpty: Checks if the stack contains any elements.
•	IsFull: (Relevant for array-based implementations) Checks if the stack is at its maximum capacity.
Complexity Analysis : 
Time Complexity: 
Push : O(1) : Adding an element only involves updating a pointer/index and storing the value, which takes constant time regardless of the stack size.
Pop: O(1) : Removing an element only involves retrieving  the value and decrementing the “top” pointer, which is a constant time operation.
Peek : O(1) : Accessing the top element requires a single index look up, taking constant time. 
isEmpty : O(1) : Checking if the top pointer equals a specific value (which means it checks if the stack is empty).
Space Complexity : 
O(n) : The space required to store n elements grows linearly with the number of elements.
Use Cases : 
1.	Function calls : Stacks are used to keep track of the return addresses of function calls, allowing the program to return to the correct location after a function has finished executing.
2.	Recursion : Stack are used to store the local variables and return addresses of recursive function calls, allowing the program to keep track of the current state of the recursion.
3.	Express Evaluation : Stacks are used to evaluate expressions in postfix notation.
4.	Syntax parsing : Stacks are used to check the validity of syntax in programming languages and other formal languages.
5.	Memory management : Stacks are used to allocate and manage memory in some operating systems and programming languages. 
Advantages of Stacks : 
•	Simplicity: Stacks are a simple and easy-to-understand data structure, making them suitable for a wide range of applications.
•	Efficiency: Push and pop operations on a stack can be performed in constant time (O(1)), providing efficient access to data.
•	Last-in, First-out (LIFO): Stacks follow the LIFO principle, ensuring that the last element added to the stack is the first one removed. This behaviour is useful in many scenarios, such as function calls and expression evaluation.
•	Limited memory usage: Stacks only need to store the elements that have been pushed onto them, making them memory-efficient compared to other data structures.
Disadvantages of Stacks : 
•	Limited access: Elements in a stack can only be accessed from the top, making it difficult to retrieve or modify elements in the middle of the stack.
•	Potential for overflow: If more elements are pushed onto a stack than it can hold, an overflow error will occur, resulting in a loss of data.
•	Not suitable for random access: Stacks do not allow for random access to elements, making them unsuitable for applications where elements need to be accessed in a specific order.
•	Limited capacity: Stacks have a fixed capacity, which can be a limitation if the number of elements that need to be stored is unknown or highly variable.






                                             QUEUES

A Queue Data Structure is a fundamental concept in computer science used for storing and managing data in a specific order.
•	It follows the principle of "First in, First out" (FIFO), where the first element added to the queue is the first one to be removed.
•	It is used as a buffer in computer systems where we have speed mismatch between two devices that communicate with each other. For example, CPU and keyboard and two devices in a network
•	Queue is also used in Operating System algorithms like CPU Scheduling and Memory Management, and many standard algorithms like Breadth First Search of Graph, Level Order Traversal of a Tree
Basic operations : 
Queue is a linear data structure that follows the FIFO (First In First Out) principle, where insertion is done at the rear end and deletion is done from the front end.
The following are some fundamental operations that allow us to add, remove, and access elements efficiently.
•	enqueue() - Insertion of elements to the queue.
•	dequeue() - Removal of elements from the queue.
•	getFront()- Acquires the data element available at the front node of the queue without deleting it.
•	getRear() - This operation returns the element at the rear end without removing it.
•	isEmpty() - Checks if the queue is empty.
•	size() - This operation returns the size of the queue i.e. the total number of elements it contains.
Complexity Analysis :
Time Complexity : 
•	Enqueue :O(1) : Adding an element only involves updating the rear pointer and storing the value which is a constant-time operation.
•	Dequeue : O(1) : Removing an element involves  retrieving the value and advancing the front pointer which is a constant time operation.
•	Peek : O(1) : Accessing the front element requires a single index lookup, taking constant time. 
•	isEmpty : O(1) : Checking if the front and rear pointers satisfy a specific condition. (e.g., front > rear) is constant time.

Space Complexity : 
O(n) : The space required to store “n” elements grows linearly with the number of elements

Use Cases : 
Operating System Scheduling : Queues are used to manage processes and tasks. Processes waiting for the CPU or I/O resources are placed in a queue and handled in the order they requested the resource.
Asynchronous Data Transfer : Queues are used for buffering in data streams (like I/O, file reading, networking). Data is enqueued by the producer and dequeued by the consumer at their own pace, ensure the data is processed in the correct order.
Breadth-First-Search (BFS) : This graph traversal algorithm uses a queue to keep track of the next nodes to visit. It ensures that all the nodes at the current depth level are visited before moving to the next depth level (FIFO principle).
Simulation and Modelling : Queues are used in simulations (e.g., traffic flow, customer service lines) to accurately model real-world waiting lines.
Spooling in Printers : Print jobs sent to a shared printer are held in a queue. The printer processes the jobs sequentially (FIFO) to ensure documents are printed in the order they were submitted.
Advantages of Queue:
•	A large amount of data can be managed efficiently with ease.
•	Operations such as insertion and deletion can be performed with ease as it follows the first in first out rule.
•	Queues are useful when a particular service is used by multiple consumers.
•	Queues are fast in speed for data inter-process communication.
•	Queues can be used in the implementation of other data structures.
Disadvantages of Queue:
•	The operations such as insertion and deletion of elements from the middle are time consuming.
•	In a classical queue, a new element can only be inserted when the existing elements are deleted from the queue.
•	Searching an element takes O(N) time.
•	Maximum size of a queue must be defined prior in case of array implementation.


                                                LINKED LISTS


A linked list is a fundamental data structure in computer science. It mainly allows efficient insertion and deletion operations compared to arrays. Like arrays, it is also used to implement other data structures like stack, queue and deque.

A linked list is made up of individual components called Nodes. Each node typically contains two parts:
1.	Data: The actual value stored in the node.
2.	Pointer (or Link): A reference to the next node in the sequence.
The list is traversed sequentially starting from the first node, called the Head. The last node in the list points to NULL (or None), signifying the end of the list.

Types of Linked List:
1.	Singly Linked List : Each node points only to the next node. Traversal is one-way (forward).
2.	Doubly Linked List : Each node has two pointers : one to the next node and one to the previous node. Traversal is a two-way (forward and backward).
3.	Circular Linked List : The pointer of the last node points back to the Head node, forming a circle.
Comparison of Arrays VS Linked Lists :
•	Data Structure: Non-contiguous
•	Memory Allocation: Typically allocated one by one to individual elements
•	Insertion/Deletion: Efficient
•	Access: Sequential
Array:
•	Data Structure: Contiguous
•	Memory Allocation: Typically allocated to the whole array
•	Insertion/Deletion: Inefficient
•	Access: Random



Time Complexity Analysis : 
1.	Insertion at Head : O(1) : Simply update the head pointer to the new node, which is constant time.
2.	Deletion at Head : O(1) : Simply update the Head pointer to the next node, which is constant time. 
3.	Insertion / Deletion at Tail : O(n) : Requires traversing the entire list from the Head to find the last node (the Tail) and the node preceding it.
4.	Search / Access : O(n) : To find an element or access a node at a specific position, you must traverse the list from the beginning.
Note: For doubly linked lists, insertion and deletion at tail can be O(1) as the list maintains a separate pointer to the tail.
Space Complexity : 
Space Required : O(n) : The space to store n elements grows linearly, but it requires more overall memory than an array because of the extra storage needed for the pointer in every node.
USE CASES:
•	Implementing Stacks and Queues : Linked lists provide a highly efficient way (all O(1) operations) to implement both stacks (using insertion/ deletion at the head) and queues (using insertion at the tail and deletion at the head).
•	Dynamic memory allocation : Linked Lists are used internally by some memory management systems to track which memory blocks are few and which are allocated.
•	Polynomial Representation : They can be used to store and manipulate mathematical polynomials where each node represents a term (coefficient and exponent).
•	Image Viewers / Slideshows : A doubly linked list is useful for navigating back and forth between images or slides.
•	Implementing Hash Maps / Tables : Linked lists are commonly used to resolve collisions in hash tables (a method called separate chaining). When multiple keys hash to the same index, a linked list is started at that index to store all the colliding elements.
Advantages Of Linked List:
•	Dynamic data structure: A linked list is a dynamic arrangement so it can grow and shrink at runtime by allocating and deallocating memory. So there is no need to give the initial size of the linked list.
•	No memory wastage: In the Linked list, efficient memory utilization can be achieved since the size of the linked list increase or decrease at run time so there is no memory wastage and there is no need to pre-allocate the memory.
•	Implementation: Linear data structures like stacks and queues are often easily implemented using a linked list.
•	Insertion and Deletion Operations: Insertion and deletion operations are quite easier in the linked list. There is no need to shift elements after the insertion or deletion of an element only the address present in the next pointer needs to be updated. 
•	Flexible: This is because the elements in Linked List are not stored in contiguous memory locations unlike the array.
•	Efficient for large data: When working with large datasets linked lists play a crucial role as it can grow and shrink dynamically.
•	Scalability: Contains the ability to add or remove elements at any position.
 Disadvantages Of Linked List:
•	Memory usage: More memory is required in the linked list as compared to an array. Because in a linked list, a pointer is also required to store the address of the next element and it requires extra memory for itself.
•	Traversal: In a Linked list traversal is more time-consuming as compared to an array. Direct access to an element is not possible in a linked list as in an array by index. For example, for accessing a node at position n, one has to traverse all the nodes before it.
•	Reverse Traversing: In a singly linked list reverse traversing is not possible, but in the case of a doubly-linked list, it can be possible as it contains a pointer to the previously connected nodes with each node. For performing this extra memory is required for the back pointer hence, there is a wastage of memory.
•	Random Access: Random access is not possible in a linked list due to its dynamic memory allocation.
•	Lower efficiency at times: For certain operations, such as searching for an element or iterating through the list, can be slower in a linked list.
•	Complex implementation:  The linked list implementation is more complex when compared to array. It requires a complex programming understanding.
•	Difficult to share data: This is because it is not possible to directly access the memory address of an element in a linked list.
•	Not suited for small dataset: Cannot provide any significant benefits on small dataset compare to that of an array.







                                                    TREES

The Tree data structure is a non-linear, hierarchical model used to represent and store data elements (nodes) connected by edges. It's designed for organizing data efficiently for operations like searching, insertion, and deletion.
Tree Explanation
Unlike linear structures (like arrays and linked lists), a tree branches out, establishing parent-child relationships.
The essential components of a general tree include:
•	Node: The basic unit that stores the data.
•	Root: The single node at the very top of the hierarchy; it has no parent.
•	Edge: The connection between two nodes.
•	Parent: A node that has child nodes (descendants).
•	Child: A node that descends from a parent node.
•	Leaf: A node that has no children (at the bottom)
Tree Types : 
1.	Binary Tree :  Each node has a maximum of two children.
Benefit: Simplicity and foundation for many advanced trees.
2.	Binary Search Tree (BST): A binary tree where left child values are less than parent’s value and right child values are greater than parent’s value.
Benefit : Allow for fast, logarithmic time complexity in the average case.
3.	Balanced BST : A BST that automatically adjusts its structure (via rotations) to maintain a minimal height.
Benefit : Guarantees O(log n) performance for all major operations, even in the worst case. 

Complexity Analysis :
Time Complexity : 
Search: 
In average case (balanced) : O(log n) 
In worst case (unbalanced) : O(n) 
Time complexity is proportional to the height (h). In the worst case ( a “skewed” tree, like a linked list), h = n.
Insertion : 
In average case (balanced) : O(log n) 
In worst case (unbalanced) : O(n) 
Similar to searching, you must first traverse to the correct position for insertion.
Deletion: 
In average case (balanced) : O(log n) 
In worst case (unbalanced) : O(n) 
Requires searching for the node, and potentially reorganizing a small section of the tree.
Space Complexity : 
O(n) : The storage space scales linearly with the number of nodes (n). Additional space is needed for the pointers/references in each node.
Use Cases :
Trees are indispensable for modelling hierarchical data and for structures where efficient search, insert, and delete operations are critical.
•	File Systems: The directories and files on a computer are structured as an N-ary Tree, where the root is the main drive and directories are internal nodes that can branch out to many sub-directories/files.
•	Database Indexing: B-trees and B+ trees are specialized, shallow, and wide trees used in databases (like MySQL and Oracle) to implement disk-based indexing, allowing for fast retrieval of data.
•	Compilers and Interpreters: The source code of a program is converted into an Abstract Syntax Tree (AST). This tree represents the code's structure and relationships, which the compiler uses for analysis and code generation.
•	Network Routing: Trees, particularly spanning trees, are used in network protocols to prevent loops and find the most efficient routing paths for data packets.
•	Priority Queues (Heaps): A Heap is a specific type of binary tree that is often implemented using an array. It's the underlying structure used to efficiently implement a Priority Queue (used in scheduling and certain search algorithms like Dijkstra's).
•	Artificial Intelligence (AI/ML): Decision Trees are fundamental machine learning models used for classification and regression tasks.
•	Tries (Prefix Trees): Used for incredibly fast searching, insertion, and deletion of strings, making them ideal for implementing dictionaries, spell checkers, and autocomplete features.
Advantages of Tree:
•	Efficient searching: Trees are particularly efficient for searching and retrieving data. The time complexity of searching in a tree is O(log n) in AVL and Red Black Trees. This is better than arrays and linked list but not as good as hashing, but the advantages the these trees provide are sorted data, search for floor and ceiling of data.
•	Fast insertion and deletion: Inserting and deleting nodes in a self balancing binary search trees like AVL and Red Black can be done in O(log n) time. This is again better than arrays and linked list not as good as hashing, but the advantages the these trees provide are sorted data, search for floor and ceiling of data.
•	Trees provide a hierarchical representation of data, making it easy to organize and navigate large amounts of information.
•	The recursive nature of trees makes them easy to traverse and manipulate using recursive algorithms.
•	Natural organization: Trees have a natural hierarchical organization that can be used to represent many types of relationships. This makes them particularly useful for representing things like file systems, organizational structures, and taxonomies.
•	Flexible size: Unlike Arrays, trees can easily grow or shrink dynamically depending on the number of nodes that are added or removed. This makes them particularly useful for applications where the data size may change over time.
Disadvantages of Tree:
•	Memory overhead: Trees can require a significant amount of memory to store, especially if they are very large. This can be a problem for applications that have limited memory resources.
•	Imbalanced trees: If a tree is not balanced, it can result in uneven search times. This can be a problem in applications where speed is critical.
•	Complexity: Unlike Arrays and Linked Lists, Trees can be complex data structures, and they can be difficult to understand and implement correctly. This can be a problem for developers who are not familiar with them.
•	Search, Insert and Delete Times: If a problem requires only search, insert and delete, not other operations like sorted data traversal, floor, and ceiling, Hash Tables always beat Self Balancing Binary Search Trees.
•	The implementation and manipulation of trees can be complex and require a good understanding of the algorithms.







                                                     GRAPHS

Graph is a non-linear data structure consisting of vertices and edges. The vertices are sometimes also referred to as nodes and the edges are lines or arcs that connect any two nodes in the graph. More formally a Graph is composed of a set of vertices( V ) and a set of edges( E ). The graph is denoted by G(V, E).
Imagine a game of football as a web of connections, where players are the nodes and their interactions on the field are the edges. This web of connections is exactly what a graph data structure represents, and it's the key to unlocking insights into team performance and player dynamics in sports.
Components of Graph Data Structure
•	Vertices: Vertices are the fundamental units of the graph. Sometimes, vertices are also known as vertex or nodes. Every node/vertex can be labeled or unlabelled.
•	Edges: Edges are drawn or used to connect two nodes of the graph. It can be ordered pair of nodes in a directed graph. Edges can connect any two nodes in any possible way. There are no rules. Sometimes, edges are also known as arcs. Every edge can be labelled/unlabelled
Key graph types :
Undirected graph : Edges have no direction. If A is connected to B, B is connected to A.
Directed graph : Edges have a direction (represented by an arrow. If A -> B, the connection is one-way.
Weighted graph: Edges have a value ( a weight or cost) associated with them.
A cyclic graph : A graph that contains no cycles (no closed loops).
Complexity Analysis : 
Graph complexity is analyzed based on the number of Vertices (V) and  the number of Edges (E), efficiency heavily depends on the way graph is stored. 
Space Complexity: 
Graphs are stored commonly using two methods:
Adjcency list : O(V+E) 
Best for sparse graphs (fewer edges). Only stores existing edges, making it memory efficient).
Adjacency matrix : O(V^2) 
Best for Dense graphs (many edges). Uses a V x V matrix, wastes memory if the graph is sparse.
Time Complexity : 
Graph algorithms like BFS(Breadth first search) and DFS(Depth first search) are used to explore the graph structure. Since they must visit every vertex and check every edge in the worst case, their time complexity is:
Traversal (DFS/BFS) : O(V + E) 
Time depends on total number of nodes and connections, assuming an Adjacency list representation.
Finding Adjacent Vertices ( Adjacency list): O(Degree(V))
Time is proportional to the number of neighbours the starting vertex has.
Checking Edge Existence  (Adjacency Matrix): O(1)
Direct lookup in the matrix is constant time.
Use cases:
Graphs are the perfect data structure for modeling real-world problems where relationships and connections are the core focus.
•	Social Networks: Entities (people) are vertices, and relationships (friendship, following) are edges. Algorithms use graphs to suggest friends, analyze community clusters, and rank influence.
•	Navigation and Mapping (GPS): Cities/Intersections are vertices, and roads are edges with weights (distance, time). Algorithms like Dijkstra's or A* search find the shortest or fastest path.
•	Recommendation Systems: Users and Products are vertices. Edges represent actions (watched, purchased, liked). Graph analysis finds relationships like "People who bought X also bought Y" for personalized suggestions.
•	Fraud Detection: Accounts, devices, IP addresses, and transactions are vertices. Graphs help financial systems detect complex, non-obvious fraud rings (e.g., circular money transfers) by looking for suspicious patterns in the connections.
•	Computer Networks: Computers, routers, and cables are vertices, and network links are edges. Graph algorithms are essential for routing data packets efficiently across the internet.
•	Logistics and Supply Chains: Locations and warehouses are vertices, and transportation routes are weighted edges. Graphs help optimize delivery routes and manage supply dependencies.
Advantages of Graph:
•	Representing complex data: Graphs are effective tools for representing complex data, especially when the relationships between the data points are not straightforward. They can help to uncover patterns, trends, and insights that may be difficult to see using other methods.
•	Efficient data processing: Graphs can be processed efficiently using graph algorithms, which are specifically designed to work with graph data structures. This makes it possible to perform complex operations on large datasets quickly and effectively.
•	Network analysis: Graphs are commonly used in network analysis to study relationships between individuals or organizations, as well as to identify important nodes and edges in a network. This is useful in a variety of fields, including social sciences, business, and marketing.
•	Pathfinding: Graphs can be used to find the shortest path between two points, which is a common problem in computer science, logistics, and transportation planning.
•	Visualization: Graphs are highly visual, making it easy to communicate complex data and relationships in a clear and concise way. This makes them useful for presentations, reports, and data analysis.
•	Machine learning: Graphs can be used in machine learning to model complex relationships between variables, such as in recommendation systems or fraud detection.
•	Graphs are used in computer science to depict the flow of computation.
•	Users on Facebook are referred to as vertices, and if they are friends, there is an edge connecting them. The Friend Suggestion system on Facebook is based on graph theory.
•	You come across the Resources Allocation Graph in the Operating System, where each process and resource are regarded vertically. Edges are drawn from resources to assigned functions or from the requesting process to the desired resources. A stalemate will develop if this results in the establishment of a cycle.
•	Web pages are referred to as vertices on the World Wide Web. Suppose there is a link from page A to page B that can represent an edge. this application is an illustration of a directed graph.
•	Graph transformation systems manipulate graphs in memory using rules, Graph databases store and query graph-structured data in a transaction-safe, perment manner.
Disadvantages of Graph:
•	Limited representation: Graphs can only represent relationships between objects, and not their properties or attributes. This means that in order to fully understand the data, it may be necessary to supplement the graph with additional information.
•	Difficulty in interpretation: Graphs can be difficult to interpret, especially if they are large or complex. This can make it challenging to extract meaningful insights from the data, and may require advanced analytical techniques or domain expertise.
•	Scalability issues: As the number of nodes and edges in a graph increases, the processing time and memory required to analyze it also increases. This can make it difficult to work with large or complex graphs.
•	Data quality issues: Graphs are only as good as the data they are based on, and if the data is incomplete, inconsistent, or inaccurate, the graph may not accurately reflect the relationships between objects.
•	Lack of standardization: There are many different types of graphs, and each has its own strengths and weaknesses. This can make it difficult to compare graphs from different sources, or to choose the best type of graph for a given analysis.
•	Privacy concerns: Graphs can reveal sensitive information about individuals or organizations, which can raise privacy concerns, especially in social network analysis or marketing.







