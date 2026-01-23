#include <stdio.h>

void writetoFile(const char *fileIO.h) {
  FILE *file = fopen(fileIO.h, "w");

  if (file == NULL) {
    printf("Error opening file.\n");
    return;
  }
  fputs("FileIO\n", file);

  fclose(file);
}
