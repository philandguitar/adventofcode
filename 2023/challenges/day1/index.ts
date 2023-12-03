import { getFileContent, logResults } from "../../utils"

const DAY = 1;

const a = (): number => {
    const lines = getFileContent(DAY);
    const res = lines.map(line => getFirstAndLast(line));
    return addResults(res)
}


const b = (): number => {
    const lines = getFileContent(DAY);
    const res = lines.map(line => getFirstAndLast(line, true));
    return addResults(res)
}

export const day1 = () => logResults(DAY, a(), b())

const addResults = (res: string[]) => res.reduce((prev, current) => prev + Number.parseInt(current!), 0);

const getFirstAndLast = (line: string, doReplacement: boolean = false) => {
    const lineArray = doReplacement ? replaceTextNumbersWithDigits(line).split("") : line.split("");
    const firstNumber = lineArray.find(element => Number.parseInt(element) > 0);
    const lastNumber = lineArray.reverse().find(element => Number.parseInt(element) > 0);
    return firstNumber?.toString().concat(lastNumber?.toString() ?? "");
}

const replaceTextNumbersWithDigits = (input: string) => {
    return input
        .replaceAll("one", "o1e")
        .replaceAll("two", "t2o")
        .replaceAll("three", "th3ee")
        .replaceAll("four", "f4ur")
        .replaceAll("five", "f5ve")
        .replaceAll("six", "s6x")
        .replaceAll("seven", "se7en")
        .replaceAll("eight", "ei8ht")
        .replaceAll("nine", "n9ne")
}
