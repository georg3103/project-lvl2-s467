import yml from 'js-yaml';
import ini from 'ini';

const mapping = {
  json: JSON.parse,
  yml: yml.load,
  ini: ini.parse,
};


export default (ext, data) => mapping[ext](data);
