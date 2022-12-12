import { charToValue, getFileContent, logResults } from "../../utils";

const getDuplicatedItemPriority = (rucksack: string) => {
  const first = rucksack.substring(0, rucksack.length / 2);
  const second = rucksack.substring(rucksack.length / 2);

  for (let i = 0; i < first.length; i++) {
    if (second.includes(first.charAt(i))) {
      return charToValue(first.charAt(i));
    }
  }
  return 0;
};

const getGroupBadgePriority = (a: string, b: string, c: string) => {
  let iteratorBag = a;
  if (b.length < iteratorBag.length) iteratorBag = b;
  if (c.length < iteratorBag.length) iteratorBag = c;

  for (let i = 0; i < iteratorBag.length; i++) {
    const char = iteratorBag.charAt(i);
    if (a.includes(char) && b.includes(char) && c.includes(char)) {
      return charToValue(char);
    }
  }
  return 0;
};

export const day3 = () => {
  const content = getFileContent("3");

  const res1 = content.reduce(
    (prev, current) => prev + getDuplicatedItemPriority(current),
    0
  );

  let res2 = 0;

  for (let i = 0; i < content.length; i += 3) {
    res2 += getGroupBadgePriority(content[i], content[i + 1], content[i + 2]);
  }

  logResults(3, res1, res2);
};
