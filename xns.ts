declare type fArgReturn = (...args: any[]) => any;

const getInvocationLocationFromFile = (str: string) => {
  const line = str.split("\n")[2];
  // Parse the expression: (/Users/user/project/script.ts:7:4)
  return line.match(/\(((.*)):([0-9]+):([0-9]+)\)/)?.[1];
};

const removeExtensionOfPath = (path: string) => {
  const split = path.split(".");
  if (split.length === 1) {
    return path;
  }
  return split.slice(0, split.length - 1).join(".");
};

// match index.js with node index
const compareWithoutExtension = (path1: string, path2: string) => {
  return removeExtensionOfPath(path1) === removeExtensionOfPath(path2);
};

export const xns = <T extends fArgReturn>(fn: T): T => {
  const line = getInvocationLocationFromFile(Error().stack as string);
  if (!line) {
    return fn;
  }
  if (compareWithoutExtension(process.argv[1], line)) {
    Promise.resolve(fn())
      .then(output => {
        if (typeof output !== "undefined") {
          console.log(output);
        }
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  }
  return fn;
};
export default xns;
