export function argsNames(fn: Function): string[] {
  const fnStr = fn
    .toString()
    // remove comments
    .replace(/\/\*.*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');

  // regular expression to find arguments
  const result = fnStr.match(/^[^(]*\(([^)]*)\)/);
  if (!result) return [];

  const args = result[1]
    .split(',')
    .map((arg) => arg.trim())
    .filter(Boolean)
    // remove default values and destructuring
    .map((arg) => arg.split('=')[0].trim())
    .map((arg) => arg.replace(/[\{\}\[\]\s]/g, '')) // remove destructuring brackets
    .filter(Boolean);

  return args;
}

export default argsNames;
