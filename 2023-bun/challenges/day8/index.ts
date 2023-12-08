import { getFileContent } from "../../utils";
import { leastCommonMultiple } from "../../utils/math";

type Node = { left: string, right: string };
type Graph = Record<string, Node>;

const buildGraph = (lines: string[]): Graph => {
    return lines.reduce<Graph>((prev, current) => {
        const match = current.match(/(\w+) = \((\w+), (\w+)\)/);
        prev[match![1]] = { left: match![2], right: match![3] }
        return prev;
        
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
    const lines = getFileContent(import.meta.dir);
    const [inputString, _, ...map] = lines;
    const graph = buildGraph(map);

    const responses = Object.keys(graph).filter(node => node.endsWith("A")).map(node => {
        let index = 0;
        let currentNode = node;
        while (true) {
            const direction = inputString.charAt(index % inputString.length);
    
            if (direction === 'L') {
                currentNode = graph[currentNode].left;
            } else {
                currentNode = graph[currentNode].right;
            }
    
            index += 1;
    
            if (currentNode.endsWith("Z")) {
                return index;
            }
        }
    });

    return leastCommonMultiple(responses);
}