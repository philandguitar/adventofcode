import { getFileContent, logResults } from "../../utils";

type ArrayContent = number | number[];

enum Result {
  RIGHT,
  FALSE,
  UNCLEAR,
}

const compareArrays = (left: ArrayContent[], right: ArrayContent[]): Result => {
  const limit = Math.min(left.length, right.length);
  for (let i = 0; i < limit; i++) {
    // both are numbers
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      // same number => to the next item
      if (left[i] === right[i]) {
        // next item if there are more
        if (limit > i + 1) {
          continue;
        }
        // if one of them is bigger
        if (left.length > right.length) return Result.FALSE;
        if (left.length < right.length) return Result.RIGHT;

        //else unclear
        return Result.UNCLEAR;
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

    // at least one array is empty
    if (Math.min(newLeft.length, newRight.length) === 0) {
      // both are empty, but there are more items in the parent
      if (newLeft.length == newRight.length) {
        if (limit > i + 1) {
          continue;
        }

        if (left.length > right.length) return Result.FALSE;
        if (left.length < right.length) return Result.RIGHT;
        return Result.UNCLEAR;
      }

      return newLeft.length < newRight.length ? Result.RIGHT : Result.FALSE;
    }

    const compareNested = compareArrays(newLeft, newRight);

    if (compareNested === Result.UNCLEAR) continue;
    return compareNested;
  }

  if (left.length > right.length) return Result.FALSE;
  if (left.length < right.length) return Result.RIGHT;
  return Result.UNCLEAR;
};

export const day13 = () => {
  const content = getFileContent("13").filter((line) => line != "");

  const contentv1 = content.map((line) => JSON.parse(line));

  let res1 = 0;

  for (let i = 0; i < content.length; i = i + 2) {
    const isCorrect = compareArrays(contentv1[i], contentv1[i + 1]);

    if (isCorrect == Result.RIGHT) {
      res1 += i / 2 + 1;
    }
  }

  const contentv2 = contentv1;

  const k1 = [[2]];
  const k2 = [[6]];
  contentv2.push(k1);
  contentv2.push(k2);

  const sorted = contentv2.sort((a, b) => {
    const res = compareArrays(a, b);

    if (res == Result.RIGHT) {
      return -1;
    }
    if (res == Result.FALSE) {
      return 1;
    }
    return 0;
  });

  const key1 = sorted.findIndex((k) => k === k1) + 1;
  const key2 = sorted.findIndex((k) => k === k2) + 1;

  const res2 = key1 * key2;

  logResults(13, res1, res2);
};
