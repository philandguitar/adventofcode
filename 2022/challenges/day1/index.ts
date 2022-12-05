import { getFileContent, logResults } from "../../utils";

const getHighestCaloryCount = (elveArray: number[]) => {
  const sortedArray = elveArray.sort((a, b) => b - a);
  logResults(
    1,
    sortedArray[0],
    sortedArray[0] + sortedArray[1] + sortedArray[2]
  );
};

const createElveArray = () => {
  const elveArray: number[] = [0];
  let elveIndex = 0;

  getFileContent("1").forEach((line) => {
    if (line === "") {
      elveArray.push(0);
      elveIndex++;
    } else {
      elveArray[elveIndex] += Number.parseInt(line);
    }
  });

  return elveArray;
};

export const day1 = () => {
  const elveArray = createElveArray();
  getHighestCaloryCount(elveArray);
};
