import path from 'path';
import yml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yml.load,
  '.ini': ini.parse,
};

export default (filePath) => {
  const fileFormat = path.extname(filePath);
  const parse = parsers[fileFormat];

  console.log(fileFormat, parse);

  if (!parse) throw new Error('not valid file format');

  return parse;
};
