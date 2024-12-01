import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);
  const listA: number[] = [];
  const listB: number[] = [];

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    listA.push(parseInt(a));
    listB.push(parseInt(b));
  });

  listA.sort();
  listB.sort();

  let result = 0;
  listA.forEach((a, index) => {
    result += Math.abs(a - listB[index]);
  });

  return result;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);
  const listA: number[] = [];
  const listB: number[] = [];

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    listA.push(parseInt(a));
    listB.push(parseInt(b));
  });

  let result = 0;
  listA.forEach((a) => {
    result += a * listB.filter((b) => b === a).length;
  });

  return result;
};
