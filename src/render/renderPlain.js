const formatValue = (value) => {
  // not object
  if (!(value instanceof Object)) return value;
  // object
  // Property 'group2' was added with value: [complex value]
  return '[complex value]';
};

export default (ast) => {
  const iter = (astData, parentKey) => {
    const mapped = astData.map((node) => {
      const {
        type, key, value1, value2, children,
      } = node;
      const formatedValue1 = formatValue(value1);
      const formatedValue2 = formatValue(value2);
      switch (type) {
        case 'same':
          return `Property '${parentKey}${key}' wasn't changed`;
        case 'add':
          return `Property '${parentKey}${key}' was added with value: '${formatedValue2}'`;
        case 'removed':
          return `Property '${parentKey}${key}' was removed`;
        case 'edited':
          return `Property '${parentKey}${key}' was updated. From ${formatedValue1} to ${formatedValue2}`;
        case 'nested':
          return iter(children, parentKey.concat(`${key}.`));
        default:
          throw new Error('Wrong data type');
      }
    });
    return mapped.join('\n');
  };
  return iter(ast, '');
};
