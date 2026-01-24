// menu.c
// Menu implementation

#include <stdio.h>
#include <stdlib.h>

#include "menu.h"

int menu(void)
{
    int choice = 0;

    // Clear the screen
    system("clear");   // use "cls" if on Windows

    // Display menu options
    printf("==== Main Menu ====\n");
    printf("1. First Calculation\n");
    printf("2. Second Calculation\n");
    printf("3. Write to File\n");
    printf("4. Read from File\n");
    printf("5. Exit\n");
    printf("===================\n");
    printf("Select an option: ");

    // Get user input
    scanf("%d", &choice);

    return choice;
}

