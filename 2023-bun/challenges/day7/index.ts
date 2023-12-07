import { getFileContent, logResults } from "../../utils"

enum HandValue {
    HIGHEST_CARD,
    ONE_PAIR,
    TWO_PAIR,
    THREE_OF_KIND,
    FULL_HOUSE,
    FOUR_OF_KIND,
    FIVE_OF_KIND
}

type HandData = {
    bid: number;
    handValue: HandValue,
    hand: number[]
}

export const a = (): number => {
    const handData = getHandData();
    return getLeaderboardScore(handData);
}

export const b = (): number => {
    const handData = getHandData();
    return getLeaderboardScore(reevaluateHands(handData), true);
}

const mapCardToValue = (card: string): number => {
    const intCard = Number.parseInt(card);
    if (!isNaN(intCard)) {
        return intCard;
    }

    switch (card) {
        case "T": return 10;
        case "J": return 1;
        case "Q": return 12;
        case "K": return 13;
        case "A": return 14;
    }

    return 0;
}

const getHandData = (): HandData[] => {
    const lines = getFileContent(import.meta.dir);
    return lines.map(line => {
        const [hand, bid] = line.trim().split(" ");

        const cards = hand.split("").map(mapCardToValue);
        const handValue = getHandValue(cards, bid);

        const data = {
            bid: Number.parseInt(bid),
            hand: cards,
            handValue,
        }

        return data;
    })
}

const getHandValue = (hand: number[], bid: string): HandValue => {
    const handGroup = hand.reduce<Record<number, number>>((prev, current) => {
        if (current in prev) {
            prev[current] += 1;
        } else {
            prev[current] = 1;
        }
        return prev;
    }, {});

    const sortedHand = Object.keys(handGroup)
        .map(key => ({ cardValue: Number.parseInt(key), cardAmount: handGroup[Number.parseInt(key)] }))
        .sort((a, b) => b.cardAmount - a.cardAmount)

    switch (sortedHand[0].cardAmount) {
        case 5: return HandValue.FIVE_OF_KIND;
        case 4: return HandValue.FOUR_OF_KIND
        case 3: {
            if (sortedHand[1].cardAmount === 2) {
                return HandValue.FULL_HOUSE;
            }
            return HandValue.THREE_OF_KIND;
        }
        case 2:
            if (sortedHand[1].cardAmount === 2) {
                return HandValue.TWO_PAIR;
            }
            return HandValue.ONE_PAIR;
        default:
            return HandValue.HIGHEST_CARD;
    }
}

const getLeaderboardScore = (handData: HandData[], log: boolean = false) => {
    const leaderboard = handData.sort((a, b) => {
        if (a.handValue === b.handValue) {
            for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
                if (a.hand[cardIndex] !== b.hand[cardIndex]) {
                    return a.hand[cardIndex] - b.hand[cardIndex];
                }
            }
        }
        return a.handValue - b.handValue;
    })

    return leaderboard.reduce<number>((prev, current, index) => prev + current.bid * (index + 1), 0)
}

const reevaluateHands = (handData: HandData[]) => {
    return handData.map(hand => {
        if (!hand.hand.includes(1)) return hand;

        const jCount = hand.hand.filter(card => card === 1).length;

        switch (hand.handValue) {
            case HandValue.FIVE_OF_KIND: return hand;
            case HandValue.FOUR_OF_KIND: return { ...hand, handValue: HandValue.FIVE_OF_KIND };
            case HandValue.FULL_HOUSE: return { ...hand, handValue: HandValue.FIVE_OF_KIND };
            case HandValue.THREE_OF_KIND: return { ...hand, handValue: HandValue.FOUR_OF_KIND }
            case HandValue.TWO_PAIR:
                if (jCount === 2) return { ...hand, handValue: HandValue.FOUR_OF_KIND };
                return { ...hand, handValue: HandValue.FULL_HOUSE };
            case HandValue.ONE_PAIR: return { ...hand, handValue: HandValue.THREE_OF_KIND };
            case HandValue.HIGHEST_CARD: return { ...hand, handValue: HandValue.ONE_PAIR };
        }
    })
}