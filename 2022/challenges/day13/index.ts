import { getFileContent, logResults } from "../../utils";

type ArrayContent = number | number[];

enum Result {
  RIGHT,
  FALSE,
  UNCLEAR,
}

const compareArrays = (
  left: ArrayContent[],
  right: ArrayContent[],
  isThereMore: boolean
): Result => {
  console.log(left, "----", right);
  console.log();

  const limit = Math.min(left.length, right.length);
  for (let i = 0; i < limit; i++) {
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      // console.log("Both numbers");

      if (left[i] === right[i]) {
        continue;
      }

      if (left[i] > right[i])
        console.log(
          "Validate Correctness: ",
          left[i],
          right[i],
          left[i] < right[i]
        );

      return left[i] < right[i] ? Result.RIGHT : Result.FALSE;
    }

    const newLeft = Array.isArray(left[i])
      ? (left[i] as ArrayContent[])
      : [left[i]];
    const newRight = Array.isArray(right[i])
      ? (right[i] as ArrayContent[])
      : [right[i]];

    if (Math.min(newLeft.length, newRight.length) === 0) {
      console.log("one empty");

      if (newLeft.length == newRight.length && limit > i + 1) {
        console.log("both empty but not end of the world");

        continue;
      }
      if (isThereMore) {
        console.log("there is more");

        return Result.UNCLEAR;
      }

      if (!(newLeft.length < newRight.length)) {
        console.log(
          "One, empty, left smaller",
          newLeft,
          " ..... ",
          newRight,
          newLeft.length < newRight.length
        );
      }

      return newLeft.length < newRight.length ? Result.RIGHT : Result.FALSE;
    }

    console.log("Next: ", newLeft, "+++++++++++", newRight);

    // // console.log("New Left: ", newLeft, "New Right: ", newRight);
    console.log("Limit break: ", i + 1, limit);

    const compareNested = compareArrays(newLeft, newRight, i + 1 < limit);
    // console.log("Nested: ", Result[compareNested]);

    if (compareNested === Result.UNCLEAR) continue;
    return compareNested;
  }
  if (isThereMore) {
    return Result.UNCLEAR;
  }

  console.log("Out of length: ", left, right);

  return left.length < right.length ? Result.RIGHT : Result.FALSE;
};

export const day13 = () => {
  const content = getFileContent("13")
    .filter((line) => line != "")
    .map((line) => JSON.parse(line));

  let res1 = 0;

  for (let i = 0; i < content.length; i = i + 2) {
    const isCorrect = compareArrays(content[i], content[i + 1], false);
    // // console.log("Pair: ", i / 2 + 1, Result[isCorrect]);

    if (isCorrect == Result.RIGHT) {
      res1 += i / 2 + 1;

      console.log("Right:", i / 2 + 1);
      console.log("Zwischenstand: ", res1);
    }

    if (isCorrect == Result.FALSE) {
      console.log("False:", i / 2 + 1);
    }
    if (isCorrect == Result.UNCLEAR) {
      console.log(i / 2, "WHAT THE HELL?!");
    }
  }

  logResults(13, res1);
};
