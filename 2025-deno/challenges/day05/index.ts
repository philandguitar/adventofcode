import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);

  const separationIndex = lines.findIndex((line) => line === "");

  const ranges = lines.slice(0, separationIndex).map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

  let freshItems = 0;

  lines.slice(separationIndex + 1).forEach((item) => {
    const itemNumber = Number(item);

    const foundRange = ranges.find(({ start, end }) => {
      if (itemNumber >= start && itemNumber <= end) {
        return true;
      }
      return false;
    });

    if (foundRange != null) {
      freshItems++;
    }
  });

  return freshItems;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname, "example");

  const separationIndex = lines.findIndex((line) => line === "");

  const ranges = lines.slice(0, separationIndex).map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  }).sort((a, b) => a.start - b.start);

  while 

  return 0;
};
