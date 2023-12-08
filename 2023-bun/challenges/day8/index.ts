import { getFileContent } from "../../utils";

type Node = { left: string, right: string };
type Graph = Record<string, Node>;

const buildGraph = (lines: string[]): Graph => {
    return lines.reduce<Graph>((prev, current) => {
        const match = current.match(/(\w+) = \((\w+), (\w+)\)/);
        if (match == null || match.length !== 4) {
            console.log("SOMETHING WENT WRONG!");
            return prev;
        } else {
            prev[match[1]] = { left: match[2], right: match[3] }
            return prev;
        }
    }, {})
}

export const a = (): number => {
    const lines = getFileContent(import.meta.dir);
    const [inputString, _, ...map] = lines;
    const graph = buildGraph(map);

    let index = 0;
    let currentNode = 'AAA'
    while (true) {
        const direction = inputString.charAt(index % inputString.length);

        if (direction === 'L') {
            currentNode = graph[currentNode].left;
        } else {
            currentNode = graph[currentNode].right;
        }

        index += 1;

        if (currentNode === "ZZZ") {
            return index;
        }
    }
}

export const b = (): number => {
    const lines = getFileContent(import.meta.dir, "test.txt");
    const [inputString, _, ...map] = lines;
    const graph = buildGraph(map);

    let index = 0;
    let nodes = Object.keys(graph).filter(node => node.endsWith("A"));
    while (true) {
        const direction = inputString.charAt(index % inputString.length);

        const newNodes = nodes.map(node => {
            if (direction === 'L') {
                return graph[node].left;
            } else {
                return graph[node].right;
            }
        })

        nodes = newNodes;

        index += 1;

        if (index % 10000 === 0) {
            console.log(index);

            console.log(nodes);
        }

        if (!nodes.find(node => !node.endsWith("Z"))) {
            return index
        }
    }
}