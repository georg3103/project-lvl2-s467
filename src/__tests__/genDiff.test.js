import genDiff from '..';

// test json
const file1path = 'src/__tests__/__fixtures__/before.json';
const file2path = 'src/__tests__/__fixtures__/after.json';
const expectedTest1 = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  - follow: false\n  + verbose: true\n}';

describe('genDiff tests', () => {
  test('test json', () => {
    expect(genDiff(file1path, file2path)).toBe(expectedTest1);
  });
});