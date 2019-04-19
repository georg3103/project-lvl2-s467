import buildAst from './buildAst';
import render from './render';
import parser from './parser';

export default (file1path, file2path) => {
  const file1 = parser(file1path);
  const file2 = parser(file2path);

  return render(buildAst(file1, file2));
};
