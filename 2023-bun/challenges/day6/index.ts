import { getFileContent } from "../../utils"

export const a = (): number => {
    return getWins();
}

export const b = (): number => {
    return getWins("");
}

const getValues = (input: string, spacer: string = " ") => {
    const array = input.replace("Time:", "").replace("Distance:", "").replace(/\s+/g, spacer).trim().split(" ")
    return array.map(num => Number.parseInt(num.trim()));
}

const getWins = (spacer: string = " ") => {
    const [timeLine, distanceLine] = getFileContent(import.meta.dir);
    const times = getValues(timeLine, spacer);
    const distances = getValues(distanceLine, spacer);

    return times.reduce<number>((prev, time, index) => {
        let wins = 0;
        for (let hold = 0; hold < time; hold++) {
            if (hold * (time - hold) > distances[index]) {
                wins++;
            }
        }
        return prev * wins
    }, 1)
}