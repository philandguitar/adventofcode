export const readFileByLine = (path?: string, filename: string = "input") => {
  if (!path) {
    throw new Error("Path is required");
  }
  const file = Deno.readTextFileSync(`${path}/${filename}.txt`);
  return file.split(/\r?\n/);
};

export const readFileAsMatrix = (path?: string, filename: string = "input") => {
  if (!path) {
    throw new Error("Path is required");
  }

  const lines = readFileByLine(path, filename);
  return lines.map((line) => line.split(""));
};
