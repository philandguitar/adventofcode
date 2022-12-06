import { getFileContent, logResults } from "../../utils";

const findFirstMarker = (input: string, markerLength: number) => {
  for (let i = 0; i < input.length - markerLength; i++) {
    const substr = input.substring(i, i + markerLength);
    const map = new Map();
    for (let m = 0; m < markerLength; m++) {
      map.set(substr.charAt(m), true);
    }
    if (map.size === markerLength) {
      return i + markerLength;
    }
  }
};

export const day6 = () => {
  const [input] = getFileContent("6");

  const res1 = findFirstMarker(input, 4);
  const res2 = findFirstMarker(input, 14);

  logResults(6, res1, res2);
};
