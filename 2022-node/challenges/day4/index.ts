import {
  getFileContent,
  logResults,
  stringArrayToNumberArray,
} from "../../utils";

export const day4 = () => {
  let wholeContainment = 0;
  let partiallyOverlap = 0;

  getFileContent("4").forEach((line) => {
    const [first, second] = line.split(",");
    const [min1, max1] = stringArrayToNumberArray(first.split("-"));
    const [min2, max2] = stringArrayToNumberArray(second.split("-"));

    if ((min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)) {
      wholeContainment++;
    }

    if (
      (min1 <= min2 && max1 >= min2) ||
      (min2 <= min1 && max2 >= min1) ||
      (max1 >= max2 && min1 <= max2) ||
      (max2 >= max1 && min2 <= max1)
    ) {
      partiallyOverlap++;
    }
  });

  logResults(4, wholeContainment, partiallyOverlap);
};
