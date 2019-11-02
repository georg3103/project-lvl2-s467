import _ from 'lodash';

const addIndentation = n => '    '.repeat(n);

const formatValue = (value, level) => {
  if (!(value instanceof Object)) return value;
  const valueKeys = Object.keys(value).map(key => `${addIndentation(level + 2)}${key}: ${value[key]}`);
  return `{\n${valueKeys.join('\n')}\n${addIndentation(level + 1)}}`;
};

const mapping = {
  same: ({ key, value1, level }) => `${addIndentation(level)}    ${key}: ${formatValue(value1, level)}`,
  added: ({ key, value2, level }) => `${addIndentation(level)}  + ${key}: ${formatValue(value2, level)}`,
  removed: ({ key, value1, level }) => `${addIndentation(level)}  - ${key}: ${formatValue(value1, level)}`,
  edited: ({
    key, value1, value2, level,
  }) => [
    `${addIndentation(level)}  + ${key}: ${formatValue(value2, level)}`,
    `${addIndentation(level)}  - ${key}: ${formatValue(value1, level)}`,
  ],
  nested: ({
    key, children, level, iter,
  }) => `${addIndentation(level)}    ${key}: ${iter(children, level + 1)}\n${addIndentation(level + 1)}}`,
};

export default (ast) => {
  const iter = (astData, level = 0) => {
    const mapped = astData.map((node) => {
      const { type, ...data } = node;
      return mapping[type]({ ...data, level, iter });
    });
    return `{\n${_.flatten(mapped).join('\n')}`;
  };
  return `${iter(ast)}\n}`;
};
