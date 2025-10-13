
import sys
from typing import Union, Optional

class Calculator:
    """A simple command-line calculator supporting basic arithmetic operations."""
    
    def __init__(self):
        self.operations = {
            '+': self._add,
            '-': self._subtract,
            '*': self._multiply,
            '/': self._divide
        }
    
    def _add(self, a: float, b: float) -> float:
        """Add two numbers."""
        return a + b
    
    def _subtract(self, a: float, b: float) -> float:
        """Subtract two numbers."""
        return a - b
    
    def _multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        return a * b
    
    def _divide(self, a: float, b: float) -> float:
        """Divide two numbers."""
        if b == 0:
            raise ZeroDivisionError("Error: Division by zero is not allowed.")
        return a / b
    
    def calculate(self, num1: float, operator: str, num2: float) -> float:
        """
        Perform calculation based on the operator.
        
        Args:
            num1: First number
            operator: Arithmetic operator (+, -, *, /)
            num2: Second number
            
        Returns:
            float: Result of the calculation
            
        Raises:
            ValueError: If operator is invalid
            ZeroDivisionError: If division by zero is attempted
        """
        if operator not in self.operations:
            raise ValueError(f"Error: Invalid operator '{operator}'. Supported operators are: +, -, *, /")
        
        return self.operations[operator](num1, num2)
    
    def get_operator_symbol(self, operator: str) -> str:
        """Get the display symbol for the operator."""
        symbols = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        }
        return symbols.get(operator, operator)

def get_number_input(prompt: str) -> Optional[float]:
    """
    Get and validate number input from user.
    
    Args:
        prompt: The prompt to display to user
        
    Returns:
        float or None: Validated number or None if user wants to exit
    """
    while True:
        try:
            user_input = input(prompt).strip()
            
            # Allow user to exit
            if user_input.lower() in ['exit', 'quit', 'q']:
                return None
            
            return float(user_input)
        except ValueError:
            print("Error: Please enter a valid number or type 'exit' to quit.")

def get_operator_input() -> Optional[str]:
    """
    Get and validate operator input from user.
    
    Returns:
        str or None: Validated operator or None if user wants to exit
    """
    valid_operators = ['+', '-', '*', '/']
    
    while True:
        operator = input("Enter operator (+, -, *, /) or 'exit' to quit: ").strip()
        
        if operator.lower() in ['exit', 'quit', 'q']:
            return None
        
        if operator in valid_operators:
            return operator
        
        print(f"Error: Invalid operator '{operator}'. Please use one of: {', '.join(valid_operators)}")

def display_welcome_message():
    """Display welcome message and instructions."""
    print("\n" + "="*50)
    print("          COMMAND-LINE CALCULATOR")
    print("="*50)
    print("Supported operations:")
    print("  +  Addition")
    print("  -  Subtraction")
    print("  *  Multiplication")
    print("  /  Division")
    print("\nType 'exit', 'quit', or 'q' at any time to exit.")
    print("="*50)

def display_result(num1: float, operator: str, num2: float, result: float, calc: Calculator):
    """Display the calculation result in a formatted way."""
    operator_symbol = calc.get_operator_symbol(operator)
    print(f"\n{num1} {operator_symbol} {num2} = {result}")

def main():
    """Main function to run the calculator."""
    calculator = Calculator()
    display_welcome_message()
    
    print("\nLet's start calculating!")
    
    while True:
        try:
            # Get first number
            num1 = get_number_input("\nEnter first number (or 'exit' to quit): ")
            if num1 is None:
                break
            
            # Get operator
            operator = get_operator_input()
            if operator is None:
                break
            
            # Get second number
            num2 = get_number_input("Enter second number (or 'exit' to quit): ")
            if num2 is None:
                break
            
            # Perform calculation
            result = calculator.calculate(num1, operator, num2)
            display_result(num1, operator, num2, result, calculator)
            
        except ZeroDivisionError as e:
            print(f"\n{e}")
        except ValueError as e:
            print(f"\n{e}")
        except KeyboardInterrupt:
            print("\n\nOperation cancelled by user.")
            break
        except Exception as e:
            print(f"\nAn unexpected error occurred: {e}")
            break
    
    print("\nThank you for using the calculator! Goodbye!")

if __name__ == "__main__":
    main()