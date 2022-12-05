import { getFileContent, logResults } from "../../utils";

const getDuplicatedItemPriority = (rucksack: string) => {
  const first = rucksack.substring(0, rucksack.length / 2);
  const second = rucksack.substring(rucksack.length / 2);

  for (let i = 0; i < first.length; i++) {
    if (second.includes(first.charAt(i))) {
      return priority[first.charAt(i)];
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
      return priority[char];
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

const priority: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};
