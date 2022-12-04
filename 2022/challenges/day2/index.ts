import { getFileContent } from "../../utils";

const moveToValue = (move: string) => {
  switch (move) {
    case "A":
    case "X":
      return 1;
    case "B":
    case "Y":
      return 2;
    case "C":
    case "Z":
      return 3;
  }
};

const calculateRoundScore = (round: string) => {
  const [opponent, self] = round
    .split(" ")
    .map((move) => moveToValue(move) as number);
  let score = 0;
  if (opponent === self) {
    score += 3;
  } else if (self === opponent + 1 || (self === 1 && opponent === 3)) {
    score += 6;
  }

  return score + self;
};

const alterRoundToGetOwnMove = (round: string) => {
  const [opponent, result] = round.split(" ");
  switch (result) {
    case "X":
      return `${opponent} ${getLoserMove(opponent)}`;
    case "Y":
      return `${opponent} ${opponent}`;
    case "Z":
      return `${opponent} ${getWinnerMove(opponent)}`;
    default:
      throw Error();
  }
};

const getWinnerMove = (opponent: string) => {
  switch (opponent) {
    case "A":
      return "Y";
    case "B":
      return "Z";
    case "C":
      return "X";
  }
};

const getLoserMove = (opponent: string) => {
  switch (opponent) {
    case "A":
      return "Z";
    case "B":
      return "X";
    case "C":
      return "Y";
  }
};

export const day2 = () => {
  const content = getFileContent("2");
  const res1 = content.reduce(
    (prev, current) => prev + calculateRoundScore(current),
    0
  );
  console.log("Part 1: ", res1);

  const res2 = content.reduce(
    (prev, current) =>
      prev + calculateRoundScore(alterRoundToGetOwnMove(current)),
    0
  );
  console.log("Part 2: ", res2);
};
