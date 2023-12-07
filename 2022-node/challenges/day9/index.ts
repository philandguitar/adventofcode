import { getFileContent, logResults } from "../../utils";

enum Direction {
  RIGHT = "R",
  LEFT = "L",
  UP = "U",
  DOWN = "D",
}

type Knot = {
  x: number;
  y: number;
};

const start = 1000;

const moveH = (direction: Direction, knot: Knot): Knot => {
  switch (direction) {
    case Direction.UP:
      return {
        x: knot.x,
        y: knot.y - 1,
      };
    case Direction.DOWN:
      return {
        x: knot.x,
        y: knot.y + 1,
      };
    case Direction.LEFT:
      return {
        x: knot.x - 1,
        y: knot.y,
      };
    case Direction.RIGHT:
      return {
        x: knot.x + 1,
        y: knot.y,
      };
  }
};

const moveT = (prevKnot: Knot, currKnot: Knot): Knot => {
  const isDiagonal =
    Math.abs(prevKnot.x - currKnot.x) === 1 &&
    Math.abs(prevKnot.y - currKnot.y) === 1;
  const isSamePos = prevKnot.x === currKnot.x && prevKnot.y == currKnot.y;
  const nextToEachOther =
    (prevKnot.x === currKnot.x && Math.abs(prevKnot.y - currKnot.y) === 1) ||
    (prevKnot.y === currKnot.y && Math.abs(prevKnot.x - currKnot.x) === 1);
  if (isDiagonal || isSamePos || nextToEachOther) {
    return currKnot;
  }
  if (prevKnot.x === currKnot.x) {
    return {
      x: currKnot.x,
      y: prevKnot.y > currKnot.y ? currKnot.y + 1 : currKnot.y - 1, // move up or down
    };
  }
  if (prevKnot.y === currKnot.y) {
    return {
      x: prevKnot.x > currKnot.x ? currKnot.x + 1 : currKnot.x - 1, // move left or right
      y: currKnot.y,
    };
  }
  if (prevKnot.x > currKnot.x) {
    // diagonal to the right
    if (prevKnot.y > currKnot.y) {
      // right down
      return {
        x: currKnot.x + 1,
        y: currKnot.y + 1,
      };
    } else {
      // right up
      return {
        x: currKnot.x + 1,
        y: currKnot.y - 1,
      };
    }
  } else {
    // diagonal to the left
    if (prevKnot.y > currKnot.y) {
      // left down
      return {
        x: currKnot.x - 1,
        y: currKnot.y + 1,
      };
    } else {
      // left down
      return {
        x: currKnot.x - 1,
        y: currKnot.y - 1,
      };
    }
  }
};

const executeCommand = (
  direction: Direction,
  steps: number,
  currentKnots: Knot[],
  field: Record<string, number>
) => {
  const knots = currentKnots;
  for (let i = 0; i < steps; i++) {
    knots.forEach((knot, index) => {
      if (index === 0) {
        knots[index] = moveH(direction, knot);
      } else {
        knots[index] = moveT(knots[index - 1], knot);
      }
    });

    field[`${knots.at(-1)?.x}_${knots.at(-1)?.y}`] =
      (field[`${knots.at(-1)?.x}_${knots.at(-1)?.y}`] ?? 0) + 1;
  }
};

export const day9 = () => {
  const content = getFileContent("9");

  const knots1: Knot[] = Array(2).fill({ x: start, y: start });
  const knots2: Knot[] = Array(10).fill({ x: start, y: start });

  const field1: Record<string, number> = {};
  const field2: Record<string, number> = {};

  content.forEach((command) => {
    const [dir, steps] = command.split(" ");
    executeCommand(dir as Direction, Number.parseInt(steps), knots1, field1);
    executeCommand(dir as Direction, Number.parseInt(steps), knots2, field2);
  });

  const res1 = Object.values(field1).length;
  const res2 = Object.values(field2).length;

  logResults(9, res1, res2);
};
