import { getFileContent, getFileMatrix } from "../../utils";

type Location = { x: number; y: number };

const getStartLocation = (input: string[][]): Location => {
    let x = -1;
    const y = input.findIndex(line => {
        const index = line.findIndex(col => col === "S");
        if (index != -1) {
            x = index;
            return true;
        }
        return false;
    });

    return { x, y };
}

const moveOnPipe = (matrix: string[][], prevPos: Location, newPos: Location, path: Location[]): Location[] => {
    if (newPos.y > matrix.length || newPos.y < 0 || newPos.x < 0 || newPos.x > matrix[newPos.y].length) return [];
    const newSymbol = matrix[newPos.y][newPos.x];

    const nextPosition = { ...newPos };
    switch (newSymbol) {
        case "S": return [...path, newPos];
        case "|":
            nextPosition.y = prevPos.y > newPos.y ? nextPosition.y - 1 : nextPosition.y + 1;
            break;
        case "-":
            nextPosition.x = prevPos.x > newPos.x ? nextPosition.x - 1 : nextPosition.x + 1;
            break;
        case "L":
            if (prevPos.y === newPos.y) {
                nextPosition.y = nextPosition.y - 1;
            } else {
                nextPosition.x = nextPosition.x + 1;
            }
            break;
        case "J":
            if (prevPos.y === newPos.y) {
                nextPosition.y = nextPosition.y - 1;
            } else {
                nextPosition.x = nextPosition.x - 1;
            }
            break;
        case "7":
            if (prevPos.y === newPos.y) {
                nextPosition.y = nextPosition.y + 1;
            } else {
                nextPosition.x = nextPosition.x - 1;
            }
            break;
        case "F":
            if (prevPos.y === newPos.y) {
                nextPosition.y = nextPosition.y + 1;
            } else {
                nextPosition.x = nextPosition.x + 1;
            }
            break;
        case ".":
        default:
            return [];
    }

    return moveOnPipe(matrix, newPos, nextPosition, [...path, newPos]);
}

const isOutOfBounds = (location: Location, height: number, width: number) => location.x < 0 || location.y < 0 || location.y >= height || location.x > width

const canReachOutside = (matrix: string[][], location: Location, height: number, width: number): void => {
    const itemsToCheck: Location[] = [location];

    while (itemsToCheck.length > 0) {
        const current = itemsToCheck[0];
        itemsToCheck.shift();
        if (isOutOfBounds(current, height, width)) continue;

        const value = matrix[current.y][current.x];

        if (value === "#" || value === "X") continue;

        const neighbors: Location[] = [{ x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }];

        const canNeighborsReachOutside = neighbors.reduce((prev, current) => {
            return prev || isOutOfBounds(current, height, width) || matrix[current.y][current.x] === "#"
        }, false);
        if (canNeighborsReachOutside) matrix[current.y][current.x] = "#";
        else {
            continue;
        }
        neighbors.forEach(neighbor => itemsToCheck.push(neighbor));
    }
}

const markPath = (matrix: string[][], path: Location[]) => {
    matrix.forEach((line, y) => {
        line.forEach((field, x) => {
            if (path.find(item => item.x === x && item.y === y)) {
                matrix[y][x] = "X"
            }
            if (field === '.') return;
            matrix[y][x] = "_"
        })
    })
    path.forEach((location) => {
        matrix[location.y][location.x] = "X"
    });

    return matrix;
}

const getDistanceArrayFromStart = (path: Location[]) => {
    return path.map((_, index) => {
        const fromStart = index;
        const fromEnd = (path.length - 1) - index;
        return Math.min(fromStart, fromEnd);
    })
}

const checkGround = (matrix: string[][], circle: Location[]) => {
    // matrix[0].forEach((_, index) => {
    //     canReachOutside(matrix, { x: index, y: 0 }, matrix.length, matrix[0].length);
    //     canReachOutside(matrix, { x: index, y: matrix.length - 1 }, matrix.length, matrix[0].length);
    // });
    // matrix.forEach((_, index) => {
    //     canReachOutside(matrix, { y: index, x: 0 }, matrix.length, matrix[0].length);
    //     canReachOutside(matrix, { y: index, x: matrix[0].length - 1 }, matrix.length, matrix[0].length);
    // });
    circle.forEach(location => {
        // check outer side element
    })
    visualize(matrix);
    return matrix.reduce((count, line) => count + line.reduce((prev, current) => current === "." ? prev + 1 : prev, 0), 0);
}

const visualize = (matrix: string[][]) => matrix.forEach(line => console.log(line.join("")));

export const a = (): number => {
    const map = getFileMatrix(import.meta.dir);
    const start = getStartLocation(map);
    const directions: Location[] = [{ x: start.x + 1, y: start.y }, { x: start.x - 1, y: start.y }, { x: start.x, y: start.y + 1 }, { x: start.x, y: start.y - 1 }]

    const paths = directions.map(direction => moveOnPipe(map, start, direction, [start]));
    const circle = paths.find((path, index) => paths.find((anotherPath, anotherIndex) => path.length === anotherPath.length && index !== anotherIndex))!;

    return Math.max(...getDistanceArrayFromStart(circle));
}

export const b = (): number => {
    const map = getFileMatrix(import.meta.dir, true);
    const start = getStartLocation(map);
    const directions: Location[] = [{ x: start.x + 1, y: start.y }, { x: start.x - 1, y: start.y }, { x: start.x, y: start.y + 1 }, { x: start.x, y: start.y - 1 }]

    const paths = directions.map(direction => moveOnPipe(map, start, direction, [start]));
    const circle = paths.find((path, index) => paths.find((anotherPath, anotherIndex) => path.length === anotherPath.length && index !== anotherIndex))!;

    const markedMatrix = markPath(map, circle);

    const count = checkGround(markedMatrix, circle);

    return count;
}