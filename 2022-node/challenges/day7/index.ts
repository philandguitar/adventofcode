import { getFileContent, logResults } from "../../utils";
import { set, get } from "lodash";

const createDirTree = () => {
  const commands = getFileContent("7");
  const directory: any = {};

  let currentDir = "";

  commands.forEach((command) => {
    if (command === "$ ls" || command.startsWith("dir")) {
      return;
    }
    if (command === "$ cd ..") {
      currentDir = currentDir.split(".").slice(0, -1).join(".");
      return;
    }
    if (command.startsWith("$ cd ")) {
      const dir = command.replace("$ cd ", "");
      currentDir = currentDir ? currentDir.concat(".", dir) : dir;
      set(directory, currentDir, get(directory, currentDir) ?? null);
      return;
    }

    const [size, name] = command.split(" ");
    set(
      directory,
      `${currentDir}.${name.replace(".", "_")}`,
      Number.parseInt(size)
    );
  });

  return directory;
};

let res1 = 0;
let res2 = 70000000;

const getDirSize = (treeDir: any, path: string, limit = Number.MAX_VALUE) => {
  const content = get(treeDir, path);

  if (Number.isInteger(content)) {
    return content;
  }
  let size = 0;
  Object.keys(content).forEach((dir) => {
    size += getDirSize(treeDir, path ? `${path}.${dir}` : dir, limit);
  });
  if (size <= 100000) {
    res1 += size;
  }

  if (size > limit && size < res2) {
    console.log(path, ": ", size);

    res2 = size;
  }

  return size;
};

export const day7 = () => {
  const dirTree = createDirTree();

  const filled = getDirSize(dirTree, "/");

  const spaceRequired = 30000000 - (res2 - filled);
  getDirSize(dirTree, "/", spaceRequired);
  logResults(7, res1, res2);
};
