// helper functions

const addIndentation = n => '    '.repeat(n);

const makeString = (value, level) => {
  // not object
  if (!(value instanceof Object)) return value;
  // object
  const valueKeys = Object.keys(value).map(key => `${addIndentation(level + 2)}${key}: ${value[key]}`);
  return `{\n${valueKeys.join('\n')}\n${addIndentation(level + 1)}}`;
};

export {
  addIndentation,
  makeString,
};
