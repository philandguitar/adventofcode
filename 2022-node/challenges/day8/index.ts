import { getFileContent, logResults } from "../../utils";

type Tree = {
  height: number;
  isVisible: boolean;
  scenicScore: number;
};

export const day8 = () => {
  const content = getFileContent("8");
  const treeMatrix = content.map((row) =>
    row.split("").map(
      (val): Tree => ({
        height: Number.parseInt(val),
        isVisible: true,
        scenicScore: 0,
      })
    )
  );
  for (let y = 1; y < treeMatrix.length; y++) {
    for (let x = 1; x < treeMatrix[0].length; x++) {
      treeMatrix[y][x].isVisible = checkVisibility(treeMatrix, x, y);
      if (treeMatrix[y][x].isVisible) {
        treeMatrix[y][x].scenicScore = getScenicScore(treeMatrix, x, y);
      }
    }
  }

  const visual = treeMatrix.map((y) =>
    y.map((x) => (x.isVisible ? "X" : " ")).join("")
  );

  console.log(visual.forEach((line) => console.log(line)));

  const res1 = treeMatrix.reduce(
    (prev, curr) =>
      prev + curr.reduce((pre, cur) => (cur.isVisible ? pre + 1 : pre), 0),
    0
  );

  const res2 = treeMatrix.reduce(
    (prev, curr) =>
      Math.max(
        prev,
        curr.reduce((pre, cur) => Math.max(pre, cur.scenicScore), 0)
      ),
    0
  );

  logResults(8, res1, res2);
};

const checkVisibility = (treeMatrix: Tree[][], x: number, y: number) => {
  const isLeftVisible =
    treeMatrix[y][x].height >
    Math.max(...treeMatrix[y].slice(0, x).map((tree) => tree.height));
  const isRightVisible =
    treeMatrix[y][x].height >
    Math.max(...treeMatrix[y].slice(x + 1).map((tree) => tree.height));
  const isTopVisible =
    treeMatrix[y][x].height >
    Math.max(...treeMatrix.slice(0, y).map((tree) => tree[x].height));
  const isBottomVisible =
    treeMatrix[y][x].height >
    Math.max(...treeMatrix.slice(y + 1).map((tree) => tree[x].height));

  return isBottomVisible || isLeftVisible || isRightVisible || isTopVisible;
};

const getScenicScore = (treeMatrix: Tree[][], x: number, y: number) => {
  let left = {
    foundEnd: false,
    score: 0,
  };
  let right = {
    foundEnd: false,
    score: 0,
  };
  let top = {
    foundEnd: false,
    score: 0,
  };
  let bot = {
    foundEnd: false,
    score: 0,
  };

  const maxTotalDistance = Math.max(
    x,
    y,
    treeMatrix.length - y,
    treeMatrix[0].length - x
  );

  for (let i = 1; i < maxTotalDistance; i++) {
    if (!left.foundEnd) {
      if (x - i <= 0 || treeMatrix[y][x].height <= treeMatrix[y][x - i].height)
        left.foundEnd = true;

      if (x - i >= 0) left.score++;
    }

    if (!top.foundEnd) {
      if (y - i <= 0 || treeMatrix[y][x].height <= treeMatrix[y - i][x].height)
        top.foundEnd = true;

      if (y - i >= 0) top.score++;
    }

    if (!right.foundEnd) {
      if (
        x + i >= treeMatrix[0].length - 1 ||
        treeMatrix[y][x].height <= treeMatrix[y][x + i].height
      ) {
        right.foundEnd = true;
      }

      if (x + i < treeMatrix[0].length) right.score++;
    }

    if (!bot.foundEnd) {
      if (
        y + i >= treeMatrix.length - 1 ||
        treeMatrix[y][x].height <= treeMatrix[y + i][x].height
      )
        bot.foundEnd = true;

      if (y + i < treeMatrix.length) bot.score++;
    }
  }

  return left.score * right.score * top.score * bot.score;
};
