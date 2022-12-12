import { charToValue, getFileContent, logResults } from "../../utils";

type HeightMapField = {
  value: number;
  steps: number;
};

type Path = {
  heightMap: HeightMapField[][];
  startX: number;
  startY: number;
};

const checkDirection = (
  heightMap: HeightMapField[][],
  x: number,
  y: number,
  field: HeightMapField,
  isInLimit: boolean
) => {
  if (isInLimit) {
    if (
      heightMap[y][x].value < field.value + 2 &&
      heightMap[y][x].steps > field.steps + 1
    ) {
      heightMap[y][x].steps = field.steps + 1;
      flood(heightMap, x, y);
    }
  }
};

const flood = (heightMap: HeightMapField[][], x: number, y: number) => {
  const field = heightMap[y][x];
  checkDirection(heightMap, x - 1, y, field, x - 1 >= 0); // left
  checkDirection(heightMap, x + 1, y, field, x + 1 < heightMap[0].length); // right
  checkDirection(heightMap, x, y - 1, field, y - 1 >= 0); // up
  checkDirection(heightMap, x, y + 1, field, y + 1 < heightMap.length); // down
};

export const day12 = () => {
  const content = getFileContent("12");
  const heightMap: HeightMapField[][] = content.map((line) =>
    line
      .split("")
      .map((field) => ({ value: charToValue(field), steps: 100000 }))
  );

  const part1Paths: Path[] = [];
  const part2Paths: Path[] = [];

  let xEnd = 0;
  let yEnd = 0;

  heightMap.forEach((y, yInd) => {
    y.forEach((x, xInd) => {
      if (x.value == charToValue("a")) {
        part2Paths.push({
          startX: xInd,
          startY: yInd,
          heightMap: [],
        });
      }
      if (x.value == charToValue("S")) {
        heightMap[yInd][xInd].value = charToValue("a");
        part1Paths.push({
          startX: xInd,
          startY: yInd,
          heightMap: [],
        });
        part2Paths.push({
          startX: xInd,
          startY: yInd,
          heightMap: [],
        });
      }
      if (x.value == charToValue("E")) {
        xEnd = xInd;
        yEnd = yInd;
        heightMap[yInd][xInd].value = charToValue("z");
      }
    });
  });

  part1Paths.forEach((path) => {
    path.heightMap = JSON.parse(JSON.stringify(heightMap));
    path.heightMap[path.startY][path.startX].steps = 0;
    flood(path.heightMap, path.startX, path.startY);
  });

  part2Paths.forEach((path) => {
    path.heightMap = JSON.parse(JSON.stringify(heightMap));
    path.heightMap[path.startY][path.startX].steps = 0;
    flood(path.heightMap, path.startX, path.startY);
  });

  const res1 = part1Paths.reduce(
    (prev, curr) => Math.min(prev, curr.heightMap[yEnd][xEnd].steps),
    10000
  );

  const res2 = part2Paths.reduce(
    (prev, curr) => Math.min(prev, curr.heightMap[yEnd][xEnd].steps),
    10000
  );

  logResults(12, res1, res2);
};
