#!/usr/bin/env node
const colors = require('colors');
const findUp = require('find-up');
const fs = require('fs');
const configPath = findUp.sync(['.flindr', '.flindr.json']);
if (null === configPath) {
  console.error('The config file (`.flindr.json`) is missing from your home directory.'.red);
  process.exit();
}
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}
const argv = require('yargs')
  .config(config)
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv;
