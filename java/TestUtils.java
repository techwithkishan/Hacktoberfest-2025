public class TestUtils {
    @FunctionalInterface
    public interface VoidFunc { void run(); }

    public static void expectEquals(Object expected, Object actual, String message) {
        if (expected == null ? actual != null : !expected.equals(actual)) {
            throw new AssertionError(message + " | expected=" + expected + ", actual=" + actual);
        }
    }

    public static void expectTrue(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    public static void expectThrows(Class<? extends Throwable> expected, VoidFunc fn, String message) {
        try {
            fn.run();
        } catch (Throwable t) {
            if (expected.isInstance(t)) return;
            throw new AssertionError(message + " | expected exception=" + expected.getName() + ", but got=" + t.getClass().getName());
        }
        throw new AssertionError(message + " | expected exception " + expected.getName() + " but nothing was thrown");
    }
}
