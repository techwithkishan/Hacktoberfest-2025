/* EXPERIMENT : 04
Name : Shrusti Moon
Roll no : UEC2024145

Program to add two polynomials using array of structures. 
The display includes the polynomials that are added and the resultant polynomial in descending order of the exponents.
*/

#include <stdio.h>

// Step 2: Define structure
struct poly {
    float coeff[10]; // coeff[i] = coefficient of x^i
} p[3]; // p[0], p[1] = input polynomials, p[2] = result

int main() {
    int i, j, n, pow;
    float c;

    // Step 2a: Initialize all coefficients to 0
    for (j = 0; j < 3; j++)
        for (i = 0; i < 10; i++)
            p[j].coeff[i] = 0;

    // Step 3: Input two polynomials
    for (j = 0; j < 2; j++) {
        printf("\nPolynomial %d\n", j + 1);
        printf("Enter the number of terms: ");
        scanf("%d", &n);

        for (i = 0; i < n; i++) {
            // Input power
            printf("Enter the power (0-9): ");
            scanf("%d", &pow);
            if (pow < 0 || pow > 9) {
                printf("Invalid power! Must be between 0 and 9. Term skipped.\n");
                i--; // repeat this term
                continue;
            }

            // Input coefficient
            printf("Enter the coefficient: ");
            scanf("%f", &c);

            // Store coefficient at index = power
            p[j].coeff[pow] = c;
        }
    }

    // Step 4: Display input polynomials
    for (j = 0; j < 2; j++) {
        printf("\nPolynomial %d: ", j + 1);
        int first = 1;
        for (i = 9; i >= 0; i--) { // descending order
            if (p[j].coeff[i] != 0) {
                if (first) {
                    printf("%.2fx^%d", p[j].coeff[i], i);
                    first = 0;
                } else {
                    printf(" + %.2fx^%d", p[j].coeff[i], i);
                }
            }
        }
        if (first) printf("0"); // all-zero polynomial
        printf("\n");
    }

    // Step 5: Add polynomials
    for (i = 0; i < 10; i++)
        p[2].coeff[i] = p[0].coeff[i] + p[1].coeff[i];

    // Step 6: Display result polynomial
    printf("\nResultant Polynomial (Sum): ");
    int first = 1;
    for (i = 9; i >= 0; i--) {
        if (p[2].coeff[i] != 0) {
            if (first) {
                printf("%.2fx^%d", p[2].coeff[i], i);
                first = 0;
            } else {
                printf(" + %.2fx^%d", p[2].coeff[i], i);
            }
        }
    }
    if (first) printf("0"); // all-zero polynomial
    printf("\n");

    // Step 7: End
    return 0;
}
/* OUTPUT :

Polynomial 1
Enter the number of terms: 4
Enter the power (0-9): 2
Enter the coefficient: 1
Enter the power (0-9): 3
Enter the coefficient: 4
Enter the power (0-9): 5
Enter the coefficient: 2
Enter the power (0-9): 6
Enter the coefficient: 7

Polynomial 2
Enter the number of terms: 2
Enter the power (0-9): 5
Enter the coefficient: 3
Enter the power (0-9): 7
Enter the coefficient: 6

Polynomial 1: 7.00x^6 + 2.00x^5 + 4.00x^3 + 1.00x^2

Polynomial 2: 6.00x^7 + 3.00x^5

Resultant Polynomial (Sum): 6.00x^7 + 7.00x^6 + 5.00x^5 + 4.00x^3 + 1.00x^2
*/