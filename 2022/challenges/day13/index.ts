import { getFileContent, logResults } from "../../utils";

type ArrayContent = number | number[];

enum Result {
  RIGHT,
  FALSE,
  UNCLEAR,
}

const compareArrays = (left: ArrayContent[], right: ArrayContent[]): Result => {
  // console.log(left, "----", right);
  // console.log();

  const limit = Math.min(left.length, right.length);
  for (let i = 0; i < limit; i++) {
    // both are numbers
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      // same number => to the next item
      if (left[i] === right[i]) {
        continue;
      }

      // check correct size
      return left[i] < right[i] ? Result.RIGHT : Result.FALSE;
    }

    const newLeft = Array.isArray(left[i])
      ? (left[i] as ArrayContent[])
      : [left[i]];
    const newRight = Array.isArray(right[i])
      ? (right[i] as ArrayContent[])
      : [right[i]];

    // one array is empty
    if (Math.min(newLeft.length, newRight.length) === 0) {
      // both are empty, but there are more items in the parent
      if (newLeft.length == newRight.length) {
        if (limit > i + 1) {
          continue;
        }
        return Result.UNCLEAR;
      }

      return newLeft.length < newRight.length ? Result.RIGHT : Result.FALSE;
    }

    const compareNested = compareArrays(newLeft, newRight);
    // console.log("Nested: ", Result[compareNested]);

    if (compareNested === Result.UNCLEAR) continue;
    return compareNested;
  }

  return left.length < right.length ? Result.RIGHT : Result.FALSE;
};

export const day13 = () => {
  const content = getFileContent("13").filter((line) => line != "");

  const contentv1 = content.map((line) => JSON.parse(line));

  let res1 = 0;

  for (let i = 0; i < content.length; i = i + 2) {
    const isCorrect = compareArrays(contentv1[i], contentv1[i + 1]);
    // // console.log("Pair: ", i / 2 + 1, Result[isCorrect]);

    if (isCorrect == Result.RIGHT) {
      res1 += i / 2 + 1;

      // console.log("Right:", i / 2 + 1);
      // console.log("Zwischenstand: ", res1);
    }

    if (isCorrect == Result.FALSE) {
      // console.log("False:", i / 2 + 1);
    }
    if (isCorrect == Result.UNCLEAR) {
      console.log(i / 2, "WHAT THE HELL?!");
    }
  }

  const contentv2 = contentv1;

  const k1 = [[2]];
  const k2 = [[6]];
  contentv2.push(k1);
  contentv2.push(k2);

  const sorted = contentv2.sort((a, b) =>
    compareArrays(a, b) == Result.RIGHT ? -1 : 1
  );

  sorted.forEach((a, i) => console.log(i, ": ", JSON.stringify(a)));

  // let part2 = content.map((input) => {
  //   if (!/\d/.test(input)) {
  //     return "0";
  //   }
  //   const tmp = input.replace(/\[/g, "").replace(/\]/g, "").replace(/\,/g, "");
  //   return tmp;
  // });

  // const maxLength = part2.reduce(
  //   (prev, curr) => Math.min(curr.length, prev),
  //   1000
  // );

  // // part2.forEach((a) => console.log(a));

  // part2.push("2");
  // part2.push("6");

  // part2 = part2.sort((a, b) => (compareArrays(a, b) == Result.RIGHT ? -1 : 1));

  // part2.forEach((a) => console.log(a));

  const key1 = sorted.findIndex((k) => k === k1) + 1;
  const key2 = sorted.findIndex((k) => k === k2) + 1;

  const res2 = key1 * key2;

  logResults(13, res1, res2);
};
