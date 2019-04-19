import { formatValue } from '../utils';

// Property 'timeout' was updated. From 50 to 20
// Property 'proxy' was removed
// Property 'common.setting4' was removed
// Property 'common.setting5' was removed
// Property 'common.setting2' was added with value: 200
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'common.sites' was added with value: 'hexlet.io'
// Property 'group1.baz' was updated. From 'bars' to 'bas'
// Property 'group3' was removed
// Property 'verbose' was added with value: true
// Property 'group2' was added with value: [complex value]

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
        case 'plus':
          return `Property '${parentKey}${key}' was added with value: '${formatedValue2}'`;
        case 'minus':
          return `Property '${parentKey}${key}' was removed`;
        case 'edited':
          return `Property '${parentKey}${key}' was updated. From ${formatedValue1} to ${formatedValue2}`;
        case 'obj':
          return iter(children, parentKey.concat(`${key}.`));
        default:
          throw new Error('Wrong data type');
      }
    });
    return mapped.join('\n');
  };
  return iter(ast, '');
};
