import { getFileContent } from "../../utils";

const getNextInSequence = (array: number[]): number => {
    const distances = array.slice(1).map((item, index) => item - array[index]);

    if (array.filter(item => item !== 0).length === 0) {
        return 0;
    }

    return array[array.length - 1] + getNextInSequence(distances);
}

export const a = (): number => {
    const lines = getFileContent(import.meta.dir);
    const arrays = lines.map(line => line.split(" ").map(num => Number.parseInt(num)));

    const sequences = arrays.map(getNextInSequence);

    return sequences.reduce((prev, current) => prev + current, 0);
}

export const b = (): number => {
    const lines = getFileContent(import.meta.dir);
    const arrays = lines.map(line => line.split(" ").map(num => Number.parseInt(num)));

    const sequences = arrays.map(sequence => getNextInSequence(sequence.reverse()));

    return sequences.reduce((prev, current) => prev + current, 0);
}