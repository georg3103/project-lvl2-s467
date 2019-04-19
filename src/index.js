import buildAst from './buildAst';
import parser from './parser';
import render from './render/render';

export default (file1path, file2path, format = 'tree') => {
  const file1 = parser(file1path);
  const file2 = parser(file2path);
  const parserFn = render(format);
  const ast = buildAst(file1, file2);

  return parserFn(ast);
};
