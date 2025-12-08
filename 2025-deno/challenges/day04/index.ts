import { readFileAsMatrix, readFileByLine } from "../../utils/file.ts";

const checkPosition = (matrix: string[][], row: number, col: number) => {
  let nearbyRoles = 0;
  for (
    let checkedRow = Math.max(0, row - 1);
    checkedRow <= Math.min(matrix.length - 1, row + 1);
    checkedRow++
  ) {
    for (
      let checkedCol = Math.max(0, col - 1);
      checkedCol <= Math.min(matrix[0].length - 1, col + 1);
      checkedCol++
    ) {
      if (matrix[checkedRow][checkedCol] === "@") {
        nearbyRoles++;
      }
    }
  }

  return nearbyRoles < 4;
};

export const a = () => {
  const matrix = readFileAsMatrix(import.meta.dirname, "example");

  let removedRoles = 0;

  matrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === "@" && checkPosition(matrix, rowIndex, colIndex)) {
        removedRoles++;
      }
    });
  });

  return matrix.length;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);
  return lines.length;
};
