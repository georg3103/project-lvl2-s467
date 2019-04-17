import _ from 'lodash';
import parser from './parser';

function getObjectsDiff(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const keys = _.union(obj1Keys, obj2Keys);

  const objectsDiffArr = keys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }
    if (obj1Keys.includes(key)) {
      return obj2Keys.includes(key)
        ? `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`
        : `  - ${key}: ${obj1[key]}`;
    }
    return `  + ${key}: ${obj2[key]}`;
  });

  return `{\n${objectsDiffArr.join('\n')}\n}`;
}

export default (file1path, file2path) => {
  const file1 = parser(file1path);
  const file2 = parser(file2path);

  return getObjectsDiff(file1, file2);
};
