//fileIO.c
//Implement readFile()

#include <stdio.h>
#include <stdlib.h>
#include "fileIO.h"
 
char readFile(const char *fileIO.c) {
FILE *file = fopen(fileIO.c, "r");
char *buffer;
int ch;
int size = 0;
 
if (file == NULL) {
return NULL;
}
 
buffer = malloc(1);
if (buffer == NULL) {
fclose(file);
return NULL;
}
 
while ((ch = fgetc(file)) != EOF (
buffer = realloc(buffer, size + 2);
buffer[size] = ch;
size++;
}
 
buffer[size] = '\0';
 
fclose(file);
return buffer;
