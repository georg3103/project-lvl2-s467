import renderTree from './renderTree';
import renderJson from './renderJson';
import renderPlain from './renderPlain';

const parserObj = {
  tree: renderTree,
  json: renderJson,
  plain: renderPlain,
};

export default format => ast => parserObj[format](ast);
