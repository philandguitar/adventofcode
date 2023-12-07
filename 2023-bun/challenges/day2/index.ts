import { getFileContent } from "../../utils"

export const a = (): number => {
    const lines = getFileContent(import.meta.dir);

    const data = lines.reduce((prev, current) => {
        const vals = getGameData(current);

        if (vals.blue <= 14 && vals.green <= 13 && vals.red <= 12) {
            return prev + vals.gameId;
        }

        return prev;
    }, 0)

    return data;
}

export const b = (): number => {
    const lines = getFileContent(import.meta.dir);

    const data = lines.reduce((prev, current) => {
        const vals = getGameData(current);
        return prev + vals.blue * vals.green * vals.red;
    }, 0)

    return data;
}

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
        const colorKey = color as keyof typeof data;
        data[colorKey] = Math.max(Number.parseInt(amount), data[colorKey]);
    });

    return {
        gameId: gameId,
        ...data
    }
}
