//This code is implementation of stack using Arrays.

public class Stack_Array<Generic>
{
    private Generic[] stk;
    int top;
    int capacity;

    public Stack_Array(int s)
    {
        capacity = s;
        stk = (Generic[]) new Object[capacity];
        top = -1;
    }


    //push method
    public void push(Generic var)
    {
        if(top == capacity-1)
        set_size(2*capacity);

        stk[++top] = var;
    }

    //Pop method
    public Generic pop()
    {
        if(isEmpty())
            throw new IllegalStateException("Stack does not contain any elements");
        
        Generic var = stk[top];
        stk[top--]=null;
        return var;
    }

    //This method returns the element that is currently at the top of the stack
    public Generic peek(){
        if(isEmpty())
        throw new IllegalStateException("Stack does not have any elements");

        return stk[top];
    }

    public boolean isEmpty(){
        if(top == -1)
        return true;

        return false;
    }

    public int size(){
        int cap = top+1;
        return cap;
    }

    //The below function is being used to adjust the size of the array. kind of dynamic resizing the array
    private void set_size(int c)
    {
        Generic[] new_stk = (Generic[]) new Object[c];

        for(int i=0;i<capacity;i++)
        new_stk[i] = stk[i];

        capacity = c;
        stk = new_stk;
    }


public static void main(String[] args)
{
    Stack_Array<Integer> stk = new Stack_Array<>(5);
    //Performing little testing in the below lines of code.
    stk.push(12);
    stk.push(25);
    stk.push(87);
    stk.push(90);
    stk.push(10);
    stk.push(23);

    System.out.println("Element on the top : "+stk.peek());
    System.out.println("Size of the stack : "+stk.size());

    while(!stk.isEmpty())
    {
        System.out.println("Deleted element : "+ stk.pop());
    }
}


}