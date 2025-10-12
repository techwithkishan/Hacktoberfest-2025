import java.util.NoSuchElementException;

public class ArrayQueue<T> implements Queue<T> {
    private Object[] data;
    private int head; // points to current front
    private int tail; // points to position to insert next
    private int size;

    public ArrayQueue() {
        this(16);
    }

    public ArrayQueue(int initialCapacity) {
        if (initialCapacity <= 0) throw new IllegalArgumentException("Capacity must be > 0");
        data = new Object[initialCapacity];
        head = 0;
        tail = 0;
        size = 0;
    }

    @Override
    public void enqueue(T item) {
        ensureCapacity(size + 1);
        data[tail] = item;
        tail = (tail + 1) % data.length;
        size++;
    }

    @SuppressWarnings("unchecked")
    @Override
    public T dequeue() {
        if (size == 0) throw new NoSuchElementException("Queue is empty");
        T v = (T) data[head];
        data[head] = null; // help GC
        head = (head + 1) % data.length;
        size--;
        return v;
    }

    @SuppressWarnings("unchecked")
    @Override
    public T peek() {
        if (size == 0) throw new NoSuchElementException("Queue is empty");
        return (T) data[head];
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
        for (int i = 0; i < data.length; i++) data[i] = null;
        head = tail = 0;
        size = 0;
    }

    private void ensureCapacity(int minCapacity) {
        if (minCapacity <= data.length) return;
        int newCap = Math.max(data.length * 2, minCapacity);
        Object[] nd = new Object[newCap];
        for (int i = 0; i < size; i++) {
            nd[i] = data[(head + i) % data.length];
        }
        data = nd;
        head = 0;
        tail = size;
    }
}
