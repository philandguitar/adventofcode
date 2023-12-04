import { day1 } from "./challenges/day1"
import { day2 } from "./challenges/day2";
import { day3 } from "./challenges/day3";
import { day4 } from "./challenges/day4";

const days = {
    1: day1,
    2: day2,
    3: day3,
    4: day4,
}

const run = (day: number) => {
    days[day]();
}

run(4);