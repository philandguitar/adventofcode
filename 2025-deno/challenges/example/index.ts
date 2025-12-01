import { readFileByLine } from "../../utils/file.ts";

type Position = { x: number; y: number };

const directions: Record<string, (x: number, y: number) => [number, number]> = {
  "^": (x, y) => [x, y - 1],
  ">": (x, y) => [x + 1, y],
  v: (x, y) => [x, y + 1],
  "<": (x, y) => [x - 1, y],
};

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);
  let position: Position = { x: 0, y: 0 };
  let direction: keyof typeof directions = "^";
  const matrix = lines.map((line, yIndex) => {
    if (line.includes("^")) {
      position = { x: line.indexOf("^"), y: yIndex };
      direction = "^";
    }
    if (line.includes(">")) {
      position = { x: line.indexOf(">"), y: yIndex };
      direction = ">";
    }
    if (line.includes("v")) {
      position = { x: line.indexOf("v"), y: yIndex };
      direction = "v";
    }
    if (line.includes("<")) {
      position = { x: line.indexOf("<"), y: yIndex };
      direction = "<";
    }

    return line.split("");
  });

  let amountFields = 0;

  while (
    position.y < lines.length &&
    position.y >= 0 &&
    position.x < lines[0].length &&
    position.x >= 0
  ) {
    if (matrix[position.y][position.x] !== "X") {
      matrix[position.y][position.x] = "X";
      amountFields++;
    }
    const [newX, newY] = directions[direction](position.x, position.y);
    position.x = newX;
    position.y = newY;
    if (matrix[position.y][position.x] === "#") {
      direction = Object.keys(directions).at(
        (Object.keys(directions).indexOf(direction) + 1) % 4
      )!;
    }
  }

  matrix.map((line) => console.log(line.join()));

  return amountFields;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);
  return lines.length;
};
