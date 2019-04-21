import fs from 'fs';
import buildAst from './buildAst';
import parse from './parser';
import render from './render';

export default (file1path, file2path, format = 'tree') => {
  const file1content = parse(file1path)(fs.readFileSync(file1path, 'utf-8'));
  const file2content = parse(file2path)(fs.readFileSync(file2path, 'utf-8'));

  const renderAst = render(format);
  const ast = buildAst(file1content, file2content);

  return renderAst(ast);
};
