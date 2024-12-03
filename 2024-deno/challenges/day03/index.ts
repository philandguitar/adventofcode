import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const input = readFileByLine(import.meta.dirname).join();
  return parseMultiplications(input).reduce((acc, curr) => acc + curr, 0);
};

export const b = () => {
  const input = readFileByLine(import.meta.dirname).join();
  const [first, ...parts] = input.split("don't()");
  const toCheck = [first];
  parts.forEach((part) => {
    if (part.includes("do()")) {
      const [_, ...rest] = part.split("do()");
      toCheck.push(...rest);
    }
  });

  return parseMultiplications(toCheck.join()).reduce(
    (acc, curr) => acc + curr,
    0
  );
};

const parseMultiplications = (input: string) => {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = input.matchAll(regex);

  const result = [];
  for (const match of matches) {
    result.push([parseInt(match[1]), parseInt(match[2])]);
  }
  return result.map(([a, b]) => a * b);
};
