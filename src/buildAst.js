import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);
  const keys = _.union(firstKeys, secondKeys);

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        value2,
        type: 'add',
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        value1,
        type: 'removed',
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key,
        value1,
        type: 'same',
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: buildAst(obj1[key], obj2[key]),
      };
    }
    return {
      key,
      value1,
      value2,
      type: 'edited',
    };
  });
};

export default buildAst;
