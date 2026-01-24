// fileIO.h
// Implement writetoFile()

#include <stdio.h>

void writetoFile(const char *fileIO.h) {
  FILE *file = fopen(fileIO.h, "w"); // open for writing

  if (file == NULL) {
    printf("Error opening file.\n");
    return;
  }
  fputs("FileIO\n", file);

  fclose(file); // close the file
}
