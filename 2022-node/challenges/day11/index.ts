import { getFileContent, logResults } from "../../utils";

type Monkey = {
  items: number[];
  operation: (val: number) => number;
  testVal: number;
  successDest: number;
  failDest: number;
  inspectCount: number;
};

const getOperation = (line: string) => {
  const [operation, value] = line
    .replace("  Operation: new = old ", "")
    .split(" ");

  const getVal = (input: string, val: number) =>
    input === "old" ? val : Number.parseInt(input);

  switch (operation) {
    case "*":
      return (val: number) => val * getVal(value, val);
    case "/":
      return (val: number) => val / getVal(value, val);
    case "+":
      return (val: number) => val + getVal(value, val);
    case "-":
      return (val: number) => val - getVal(value, val);
    default:
      throw Error("Unexpected operation!");
  }
};

const parseMonkeys = (content: string[]): Monkey[] => {
  let monkeys: Monkey[] = [];
  for (let i = 0; i < content.length / 6; i++) {
    const monkey: Monkey = {
      items: content[i * 6 + 1]
        .replace("  Starting items: ", "")
        .split(", ")
        .map((item) => Number.parseInt(item)),
      operation: getOperation(content[i * 6 + 2]),
      testVal: Number.parseInt(
        content[i * 6 + 3].replace("  Test: divisible by ", "")
      ),
      successDest: Number.parseInt(
        content[i * 6 + 4].replace("    If true: throw to monkey ", "")
      ),
      failDest: Number.parseInt(
        content[i * 6 + 5].replace("    If false: throw to monkey ", "")
      ),
      inspectCount: 0,
    };
    monkeys.push(monkey);
  }
  return monkeys;
};

const executeRounds = (
  content: string[],
  rounds: number,
  isFirstRound: boolean
) => {
  const monkeys = parseMonkeys(content);
  const shortener = monkeys.reduce((prev, curr) => prev * curr.testVal, 1);

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey, monIndex) => {
      monkey.items.forEach((item) => {
        let newWorryLevel = monkey.operation(item) % shortener;
        if (isFirstRound) {
          newWorryLevel = Math.floor(Number(newWorryLevel) / 3);
        }

        if (newWorryLevel % monkey.testVal === 0) {
          monkeys[monkey.successDest].items.push(newWorryLevel);
        } else {
          monkeys[monkey.failDest].items.push(newWorryLevel);
        }
        monkeys[monIndex].items = [];
        monkey.inspectCount += 1;
      });
    });
  }

  return monkeys;
};

export const day11 = () => {
  const content = getFileContent("11").filter((line) => line != "");

  const res1 = executeRounds(content, 20, true)
    .sort((a, b) => b.inspectCount - a.inspectCount)
    .slice(0, 2)
    .reduce((prev, curr) => prev * curr.inspectCount, 1);

  const res2 = executeRounds(content, 10000, false)
    .sort((a, b) => b.inspectCount - a.inspectCount)
    .slice(0, 2)
    .reduce((prev, curr) => prev * curr.inspectCount, 1);

  logResults(11, res1, res2);
};
