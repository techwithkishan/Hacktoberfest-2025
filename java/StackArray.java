public class StackArray<E> {

    private final int stackCapacity;
    private final E[] stackArray;
    private int top;

    /**
     * Constructor to initialize the stack with a specified capacity
     *
     * @param stackCapacity the maximum number of elements the stack can hold
     * @throws IllegalArgumentException if the specified capacity is less than or equal to zero
     */
    @SuppressWarnings("unchecked")
    public StackArray(int stackCapacity) {
        if (stackCapacity <= 0) {
            throw new IllegalArgumentException("Stack capacity should be greater than zero.");
        }
        this.stackCapacity = stackCapacity;
        //Creating an array to hold the stack elements of generic type
        this.stackArray = (E[]) new Object[stackCapacity];
        // Default value of top is -1 indicating the stack is empty
        this.top = -1;
    }

    /**
     * Adds an item to the top of the stack.
     *
     * @param item the element to be pushed onto the stack
     * @throws StackOverflowError if the stack is full
     */
    public void push(E item) {
        if (top + 1 == stackCapacity) {
            throw new StackOverflowError("Stack is full. Cannot push new item.");
        } else {
            stackArray[++top] = item;
        }

    }

    /**
     * Removes and returns the item from the top of the stack.
     *
     * @return the element popped from the stack
     * @throws IllegalStateException if the stack is empty
     */
    public E pop() {
        if (top == -1) {
            throw new IllegalStateException("Stack is empty. Cannot pull item.");
        } else {
            E item = stackArray[top];
            stackArray[top--] = null; // Clear the reference
            return item;
        }
    }

    /**
     * Returns the item at the top of the stack
     *
     * @return the element at the top of the stack
     * @throws IllegalStateException if the stack is empty
     */
    public E peek() {
        if (top == -1) {
            throw new IllegalStateException("Stack is empty. Cannot peek item.");
        } else {
            return stackArray[top];
        }
    }

    /**
     * Checks if the stack is empty
     *
     * @return true if the stack is empty, false otherwise
     */
    public boolean isEmpty() {
        return top == -1;
    }

    /**
     * Main method to demonstrate stack operations
     *
     * @param args command line arguments
     */
    public static void main(String[] args) {
        integerStackOperations();
        stringStackOperations();
    }

    /**
     * Demonstrates stack operations with Integer type
     */
    private static void integerStackOperations() {
        StackArray<Integer> stackOfIntegers = new StackArray<>(5);
        stackOfIntegers.push(10);
        stackOfIntegers.push(20);
        stackOfIntegers.push(30);
        System.out.println("Integer Stack Operations Start:" + "\n-------------------------");
        System.out.println("Top item is: " + stackOfIntegers.peek());
        Integer popped = stackOfIntegers.pop();
        System.out.println("Popped item is: " + popped);
        System.out.println("Top item after pop is: " + stackOfIntegers.peek());
        System.out.println("Is stack empty? " + stackOfIntegers.isEmpty());
        popped = stackOfIntegers.pop();
        System.out.println("Popped item is: " + popped);
        popped = stackOfIntegers.pop();
        System.out.println("Popped item is: " + popped);
        System.out.println("Is stack empty after popping all items? " + stackOfIntegers.isEmpty());
        System.out.println("-------------------------\nInteger Stack Operations End\n");
    }

    /**
     * Demonstrates stack operations with String type
     */
    private static void stringStackOperations() {
        StackArray<String> stackOfStrings = new StackArray<>(5);
        stackOfStrings.push("First Element");
        stackOfStrings.push("Second Element");
        stackOfStrings.push("Third Element");
        System.out.println("String Stack Operations Start:" + "\n-------------------------");
        System.out.println("Top item is: " + stackOfStrings.peek());
        String popped = stackOfStrings.pop();
        System.out.println("Popped item is: " + popped);
        System.out.println("Top item after pop is: " + stackOfStrings.peek());
        System.out.println("Is stack empty? " + stackOfStrings.isEmpty());
        popped = stackOfStrings.pop();
        System.out.println("Popped item is: " + popped);
        popped = stackOfStrings.pop();
        System.out.println("Popped item is: " + popped);
        System.out.println("Is stack empty after popping all items? " + stackOfStrings.isEmpty());
        System.out.println("-------------------------\nString Stack Operations End\n");
    }
}

