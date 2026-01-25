// optionSelector.c
// Option selector / control flow implementation

#include <stdio.h>
#include <stdlib.h>

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
            writeFile("data.txt");
            printf("\nWrote to data.txt\n\n");
            break;

        case 4:
        {
            // Read from File
            char *contents = readFile("data.txt");
            if (contents)
            {
                printf("\n--- data.txt contents ---\n%s\n-------------------------\n\n", contents);
                free(contents);
            }
            else
            {
                printf("\nFailed to read data.txt (missing or error)\n\n");
            }
            break;
        }

        default:
            printf("Invalid option. Please choose 1-5.\n");
            break;
    }
}
