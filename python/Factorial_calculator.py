# File: factorial_calculator.py
# Description: Computes the factorial of a given positive integer

num = int(input("Enter a positive integer: "))

if num < 0:
    print("Factorial does not exist for negative numbers.")
else:
    factorial = 1
    for i in range(1, num + 1):
        factorial *= i
    print(f"The factorial of {num} is {factorial}")
