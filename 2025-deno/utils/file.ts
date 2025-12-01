export const readFileByLine = (path?: string, filename: string = "input") => {
  if (!path) {
    throw new Error("Path is required");
  }
  const file = Deno.readTextFileSync(`${path}/${filename}.txt`);
  return file.split(/\r?\n/);
};
