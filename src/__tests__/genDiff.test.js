import fs from 'fs';
import genDiff from '..';

// test json format tree
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

// expected output (tree object)
const expectedTree = fs.readFileSync('src/__tests__/__fixtures__/expectedTree.txt', 'utf-8');
const expectedDeepTree = fs.readFileSync('src/__tests__/__fixtures__/expectedDeepTree.txt', 'utf-8');
const expectedDeepPlain = fs.readFileSync('src/__tests__/__fixtures__/expectedDeepPlain.txt', 'utf-8');
const expectedDeepJson = fs.readFileSync('src/__tests__/__fixtures__/expectedDeepJson.json', 'utf-8');

/* eslint-disable */
describe('genDiff tree', () => {
  test.each([
    [file1pathJson, file2pathJson],
    [file1pathYml, file2pathYml],
    [file1pathIni, file2pathIni]
  ])('genDiff (json, yml, ini)',
    (file1, file2) => {
      expect(genDiff(file1, file2)).toBe(expectedTree);
    })
  test.each([
    [file1pathComplexJson, file2pathComplexJson],
  ])('genDiff of a deep tree (json, yml, ini)',
  (file1, file2) => {
    expect(genDiff(file1, file2)).toBe(expectedDeepTree);
  })
});



describe('genDiff plain', () => {
  test.each([
    [file1pathComplexJson, file2pathComplexJson],
  ])('genDiff of a deep plain (json, yml, ini)',
  (file1, file2) => {
    expect(genDiff(file1, file2, 'plain')).toBe(expectedDeepPlain);
  },
)
});

describe('genDiff json', () => {
  test.each([
    [file1pathComplexJson, file2pathComplexJson],
  ])('genDiff of a deep json (json, yml, ini)',
  (file1, file2) => {
    // const genDiffJson = JSON.parse((genDiff(file1, file2, 'json')))
    expect(genDiff(file1, file2, 'json')).toBe(expectedDeepJson);
  },
)
});