public class RunAllTests {
    public static void main(String[] args) {
        try {
            StackTest.runAll();
            QueueTest.runAll();
            System.out.println("\nAll tests passed.");
        } catch (AssertionError e) {
            System.err.println("TEST FAILURE: " + e.getMessage());
            System.exit(1);
        }
    }
}
