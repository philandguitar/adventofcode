import { readFileByLine } from "../../utils/file.ts";

export const a = () => {
  const sections = readFileByLine(import.meta.dirname)[0]
    .split(",")
    .map((n) => {
      const [start, end] = n.split("-").map((s) => parseInt(s, 10));
      return { start, end };
    });

  const falseIds = sections.reduce<number[]>((acc, section) => {
    for (let val = section.start; val <= section.end; val++) {
      const valString = val.toString();
      if (valString.length % 2 === 0) {
        const left = valString.substring(0, valString.length / 2);
        const right = valString.substring(valString.length / 2);
        if (left === right) {
          acc.push(val);
        }
      }
    }
    return acc;
  }, []);

  return falseIds.reduce((acc, curr) => acc + curr, 0);
};

export const b = () => {
  const sections = readFileByLine(import.meta.dirname)[0]
    .split(",")
    .map((n) => {
      const [start, end] = n.split("-").map((s) => parseInt(s, 10));
      return { start, end };
    });

  const falseIds = sections.reduce<number[]>((acc, section) => {
    for (let val = section.start; val <= section.end; val++) {
      const valString = val.toString();

      const maxSubstringLength = Math.floor(valString.length / 2);

      for (
        let substringLength = 1;
        substringLength <= maxSubstringLength;
        substringLength++
      ) {
        if (valString.length % substringLength !== 0) continue;

        const substrings: string[] = [];

        for (
          let substringOffset = 0;
          substringOffset < Math.floor(valString.length / substringLength);
          substringOffset++
        ) {
          substrings.push(
            valString.substring(
              substringOffset * substringLength,
              (substringOffset + 1) * substringLength
            )
          );
        }

        if (substrings.every((s) => s === substrings[0])) {
          acc.push(val);
          break;
        }
      }
    }
    return acc;
  }, []);

  return falseIds.reduce((acc, curr) => acc + curr, 0);
};
