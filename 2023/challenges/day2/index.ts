import { getFileContent, logResults } from "../../utils"

const DAY = 2;

const a = (): number => {
    const lines = getFileContent(DAY);

    const data = lines.reduce((prev, current) => {
        const vals = getGameData(current);

        if (vals.blue <= 14 && vals.green <= 13 && vals.red <= 12) {
            return prev + vals.gameId;
        }

        return prev;
    }, 0)

    return data;
}


const b = (): number => {
    const lines = getFileContent(DAY);

    const data = lines.reduce((prev, current) => {
        const vals = getGameData(current);
        return prev + vals.blue * vals.green * vals.red;
    }, 0)

    return data;
}

export const day2 = () => logResults(DAY, a(), b())

const getGameData = (line: string) => {
    const [game, subsets] = line.split(":");
    const gameId = Number.parseInt(game.replace("Game ", ""));

    const data = {
        red: 0,
        green: 0,
        blue: 0
    }

    const colors = subsets.split("; ").flatMap(subset => subset.split(", "));

    colors.forEach(item => {
        const [amount, color] = item.trim().split(" ");
        data[color] = Math.max(Number.parseInt(amount), data[color]);
    });

    return {
        gameId: gameId,
        ...data
    }
}
