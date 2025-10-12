import java.util.*;

public class linkdlist {
    Node head;

    static class Node {
        int data;
        Node next;
    }

    public void add(int data) {
        Node newnode = new Node();
        newnode.data = data;
        newnode.next = null;
        if (head == null) {
            head = newnode;
        } else {
            Node last = head;
            while (last.next != null) {
                last = last.next;
            }
            last.next = newnode;
        }
    }

    public void printList() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        linkdlist list = new linkdlist();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.printList();
    }
}