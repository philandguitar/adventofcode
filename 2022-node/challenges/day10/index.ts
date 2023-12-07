import { getFileContent, logResults } from "../../utils";

enum Action {
  NOOP = "noop",
  ADDX = "addx",
}

export const day10 = () => {
  const commands = getFileContent("10");

  const savePoints: number[] = [];
  let index = 0;
  let currentVal = 1;
  const image: string[] = [];

  commands.forEach((command) => {
    const [action, val] = command.split(" ");
    switch (action) {
      case Action.NOOP: {
        image.push(Math.abs(currentVal - (index % 40)) <= 1 ? "#" : ".");
        index++;
        if (index % 40 === 20) {
          savePoints.push(currentVal * index);
        }

        break;
      }
      case Action.ADDX: {
        for (let i = 0; i < 2; i++) {
          image.push(Math.abs(currentVal - (index % 40)) <= 1 ? "#" : ".");
          index++;
          if (index % 40 === 20) {
            savePoints.push(currentVal * index);
          }
        }
        currentVal += Number.parseInt(val);
      }
    }
  });

  const res1 = savePoints.reduce((prev, curr) => prev + curr, 0);
  logResults(10, res1);

  console.log("Part2:");
  for (let i = 0; i < 6; i++) {
    console.log(image.slice(i * 40, (i + 1) * 40).join(""));
  }
};
