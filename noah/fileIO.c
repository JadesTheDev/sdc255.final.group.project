// fileIO.c
#include <stdio.h>
#include <stdlib.h>
#include "fileIO.h"

char* readFile(const char *filename)
{
    FILE *file = fopen(filename, "r");
    char *buffer;
    int ch;
    int size = 0;

    if (!file) return NULL;

    buffer = malloc(1);
    if (!buffer) {
        fclose(file);
        return NULL;
    }

    while ((ch = fgetc(file)) != EOF) {
        char *temp = realloc(buffer, size + 2);
        if (!temp) {
            free(buffer);
            fclose(file);
            return NULL;
        }
        buffer = temp;
        buffer[size++] = ch;
    }

    buffer[size] = '\0';
    fclose(file);
    return buffer;
}
