// optionSelector.c
// Option selector / control flow implementation

#include <stdio.h>

#include "optionSelector.h"
#include "calculations.h"
#include "fileIO.h"

void mainLoop(int option)
{
    int a = 0;
    int b = 0;

    switch (option)
    {
        case 1:
            // First Calculation
            printf("Enter two numbers: ");
            scanf("%d %d", &a, &b);
            firstCalculation(a, b);
            break;

        case 2:
            // Second Calculation
            printf("Enter two numbers: ");
            scanf("%d %d", &a, &b);
            secondCalculation(a, b);
            break;

        case 3:
            // Write to File
            writeFile();
            break;

        case 4:
            // Read from File
            readFile();
            break;

        default:
            printf("Invalid option. Please choose 1-5.\n");
            break;
    }
}

