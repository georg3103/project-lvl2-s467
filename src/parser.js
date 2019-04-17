import fs from 'fs';
import path from 'path';
import yml from 'js-yaml';
import ini from 'ini';

export default (filePath) => {
  const file = fs.readFileSync(path.normalize(filePath), 'utf8');
  const fileFormat = path.extname(filePath);

  let fileObj;
  switch (fileFormat) {
    case '.json':
      fileObj = JSON.parse(file);
      break;
    case '.yml':
      fileObj = yml.load(file);
      break;
    case '.ini':
      fileObj = ini.parse(file);
      break;
    default:
      throw new Error('Invalid file format');
  }
  return fileObj;
};
