import { getFileContent } from "../../utils"

export const a = (): number => {
    const cardInfos = getCardInfos();

    return cardInfos.reduce<number>((prev, current) => {
        if (current.winCount === 0) return prev;
        return prev + Math.pow(2, current.winCount - 1)
    }, 0);
}

export const b = (): number => {
    const cardInfos = getCardInfos();

    cardInfos.forEach((card, currentIndex) => {
        if (card.winCount === 0) {
            return;
        }

        for (let i = 1; i <= card.winCount; i++) {
            if (currentIndex + i < cardInfos.length) {
                cardInfos[currentIndex + i].cardCount += card.cardCount;
            }
        }
    })

    return cardInfos.reduce((prev, current) => prev + current.cardCount, 0);
}

const getCardInfos = () => {
    const lines = getFileContent(import.meta.dir);

    return lines.map(line => {
        const [_, card] = line.replaceAll("  ", " ").split(": ");
        const [winning, owned] = card.split(" | ");

        const winArray = winning.split(" ");
        const ownedArray = owned.split(" ");
        const wonArray = ownedArray.filter(num => winArray.includes(num));

        return {
            winCount: wonArray.length,
            cardCount: 1
        }
    })
}