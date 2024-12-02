import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);

  return lines.reduce((acc, line) => {
    const array = line.split(" ").map((value) => Number(value));

    return isArraySafe(array) ? acc + 1 : acc;
  }, 0);
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);

  return lines.reduce((acc, line) => {
    const array = line.split(" ").map((value) => Number(value));
    let isSave = isArraySafe(array);

    if (!isSave) {
      for (let i = 0; i < array.length; i++) {
        const copy = [...array];
        copy.splice(i, 1);

        if (isArraySafe(copy)) {
          isSave = true;
          break;
        }
      }
    }

    return isSave ? acc + 1 : acc;
  }, 0);
};

const isArraySafe = (array: number[]) => {
  if (array[0] === array[1]) {
    return false;
  }
  const isIncreasing = array[0] < array[1];

  return array.every((value, index) => {
    if (index === array.length - 1) {
      return true;
    }
    const diff = value - array[index + 1];

    const increasing = isIncreasing && diff < 0 && diff >= -3;
    const decreasing = !isIncreasing && diff > 0 && diff <= 3;

    return increasing || decreasing;
  });
};
