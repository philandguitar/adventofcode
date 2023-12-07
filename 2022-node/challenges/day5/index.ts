import {
  getFileContent,
  logResults,
  stringArrayToNumberArray,
} from "../../utils";

const getInitialStack = () => [
  ["V", "C", "D", "R", "Z", "G", "B", "W"],
  ["G", "W", "F", "C", "B", "S", "T", "V"],
  ["C", "B", "S", "N", "W"],
  ["Q", "G", "M", "N", "J", "V", "C", "P"],
  ["T", "S", "L", "F", "D", "H", "B"],
  ["J", "V", "T", "W", "M", "N"],
  ["P", "F", "L", "C", "S", "T", "G"],
  ["B", "D", "Z"],
  ["M", "N", "Z", "W"],
];

export const day5 = () => {
  let part1Stack = getInitialStack();
  let part2Stack = getInitialStack();

  getFileContent("5").forEach((command) => {
    const easyCommand = command
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",");

    const [containerCount, startStack, destStack] = stringArrayToNumberArray(
      easyCommand.split(",")
    );

    // part 1
    for (let i = 0; i < containerCount; i++) {
      const container = part1Stack[startStack - 1].pop();
      if (container == null) {
        throw Error("No container found!");
      }
      part1Stack[destStack - 1].push(container);
    }

    // part2
    const startStackContainers = part2Stack[startStack - 1];
    const destStackContainers = part2Stack[destStack - 1];

    part2Stack[startStack - 1] = startStackContainers.slice(
      0,
      startStackContainers.length - containerCount
    );
    part2Stack[destStack - 1] = [
      ...destStackContainers,
      ...startStackContainers.slice(
        startStackContainers.length - containerCount
      ),
    ];
  });

  let res1 = part1Stack
    .map((intStack) => intStack[intStack.length - 1] ?? "")
    .join("");

  let res2 = part2Stack
    .map((intStack) => intStack[intStack.length - 1] ?? "")
    .join("");

  logResults(5, res1, res2);
};
