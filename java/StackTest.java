import java.util.NoSuchElementException;

public class StackTest {
    public static void runAll() {
        testArrayStack();
        testLinkedListStack();
        System.out.println("StackTest: ALL PASSED");
    }

    private static void testArrayStack() {
        Stack<Integer> s = new ArrayStack<>();
        TestUtils.expectTrue(s.isEmpty(), "ArrayStack should start empty");
        s.push(1); s.push(2); s.push(3);
        TestUtils.expectEquals(3, s.size(), "ArrayStack size after pushes");
        TestUtils.expectEquals(3, s.peek(), "ArrayStack peek top");
        TestUtils.expectEquals(3, s.pop(), "ArrayStack pop top");
        TestUtils.expectEquals(2, s.size(), "ArrayStack size after pop");
        s.clear();
        TestUtils.expectTrue(s.isEmpty(), "ArrayStack empty after clear");
        TestUtils.expectThrows(NoSuchElementException.class, () -> s.pop(), "ArrayStack pop on empty throws");
    }

    private static void testLinkedListStack() {
        Stack<String> s = new LinkedListStack<>();
        s.push("a"); s.push("b"); s.push("c");
        TestUtils.expectEquals(3, s.size(), "LLStack size after pushes");
        TestUtils.expectEquals("c", s.peek(), "LLStack peek top");
        TestUtils.expectEquals("c", s.pop(), "LLStack pop top");
        TestUtils.expectEquals("b", s.pop(), "LLStack pop next");
        TestUtils.expectEquals("a", s.pop(), "LLStack pop last");
        TestUtils.expectTrue(s.isEmpty(), "LLStack empty after pops");
        TestUtils.expectThrows(NoSuchElementException.class, () -> s.peek(), "LLStack peek on empty throws");
    }
}
