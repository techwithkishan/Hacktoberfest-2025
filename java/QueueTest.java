import java.util.NoSuchElementException;

public class QueueTest {
    public static void runAll() {
        testArrayQueue();
        testLinkedListQueue();
        System.out.println("QueueTest: ALL PASSED");
    }

    private static void testArrayQueue() {
        Queue<Integer> q = new ArrayQueue<>(2);
        TestUtils.expectTrue(q.isEmpty(), "ArrayQueue should start empty");
        q.enqueue(1);
        q.enqueue(2);
        q.enqueue(3); // forces resize
        TestUtils.expectEquals(3, q.size(), "ArrayQueue size after enqueues");
        TestUtils.expectEquals(1, q.peek(), "ArrayQueue peek front");
        TestUtils.expectEquals(1, q.dequeue(), "ArrayQueue dequeue front");
        TestUtils.expectEquals(2, q.dequeue(), "ArrayQueue dequeue second");
        TestUtils.expectEquals(1, q.size(), "ArrayQueue size after dequeues");
        q.clear();
        TestUtils.expectTrue(q.isEmpty(), "ArrayQueue empty after clear");
        TestUtils.expectThrows(NoSuchElementException.class, () -> q.dequeue(), "ArrayQueue dequeue on empty throws");
    }

    private static void testLinkedListQueue() {
        Queue<String> q = new LinkedListQueue<>();
        q.enqueue("x"); q.enqueue("y"); q.enqueue("z");
        TestUtils.expectEquals(3, q.size(), "LLQueue size after enqueues");
        TestUtils.expectEquals("x", q.peek(), "LLQueue peek front");
        TestUtils.expectEquals("x", q.dequeue(), "LLQueue dequeue front");
        TestUtils.expectEquals("y", q.dequeue(), "LLQueue dequeue second");
        TestUtils.expectEquals("z", q.dequeue(), "LLQueue dequeue last");
        TestUtils.expectTrue(q.isEmpty(), "LLQueue empty after dequeues");
        TestUtils.expectThrows(NoSuchElementException.class, () -> q.peek(), "LLQueue peek on empty throws");
    }
}
