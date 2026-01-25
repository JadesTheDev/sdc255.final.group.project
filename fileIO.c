// fileIO.c
// Implements readFile() and writeFile()

#include <stdio.h>
#include <stdlib.h>
#include "fileIO.h"

char* readFile(const char *filename)
{
    FILE *file = fopen(filename, "r");
    char *buffer;
    int ch;
    int size = 0;

    if (file == NULL) return NULL;

    buffer = (char*)malloc(1);
    if (buffer == NULL)
    {
        fclose(file);
        return NULL;
    }

    while ((ch = fgetc(file)) != EOF)
    {
        char *temp = (char*)realloc(buffer, size + 2);
        if (temp == NULL)
        {
            free(buffer);
            fclose(file);
            return NULL;
        }
        buffer = temp;
        buffer[size++] = (char)ch;
    }

    buffer[size] = '\0';
    fclose(file);
    return buffer;
}

void writeFile(const char *filename)
{
    FILE *file = fopen(filename, "w");
    if (file == NULL)
    {
        printf("Error opening file for writing.\n");
        return;
    }

    fputs("FileIO\n", file);
    fputs("This file was written by writeFile().\n", file);

    fclose(file);
}
