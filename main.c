// main.c
// Main Integration Function (User Story #7)
//
// Requirements hit:
// - int main(void) (no inputs)
// - returns 0 on normal completion
// - receives an option from menu()
// - continuously loops mainLoop(option) until an exit condition is selected
// - includes pertinent project headers + standard headers

#include <stdio.h>
#include <stdlib.h>

#include "menu.h"
#include "optionSelector.h"

#define EXIT_OPTION 5   // assuming Menu has 5 options and #5 is Exit

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

        // Pass the choice into the option selector/control flow
        mainLoop(option);
    }

    return 0;
}

