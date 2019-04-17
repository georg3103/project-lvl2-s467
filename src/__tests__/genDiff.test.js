import genDiff from '..';

// test json format
const file1pathJson = 'src/__tests__/__fixtures__/before.json';
const file2pathJson = 'src/__tests__/__fixtures__/after.json';
// test yml format
const file1pathYml = 'src/__tests__/__fixtures__/before.yml';
const file2pathYml = 'src/__tests__/__fixtures__/after.yml';
// test ini format
const file1pathIni = 'src/__tests__/__fixtures__/before.ini';
const file2pathIni = 'src/__tests__/__fixtures__/after.ini';

// expected output (plane object)
const expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

/* eslint-disable */
describe('genDiff plane config file tests', () => {
  test.each([
    [file1pathJson, file2pathJson],
    [file1pathYml, file2pathYml],
    [file1pathIni, file2pathIni]
  ])('genDiff (json, yml, ini)',
  (file1, file2) => {
    expect(genDiff(file1, file2)).toBe(expected);
  },
)
});