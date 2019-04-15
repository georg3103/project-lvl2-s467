#!/usr/bin/env node
import commander from 'commander';
import { version } from '../../package.json';

const program = commander;

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => console.log(secondConfig))
  .parse(process.argv);

console.log('works fine!');
