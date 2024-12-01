export const logResults = (
  resPt1?: string | number,
  resPt2?: string | number
) => {
  console.log(`~~ Results ~~`);
  if (resPt1) console.log("Part 1: ", resPt1);
  if (resPt2) console.log("Part 2: ", resPt2);
};
