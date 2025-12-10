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
      if (
        matrix[checkedRow][checkedCol] === "@" &&
        !(checkedRow === row && checkedCol === col)
      ) {
        nearbyRoles++;
      }
    }
  }

  return nearbyRoles < 4;
};

export const a = () => {
  const matrix = readFileAsMatrix(import.meta.dirname);

  let removedRoles = 0;

  matrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === "@" && checkPosition(matrix, rowIndex, colIndex)) {
        removedRoles++;
      }
    });
  });

  return removedRoles;
};

export const b = () => {
  const matrix = readFileAsMatrix(import.meta.dirname);

  let totalRemovedRoles = 0;
  let thisIterationRemoved = 1; // To enter the loop at least once

  while (thisIterationRemoved > 0) {
    thisIterationRemoved = 0;
    const matrixCopy = [...matrix.map((row) => [...row])];

    matrixCopy.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === "@" && checkPosition(matrix, rowIndex, colIndex)) {
          thisIterationRemoved++;
          matrix[rowIndex][colIndex] = "x";
        }
      });
    });

    totalRemovedRoles += thisIterationRemoved;
  }

  return totalRemovedRoles;
};
