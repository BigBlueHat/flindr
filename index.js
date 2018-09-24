#!/usr/bin/env node
const findUp = require('find-up')
const fs = require('fs')
const configPath = findUp.sync(['.flindr', '.flindr.json'])
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}
const argv = require('yargs')
  .config(config)
  .commandDir('cmds')
  .demandCommand()
  .help()
  .argv;
