import java.util.NoSuchElementException;

public class ArrayStack<T> implements Stack<T> {
    private Object[] data;
    private int size;

    public ArrayStack() {
        this(16);
    }

    public ArrayStack(int initialCapacity) {
        if (initialCapacity <= 0) throw new IllegalArgumentException("Capacity must be > 0");
        data = new Object[initialCapacity];
        size = 0;
    }

    @Override
    public void push(T item) {
        ensureCapacity(size + 1);
        data[size++] = item;
    }

    @SuppressWarnings("unchecked")
    @Override
    public T pop() {
        if (size == 0) throw new NoSuchElementException("Stack is empty");
        T val = (T) data[--size];
        data[size] = null; // help GC
        return val;
    }

    @SuppressWarnings("unchecked")
    @Override
    public T peek() {
        if (size == 0) throw new NoSuchElementException("Stack is empty");
        return (T) data[size - 1];
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
        for (int i = 0; i < size; i++) data[i] = null;
        size = 0;
    }

    private void ensureCapacity(int minCapacity) {
        if (minCapacity <= data.length) return;
        int newCap = Math.max(data.length * 2, minCapacity);
        Object[] nd = new Object[newCap];
        System.arraycopy(data, 0, nd, 0, size);
        data = nd;
    }
}
