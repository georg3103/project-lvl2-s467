import _ from 'lodash';
import { addIndentation, makeString } from '../utils';

export default (ast) => {
  const iter = (astData, level = 0) => {
    const mapped = astData.map((node) => {
      const {
        type, key, value1, value2, children,
      } = node;
      switch (type) {
        case 'same':
          return `${addIndentation(level)}    ${key}: ${makeString(value1, level)}`;
        case 'plus':
          return `${addIndentation(level)}  + ${key}: ${makeString(value2, level)}`;
        case 'minus':
          return `${addIndentation(level)}  - ${key}: ${makeString(value1, level)}`;
        case 'edited':
          return [
            `${addIndentation(level)}  + ${key}: ${makeString(value2, level)}`,
            `${addIndentation(level)}  - ${key}: ${makeString(value1, level)}`,
          ];
        case 'obj':
          return `${addIndentation(level)}    ${key}: ${iter(children, level + 1)}\n${addIndentation(level + 1)}}`;
        default:
          throw new Error('Wrong data type');
      }
    });
    return `{\n${_.flatten(mapped).join('\n')}`;
  };
  return `${iter(ast)}\n}`;
};
