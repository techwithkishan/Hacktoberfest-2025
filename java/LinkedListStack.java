import java.util.NoSuchElementException;

public class LinkedListStack<T> implements Stack<T> {
    private static class Node<T> {
        T val;
        Node<T> next;
        Node(T v, Node<T> n) { val = v; next = n; }
    }

    private Node<T> head;
    private int size;

    @Override
    public void push(T item) {
        head = new Node<>(item, head);
        size++;
    }

    @Override
    public T pop() {
        if (head == null) throw new NoSuchElementException("Stack is empty");
        T v = head.val;
        head = head.next;
        size--;
        return v;
    }

    @Override
    public T peek() {
        if (head == null) throw new NoSuchElementException("Stack is empty");
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
        head = null;
        size = 0;
    }
}
