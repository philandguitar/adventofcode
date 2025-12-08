import { readFileByLine } from "../../utils/file.ts";

const getJoltage = (numbers: number[], digits: number): number => {
  let joltage = "";
  let furthestIndex = 0;
  for (let digit = 0; digit < digits; digit++) {
    const hightestIndex = numbers.length - (digits - digit - 1);

    const biggestPossibleNumber = Math.max(
      ...numbers.slice(furthestIndex, hightestIndex)
    );

    joltage += biggestPossibleNumber.toString();
    furthestIndex =
      numbers.slice(furthestIndex).indexOf(biggestPossibleNumber) +
      1 +
      furthestIndex;
  }

  return parseInt(joltage, 10);
};

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);

  const totalJoltage = lines.reduce<number>((acc, line) => {
    const numbers = line.split("").map((n) => parseInt(n, 10));
    const joltage = getJoltage(numbers, 2);
    return acc + joltage;
  }, 0);

  return totalJoltage;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);
  const totalJoltage = lines.reduce<number>((acc, line) => {
    const numbers = line.split("").map((n) => parseInt(n, 10));
    const joltage = getJoltage(numbers, 12);

    return acc + joltage;
  }, 0);

  return totalJoltage;
};
