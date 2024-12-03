import { a, b } from "./challenges/day03/index.ts";
import { logResults } from "./utils/common.ts";

const t0 = performance.now();
logResults(a(), b());
const t1 = performance.now();
console.log("Needed time: ", (t1 - t0).toFixed(2), "ms");
