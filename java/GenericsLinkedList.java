import java.util.*;

/**
 * A generic linked list implementation.
 * The type parameter <T> allows this list to store elements of any specified type
 */

public class GenericLinkedList<T> {

    Node<T> head;

    /**
     * 1. Inner static class to represent a node in the linked list.
     * 2. It is also generic to hold data of type T.
     */

    static class Node<T> {
        T data;
        Node<T> next;
    }

    /**
     * Appends a new element to the end of the list
     *
     * Time Complexity: O(n) - In the worst case, we must traverse the entire list to find the last node. 'n' is the number of elements in the list
     *
     * Space Complexity: O(1) - We only create one new node, so the extra space required is constant regardless of the list size
     *
     * @param data The data to be added to the new node
     */
    public void add(T data) {
        // Create a new node with the given data
        Node<T> newNode = new Node<>();
        newNode.data = data;
        newNode.next = null;

        // If the list is empty, the new node becomes the head
        if (head == null) {
            head = newNode;
        } else {
            // Otherwise, traverse to the end of the list
            Node<T> last = head;
            while (last.next != null) {
                last = last.next;
            }
            // Point the last node's next reference to the new node
            last.next = newNode;
        }
    }

    /**
     * Prints all the elements in the list to the console
     *
     * Time Complexity: O(n) - We need to visit every node once to print its data. 'n' is the number of elements in the list
     *
     * Space Complexity: O(1) - No extra space is used, apart from a single temporary node reference to traverse the list
     */

    public void printList() {
        Node<T> current = head;
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }

    /**
     * The main method demonstrates the usage of the GenericLinkedList with different
     * data types.
     */

    public static void main(String[] args) {

        // --- Example 1: Usage with Integer type ---

        System.out.println("--- Integer LinkedList ---");
        GenericLinkedList<Integer> intList = new GenericLinkedList<>();
        intList.add(10);
        intList.add(20);
        intList.add(30);
        intList.add(40);
        System.out.print("List content: ");
        intList.printList(); // Expected output: 10 -> 20 -> 30 -> 40 -> null

        System.out.println();

        // --- Example 2: Usage with String type ---

        System.out.println("--- String LinkedList ---");
        GenericLinkedList<String> stringList = new GenericLinkedList<>();
        stringList.add("Hello");
        stringList.add("World");
        stringList.add("from");
        stringList.add("Java");
        System.out.print("List content: ");
        stringList.printList(); // Expected output: Hello -> World -> from -> Java -> null

        System.out.println();

        // --- Example 3: Usage with Double type ---

        System.out.println("--- Double LinkedList ---");
        GenericLinkedList<Double> doubleList = new GenericLinkedList<>();
        doubleList.add(3.14);
        doubleList.add(1.618);
        doubleList.add(2.718);
        System.out.print("List content: ");
        doubleList.printList(); // Expected output: 3.14 -> 1.618 -> 2.718 -> null
    }
}