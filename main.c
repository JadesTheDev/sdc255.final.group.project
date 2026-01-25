// main.c
// Main Integration Function (User Story #7)
//
// Requirements hit:
// - int main(void)
// - returns 0 on normal completion
// - receives an option from menu()
// - continuously loops mainLoop(option) until exit selected

#include <stdio.h>
#include <stdlib.h>

#include "menu.h"
#include "optionSelector.h"

#define EXIT_OPTION 5

int main(void)
{
    int option = 0;

    while (1)
    {
        // Get the user's choice from the menu
        option = menu();

        // Exit condition
        if (option == EXIT_OPTION)
        {
            break;
        }

        // Route the option to the correct logic
        mainLoop(option);
    }

    return 0;
}
