#!/usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'tree')
  .arguments('<file1> <file2>')
  .action((file1path, file2path) => genDiff(file1path, file2path, commander.format));

commander.parse(process.argv);
