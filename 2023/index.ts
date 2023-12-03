import { day1 } from "./challenges/day1"
import { day2 } from "./challenges/day2";

const days = {
    1: day1,
    2: day2
}

const run = (day: number) => {
    days[day]();
}

run(2);