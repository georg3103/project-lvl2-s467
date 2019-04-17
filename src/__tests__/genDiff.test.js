import genDiff from '..';

// test json format
const file1pathJson = 'src/__tests__/__fixtures__/before.json';
const file2pathJson = 'src/__tests__/__fixtures__/after.json';
// test yml format
const file1pathYml = 'src/__tests__/__fixtures__/before.yml';
const file2pathYml = 'src/__tests__/__fixtures__/after.yml';

// expected output (plane object)
const expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

/* eslint-disable */
describe('genDiff tests', () => {
  test('test json', () => {
    expect(genDiff(file1pathJson, file2pathJson)).toBe(expected);
  });

  test('test yml', () => {
    expect(genDiff(file1pathYml, file2pathYml)).toBe(expected);
  });
});