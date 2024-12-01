export const readFileByLine = (path?: string) => {
  if (!path) {
    throw new Error("Path is required");
  }
  const file = Deno.readTextFileSync(`${path}/input.txt`);
  return file.split(/\r?\n/);
};
