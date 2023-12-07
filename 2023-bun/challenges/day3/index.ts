import { getFileMatrix } from "../../utils"

type Information = {
    value: string;
    isPartNumber: boolean;
    y: number,
    startX: number;
}

export const a = (): number => {
    const information = getNumberInformation();

    return information.reduce((prev, current) => {
        if (current.isPartNumber) return prev + Number.parseInt(current.value);
        return prev;
    }, 0);
}

export const b = (): number => {
    const fields = getFileMatrix(import.meta.dir);

    const information = getNumberInformation();
    let ratioSum = 0;

    fields.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if (value === "*") {
                const neighbors = getNeighborNumbers(colIndex, rowIndex, row.length, fields.length, fields);

                const fullNeighbors = new Map<string, string>();

                neighbors.forEach(neighbor => {

                    const info = information.find(item => item.y === neighbor[1] && item.startX <= neighbor[0] && item.startX + item.value.length >= neighbor[0]);
                    if (!info) {
                        console.log("Damn");
                        return 0;
                    }
                    fullNeighbors.set(`${info.y}/${info.startX}`, info.value);
                })

                if (fullNeighbors.size === 2) {
                    let ratio = 1;

                    fullNeighbors.forEach(item => {
                        ratio *= Number.parseInt(item);
                    })
                    ratioSum += ratio;
                }
            }
        })
    });

    return ratioSum;
}

const getNumberInformation = () => {
    const fields = getFileMatrix(import.meta.dir);

    const information: Information[] = [];

    fields.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            // not a number -> not relevant
            if (isNaN(Number.parseInt(value))) return;

            const hasSpecialCharacters = hasSymbolNeighbor(colIndex, rowIndex, row.length, fields.length, fields);

            // start of a new number
            if (colIndex === 0 || isNaN(Number.parseInt(fields[rowIndex][colIndex - 1]))) {
                information.unshift({
                    value,
                    isPartNumber: hasSpecialCharacters,
                    y: rowIndex,
                    startX: colIndex
                })
            } else {
                information[0].value += value;
                information[0].isPartNumber ||= hasSpecialCharacters;
            }
        })
    });

    return information;
}

const hasSymbolNeighbor = (colIndex: number, rowIndex: number, rowLength: number, colCount: number, fields: string[][]) => {
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            if (colIndex + x < 0 || colIndex + x > rowLength - 1 || rowIndex + y < 0 || rowIndex + y > colCount - 1) continue; // out of bounds

            const fieldValue = fields[rowIndex + y][colIndex + x];
            if (isNaN(Number.parseInt(fieldValue)) && fieldValue !== '.') {
                return true;
            }
        }
    }
    return false;
}

const getNeighborNumbers = (colIndex: number, rowIndex: number, rowLength: number, colCount: number, fields: string[][]) => {
    const numberCoordinates: number[][] = [];
    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            if (colIndex + x < 0 || colIndex + x > rowLength - 1 || rowIndex + y < 0 || rowIndex + y > colCount - 1) continue; // out of bounds

            const fieldValue = fields[rowIndex + y][colIndex + x];
            if (!isNaN(Number.parseInt(fieldValue))) {
                numberCoordinates.push([colIndex + x, rowIndex + y]);
            }
        }
    }
    return numberCoordinates;
}