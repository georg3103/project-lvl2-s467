import _ from 'lodash';

const addIndentation = n => '    '.repeat(n);

const makeString = (value, level) => {
  // not object
  if (!(value instanceof Object)) return value;
  // object
  const valueKeys = Object.keys(value).map(key => `${addIndentation(level + 2)}${key}: ${value[key]}`);
  return `{\n${valueKeys.join('\n')}\n${addIndentation(level + 1)}}`;
};

export default (ast) => {
  const iter = (astData, level = 0) => {
    const mapped = astData.map((node) => {
      const {
        type, key, value1, value2, children,
      } = node;
      switch (type) {
        case 'same':
          return `${addIndentation(level)}    ${key}: ${makeString(value1, level)}`;
        case 'add':
          return `${addIndentation(level)}  + ${key}: ${makeString(value2, level)}`;
        case 'removed':
          return `${addIndentation(level)}  - ${key}: ${makeString(value1, level)}`;
        case 'edited':
          return [
            `${addIndentation(level)}  + ${key}: ${makeString(value2, level)}`,
            `${addIndentation(level)}  - ${key}: ${makeString(value1, level)}`,
          ];
        case 'nested':
          return `${addIndentation(level)}    ${key}: ${iter(children, level + 1)}\n${addIndentation(level + 1)}}`;
        default:
          throw new Error('Wrong data type');
      }
    });
    return `{\n${_.flatten(mapped).join('\n')}`;
  };
  return `${iter(ast)}\n}`;
};
