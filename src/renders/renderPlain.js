const formatValue = (value) => {
  if (!(value instanceof Object)) return value;
  return '[complex value]';
};

const mapping = {
  same: ({ parentKey, key }) => `Property '${parentKey}${key}' wasn't changed`,
  added: ({ parentKey, key, formatedValue2 }) => `Property '${parentKey}${key}' was added with value: '${formatedValue2}'`,
  removed: ({ parentKey, key }) => `Property '${parentKey}${key}' was removed`,
  edited: ({
    parentKey, key, formatedValue1, formatedValue2,
  }) => `Property '${parentKey}${key}' was updated. From ${formatedValue1} to ${formatedValue2}`,
  nested: ({
    children, parentKey, key, iter,
  }) => iter(children, parentKey.concat(`${key}.`)),
};

export default (ast) => {
  const iter = (astData, parentKey) => {
    const mapped = astData.map((node) => {
      const {
        type, value1, value2, ...data
      } = node;
      const formatedValue1 = formatValue(value1);
      const formatedValue2 = formatValue(value2);
      return mapping[type]({
        formatedValue1, formatedValue2, parentKey, ...data, iter,
      });
    });
    return mapped.join('\n');
  };
  return iter(ast, '');
};
