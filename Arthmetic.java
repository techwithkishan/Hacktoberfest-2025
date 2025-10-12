import java.util.*;
public class Arthmetic {
    public static void main(String[] args) {
        Scanner sc  = new Scanner(System.in);
        System.out.println("Enter first number:");
        int a = sc.nextInt();
        System.out.println("Enter Second Number");
        int b = sc.nextInt();

        int add  = a+b;
        int sub = a-b;
        int div = a/b;
        int multi = a*b;

        System.out.println("The Arthmetic are:"+" "+add+ " "+sub+" "+div+ " " +multi );
    }
}
