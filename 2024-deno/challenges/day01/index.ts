import { readFileByLine } from "../../utils/file.ts";

const parseFile = () => {
  const lines = readFileByLine(import.meta.dirname);
  const listA: number[] = [];
  const listB: number[] = [];

  lines.forEach((line) => {
    const [a, b] = line.split("   ");
    listA.push(parseInt(a));
    listB.push(parseInt(b));
  });

  return { listA, listB };
};

export const a = () => {
  const { listA, listB } = parseFile();

  listA.sort();
  listB.sort();

  let result = 0;
  listA.forEach((a, index) => {
    result += Math.abs(a - listB[index]);
  });

  return result;
};

export const b = () => {
  const { listA, listB } = parseFile();

  let result = 0;
  listA.forEach((a) => {
    result += a * listB.filter((b) => b === a).length;
  });

  return result;
};
