import fs from 'fs';
import genDiff from '..';

// test json format
const file1pathJson = 'src/__tests__/__fixtures__/before.json';
const file2pathJson = 'src/__tests__/__fixtures__/after.json';
const file1pathComplexJson = 'src/__tests__/__fixtures__/beforeComplex.json';
const file2pathComplexJson = 'src/__tests__/__fixtures__/afterComplex.json';
// test yml format
const file1pathYml = 'src/__tests__/__fixtures__/before.yml';
const file2pathYml = 'src/__tests__/__fixtures__/after.yml';
// test ini format
const file1pathIni = 'src/__tests__/__fixtures__/before.ini';
const file2pathIni = 'src/__tests__/__fixtures__/after.ini';

// expected output (plane object)
const expectedPlain = fs.readFileSync('src/__tests__/__fixtures__/expectedPlain.txt', 'utf-8');
const expectedDeep = fs.readFileSync('src/__tests__/__fixtures__/expectedDeep.txt', 'utf-8');

/* eslint-disable */
describe('genDiff plane config file tests', () => {
  test.each([
    [file1pathJson, file2pathJson],
    [file1pathYml, file2pathYml],
    [file1pathIni, file2pathIni]
  ])('genDiff (json, yml, ini)',
  (file1, file2) => {
    expect(genDiff(file1, file2)).toBe(expectedPlain);
  },
)
});

describe('genDiff deep config file tests', () => {
  test.each([
    [file1pathComplexJson, file2pathComplexJson],
  ])('genDiff of a deep (json, yml, ini)',
  (file1, file2) => {
    expect(genDiff(file1, file2)).toBe(expectedDeep);
  },
)
});