// calculations.c
//
// Core Computation Module
//
// Responsibilities:
// - Implement firstCalculation(int, int)
// - Implement secondCalculation(int, int) using different math
// - Display results to the console
// - Ensure clean integration with menu input
// - Support independent testing
//

#include <stdio.h>
#include "calculations.h"

// ---------------------------------------------------
// firstCalculation: Example uses addition
// ---------------------------------------------------
void firstCalculation(int a, int b)
{
    int result = a + b;
    printf("\n[First Calculation]\n");
    printf("%d + %d = %d\n\n", a, b, result);
}

// ---------------------------------------------------
// secondCalculation: Example uses multiplication
// ---------------------------------------------------
void secondCalculation(int a, int b)
{
    int result = a * b;
    printf("\n[Second Calculation]\n");
    printf("%d * %d = %d\n\n", a, b, result);
}

// ---------------------------------------------------
// Optional standalone tester for development
// ---------------------------------------------------
void testCalculations(void)
{
    printf("Running standalone test...\n");

    firstCalculation(4, 2);   // Expect: 6
    secondCalculation(4, 2);  // Expect: 8
    
    printf("Test complete.\n");
}

