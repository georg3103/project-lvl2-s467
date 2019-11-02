import path from 'path';
import fs from 'fs';
import buildAst from './buildAst';
import parse from './parser';
import parseFormat from './renders';

const getData = pathfile => fs.readFileSync(pathfile, 'utf-8');
const getExt = extFile => path.extname(extFile).replace('.', '');

export default (file1path, file2path, format = 'tree') => {
  const extFile1 = getExt(file1path);
  const extFile2 = getExt(file2path);
  const file1content = parse(extFile1, getData(file1path));
  const file2content = parse(extFile2, getData(file2path));

  const renderAst = parseFormat(format);
  const ast = buildAst(file1content, file2content);

  return renderAst(ast);
};
