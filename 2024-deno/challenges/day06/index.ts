import { readFileByLine } from "../../utils/file.ts";

type Position = { x: number; y: number };

const directions: Record<string, (x: number, y: number) => [number, number]> = {
  "^": (x, y) => [x, y - 1],
  ">": (x, y) => [x + 1, y],
  v: (x, y) => [x, y + 1],
  "<": (x, y) => [x - 1, y],
};

const getBaseMatrix = () => {
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

  return {
    initialPosition: position,
    initialDirection: direction,
    initialMatrix: matrix,
  };
};

const walkThroughMatrix = (
  position: Position,
  direction: keyof typeof directions,
  matrix: string[][],
  onCheck: (
    position: Position,
    direction: keyof typeof directions,
    matrix: string[][]
  ) => boolean
) => {
  while (
    position.y < matrix.length &&
    position.y >= 0 &&
    position.x < matrix[0].length &&
    position.x >= 0
  ) {
    const shouldBreak = onCheck(position, direction, matrix);

    if (shouldBreak) {
      break;
    }

    const [newX, newY] = directions[direction](position.x, position.y);

    if (matrix[newY]?.[newX] === "#") {
      direction = Object.keys(directions).at(
        (Object.keys(directions).indexOf(direction) + 1) % 4
      )!;
    } else {
      position.x = newX;
      position.y = newY;
    }
  }
};

export const a = () => {
  let amountFields = 0;
  const { initialDirection, initialPosition, initialMatrix } = getBaseMatrix();

  walkThroughMatrix(
    initialPosition,
    initialDirection,
    initialMatrix,
    (pos, _, ma) => {
      if (ma[pos.y][pos.x] !== "X") {
        ma[pos.y][pos.x] = "X";
        amountFields++;
      }
      return false;
    }
  );

  return amountFields;
};

export const b = () => {
  const { initialDirection, initialPosition, initialMatrix } = getBaseMatrix();

  const initialPath: Position[] = [];

  walkThroughMatrix(
    { ...initialPosition },
    initialDirection,
    initialMatrix,
    (position) => {
      if (
        (position.x !== initialPosition.x ||
          position.y !== initialPosition.y) &&
        initialPath.find(
          (item) => item.x === position.x && item.y === position.y
        ) == null
      ) {
        initialPath.push({ ...position });
      }

      return false;
    }
  );

  let loopCount = 0;

  console.log("Pathlength", initialPath.length);

  initialPath.forEach((pos) => {
    const matrix = [...initialMatrix.map((line) => [...line])];
    matrix[pos.y][pos.x] = "#";
    const currentPath: {
      position: Position;
      direction: keyof typeof directions;
    }[] = [];

    walkThroughMatrix(
      { ...initialPosition },
      initialDirection,
      matrix,
      (position, direction) => {
        if (
          currentPath.find(
            (item) =>
              item.position.x === position.x &&
              item.position.y === position.y &&
              item.direction === direction
          ) != null
        ) {
          loopCount++;
          return true;
        }
        currentPath.push({ direction, position: { ...position } });
        return false;
      }
    );
    if (loopCount % 100 === 0) console.log(loopCount);
  });

  return loopCount;
};
