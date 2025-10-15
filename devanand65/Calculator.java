import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Advanced Calculator");
        System.out.println("Supported Operations");


        System.out.println("Binary Operations  :  +  -  *  /");
        System.out.println("Unary Operations :  sin  cos  tan  log  ln  factorial");

        System.out.println();
        System.out.println("Enter operation type (Binary / Unary)");
        String type = sc.next().toLowerCase();

        double result = 0;

        try{
            if(type.equals("binary"))
            {
                System.out.println("Enter first number");
                double var1 = sc.nextDouble();

                System.out.println("Enter operator (+  -  *  /): ");
                char op = sc.next().charAt(0);

                System.out.println("Enter second number : ");
                double var2 = sc.nextDouble();


                switch(op){
                    case '+' : 
                    result = var1 + var2;
                    break;
                    
                    case '-':
                    result = var1 - var2;
                    break;

                    case '*':
                    result = var1 * var2;
                    break;

                    case '/':
                    if(var2 == 0){
                        System.out.println("Error : Cannot divide by zero");
                        sc.close();
                        return;
                    }

                    default:
                    System.out.println("Invalid binary operator");
                    sc.close();
                    return;
                }
            }
            else if(type.equals("unary"))
            {
                System.out.println("Enter operation : (sin, cos, tan, log, ln, !)");
                String op = sc.next().toLowerCase();

                System.out.print("Enter number : ");
                double var = sc.nextDouble();


                switch(op)
                {
                    case "sin":
                    result = Math.sin(Math.toRadians(var));
                    break;

                    case "cos":
                    result = Math.cos(Math.toRadians(var));
                    break;

                    case "tan":
                    result = Math.tan(Math.toRadians(var));
                    break;

                    case "log":
                    if(var <= 0) throw new IllegalArgumentException("Logarithm undefined for negative numbers");
                    result = Math.log10(var);
                    break;

                    case "ln":
                    if(var <= 0) throw new IllegalArgumentException("Natural logarithm is not defined for negative numbers");
                    result = Math.log(var);
                    break;

                    case "!":
                    if(var != (int) var) throw new IllegalArgumentException("Factorial can be calculated only for integers");
                    result = factorial((int)var);
                    break;

                    default:
                    System.out.println("Invalid Unary Operation !");
                    sc.close();
                    return;

                }
            }

            else{
                    System.out.println("Invalid operation type !");
                    sc.close();
                    return;
            }

            System.out.println("Result : "+result);
        
    }
    catch(Exception e)
    {
        System.out.println("Error : "+e.getMessage());
    }
    sc.close();

}


        public static long factorial(int n)
        {
            if(n < 0)
            throw new IllegalArgumentException("Factorial of a negative number is not defined");

            long fact = 1;
            for(int i=1;i<=n;i++)
            fact = fact*i;

            return fact;
        }

}
