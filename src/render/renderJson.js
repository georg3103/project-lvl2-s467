export default (ast) => {
  const iter = (astData) => {
    const mapped = astData.reduce((acc, node) => {
      const {
        type, key, value1, value2, children,
      } = node;
      switch (type) {
        case 'same':
          acc[key] = {
            sameValue: value1,
          };
          break;
        case 'plus':
          acc[key] = {
            addedValue: value2,
          };
          break;
        case 'minus':
          acc[key] = {
            removedValue: value1,
          };
          break;
        case 'edited':
          acc[key] = {
            remodedValue: value1,
            addedValue: value1,
          };
          break;
        case 'obj':
          acc[key] = iter(children);
          break;
        default:
          throw new Error('Wrong data type');
      }
      return acc;
    }, {});
    return mapped;
  };
  const jsonObjStr = JSON.stringify(iter(ast), null, 2);
  return jsonObjStr;
};
