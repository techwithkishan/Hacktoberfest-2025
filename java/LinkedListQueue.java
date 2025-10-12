import java.util.NoSuchElementException;

public class LinkedListQueue<T> implements Queue<T> {
    private static class Node<T> {
        T val;
        Node<T> next;
        Node(T v) { val = v; }
    }

    private Node<T> head;
    private Node<T> tail;
    private int size;

    @Override
    public void enqueue(T item) {
        Node<T> n = new Node<>(item);
        if (tail == null) {
            head = tail = n;
        } else {
            tail.next = n;
            tail = n;
        }
        size++;
    }

    @Override
    public T dequeue() {
        if (head == null) throw new NoSuchElementException("Queue is empty");
        T v = head.val;
        head = head.next;
        if (head == null) tail = null;
        size--;
        return v;
    }

    @Override
    public T peek() {
        if (head == null) throw new NoSuchElementException("Queue is empty");
        return head.val;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public void clear() {
        head = tail = null;
        size = 0;
    }
}
