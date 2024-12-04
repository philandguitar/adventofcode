import { readFileByLine } from "../../utils/file.ts";

const xmas = "XMAS";

const checkDirection = (
  startX: number,
  startY: number,
  matrix: string[][],
  xFunc: (baseX: number, increase: number) => number,
  yFunc: (baseY: number, increase: number) => number,
) => {
  let text = "";
  xmas.split("").forEach((char, index) => {
    const x = xFunc(startX, index);
    const y = yFunc(startY, index);
    if (x < 0 || y < 0 || x >= matrix[0].length || y >= matrix.length) {
      return false;
    }

    if (matrix[y][x] !== char) return false;
    text += char;
  });

  return text === xmas;
};

const xmasCount = (x: number, y: number, matrix: string[][]) => {
  let count = 0;
  if (matrix[y][x] !== xmas.charAt(0)) return count;
  if (
    checkDirection(x, y, matrix, (x, i) => x + i, (y, _) => y)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, i) => x - i, (y, _) => y)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, _) => x, (y, i) => y + i)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, _) => x, (y, i) => y - i)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, i) => x + i, (y, i) => y + i)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, i) => x - i, (y, i) => y - i)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, i) => x + i, (y, i) => y - i)
  ) count++;
  if (
    checkDirection(x, y, matrix, (x, i) => x - i, (y, i) => y + i)
  ) count++;

  return count;
};

const isCrossMas = (x: number, y: number, matrix: string[][]) => {
  let count = 0;
  if (
    matrix[y][x] !== "A" || x - 1 < 0 || y - 1 < 0 ||
    x + 1 >= matrix[0].length || y + 1 >= matrix.length
  ) {
    return false;
  }

  if (matrix[y - 1][x - 1] === "M" && matrix[y + 1][x + 1] === "S") count++;
  if (matrix[y - 1][x - 1] === "S" && matrix[y + 1][x + 1] === "M") count++;

  if (matrix[y - 1][x + 1] === "M" && matrix[y + 1][x - 1] === "S") count++;
  if (matrix[y - 1][x + 1] === "S" && matrix[y + 1][x - 1] === "M") count++;

  return count === 2;
};

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);
  const matrix = lines.map((line) => line.split(""));

  let amount = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      amount += xmasCount(x, y, matrix);
    }
  }

  return amount;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);
  const matrix = lines.map((line) => line.split(""));

  let amount = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (isCrossMas(x, y, matrix)) amount++;
    }
  }

  return amount;
};
