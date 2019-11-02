import renderTree from './renderTree';
import renderPlain from './renderPlain';

const parserObj = {
  tree: renderTree,
  json: ast => JSON.stringify(ast),
  plain: renderPlain,
};

export default format => ast => parserObj[format](ast);
