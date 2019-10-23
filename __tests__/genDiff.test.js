import fs from 'fs';
import genDiff from '../src/index';

const fileFormats = ['.json', '.yml', '.ini'];

const testDefaultFormat = (ext, type) => {
  it(`gendiff ${type} ${ext}`, () => {
    const before = `__tests__/__fixtures__/before_${type}${ext}`;
    const after = `__tests__/__fixtures__/after_${type}${ext}`;
    const expectedFilePath = `__tests__/__fixtures__/expected_${type}.txt`;
    const actual = genDiff(before, after);
    const expected = fs.readFileSync(expectedFilePath, 'utf-8');
    expect(actual).toBe(expected);
  });
};

const testCustomFormat = (type) => {
  it(`gendiff ${type}`, () => {
    const before = '__tests__/__fixtures__/before_nested.json';
    const after = '__tests__/__fixtures__/after_nested.json';
    const expectedFilePath = `__tests__/__fixtures__/expected_${type}.txt`;
    const expectedFile = fs.readFileSync(expectedFilePath, 'utf-8');
    const actual = genDiff(before, after, type);
    expect(actual).toBe(expectedFile);
  });
};

describe('gendiff', () => {
  fileFormats.forEach(ext => testDefaultFormat(ext, 'flat'));
  fileFormats.forEach(ext => testDefaultFormat(ext, 'nested'));
  testCustomFormat('plain');
  testCustomFormat('json');
});
