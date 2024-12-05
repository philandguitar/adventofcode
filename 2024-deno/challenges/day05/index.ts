import { readFileByLine } from "../../utils/file.ts";

type Tree = Record<string, {
  left: string[];
  right: string[];
}>;

const buildTree = (order: string[]) => {
  const tree: Tree = {};

  order.forEach((line) => {
    const [left, right] = line.split("|");
    if (tree[left] == null) {
      tree[left] = {
        left: [],
        right: [right],
      };
    } else {
      tree[left].right.push(right);
    }

    if (tree[right] == null) {
      tree[right] = {
        left: [left],
        right: [],
      };
    } else {
      tree[right].left.push(left);
    }
  });

  return tree;
};

// const createOrder = (tree: Tree) => {
//   const orderedStartList: string[] = [];
//   const orderedEndList: string[] = [];

//   let prevLength = Object.keys(tree).length + 1;

//   while (
//     Object.keys(tree).length > 0 && Object.keys(tree).length < prevLength
//   ) {
//     const keys = Object.keys(tree);
//     prevLength = keys.length;
//     console.log(keys.length);

//     // Object.keys(tree).map((key) => console.log(key, tree[key].left.length));

//     for (let i = 0; i < keys.length; i++) {
//       const currentKey = keys[i];
//       if (tree[keys[i]].left.length === 0) {
//         orderedStartList.push(keys[i]);

//         keys.forEach((val) => {
//           tree[val].left = tree[val].left.filter((item) => item !== currentKey);
//           tree[val].right = tree[val].right.filter((item) =>
//             item !== currentKey
//           );
//         });
//         delete tree[currentKey];
//         break;
//       }

//       let isRightOfSomething = false;
//       for (let innerKey = 0; innerKey < keys.length; innerKey++) {
//         if (tree[keys[innerKey]].right.includes(currentKey)) {
//           isRightOfSomething = true;
//           break;
//         }
//       }

//       if (!isRightOfSomething) {
//         console.log("NOTRIGHT");

//         keys.forEach((val) => {
//           tree[val].left = tree[val].left.filter((item) => item !== currentKey);
//           tree[val].right = tree[val].right.filter((item) =>
//             item !== currentKey
//           );
//         });
//         delete tree[keys[i]];
//       }

//       if (tree[keys[i]].left.length === 0) {
//         console.log("LEFT:");

//         orderedStartList.push(keys[i]);

//         keys.forEach((val) => {
//           tree[val].left = tree[val].left.filter((item) => item !== currentKey);
//           tree[val].right = tree[val].right.filter((item) =>
//             item !== currentKey
//           );
//         });
//         delete tree[currentKey];
//         break;
//       }

//       let isLeftOfSomething = false;
//       for (let innerKey = 0; innerKey < keys.length; innerKey++) {
//         if (tree[keys[innerKey]].left.includes(currentKey)) {
//           isLeftOfSomething = true;
//           break;
//         }
//       }

//       if (!isLeftOfSomething) {
//         keys.forEach((val) => {
//           tree[val].left = tree[val].left.filter((item) => item !== currentKey);
//           tree[val].right = tree[val].right.filter((item) =>
//             item !== currentKey
//           );
//         });
//         delete tree[keys[i]];
//       }
//     }
//   }

//   return orderedStartList;
// };

// export const a = () => {
//   const lines = readFileByLine(import.meta.dirname);

//   const breakLine = lines.findIndex((line) => line === "");

//   const tree = buildTree(lines.slice(0, breakLine));

//   const orderedList = createOrder(tree);

//   const res = lines.slice(breakLine + 1).reduce((acc, line) => {
//     const pages = line.split(",");

//     if (line === orderedList.filter((item) => pages.includes(item)).join(",")) {
//       return Number(pages[(pages.length - 1) / 2]) + acc;
//     }
//     return acc;
//   }, 0);

//   return res;
// };

export const b = () => {
  const lines = readFileByLine(import.meta.dirname);
  return -1;
};

export const a = () => {
  const lines = readFileByLine(import.meta.dirname);

  const breakLine = lines.findIndex((line) => line === "");

  const tree = buildTree(lines.slice(0, breakLine));

  const res = lines.slice(breakLine + 1).reduce((acc, line) => {
    const pages = line.split(",");
    let isValid = true;

    pages.forEach((page, index) => {
      if (pages.slice(index).some((item) => tree[page].left.includes(item))) {
        isValid = false;
      }
      if (
        pages.slice(0, index).some((item) => tree[page].right.includes(item))
      ) isValid = false;
    });

    if (!isValid) return acc;

    return Number(pages[(pages.length - 1) / 2]) + acc;
  }, 0);

  return res;
};
