import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);

  const { zeroes } = lines.reduce(
    (acc, line) => {
      let position = acc.position;
      const direction = line[0];
      const value = parseInt(line.slice(1), 10);

      if (direction === "L") {
        position = (position - value + 100) % 100;
      }
      if (direction === "R") {
        position = (position + value) % 100;
      }

      return { zeroes: acc.zeroes + (position === 0 ? 1 : 0), position };
    },
    { zeroes: 0, position: 50 }
  );

  return zeroes;
};

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);

  const { zeroes } = lines.reduce(
    (acc, line) => {
      let position = acc.position;
      let newZeroes = 0;
      const direction = line[0];
      const value = parseInt(line.slice(1), 10);

      if (direction === "L") {
        position = position - value;

        if (position === 0) newZeroes = 1;
        if (position < 0) {
          newZeroes = Math.abs(Math.floor(position / 100));
          if (acc.position === 0) newZeroes -= 1;
          if (Math.abs(position % 100) === 0) newZeroes += 1;
        }

        position = (position + 100 * (newZeroes + 1)) % 100;
      }
      if (direction === "R") {
        position = position + value;
        newZeroes = Math.floor(position / 100);
        position = position % 100;
      }

      return { zeroes: acc.zeroes + newZeroes, position };
    },
    { zeroes: 0, position: 50 }
  );

  return zeroes;
};
