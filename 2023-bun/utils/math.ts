export const greatestCommonDivisor = (a: number, b: number): number => b === 0 ? a : greatestCommonDivisor(b, a % b);
 
export const leastCommonMultiple = (items: number[]) => items.slice(1).reduce((prev, current) => (current * prev) / greatestCommonDivisor(current, prev), items[0]);