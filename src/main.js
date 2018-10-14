'use strict';

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);
const help = require(`./help`);
const welcome = require(`./default`);
const unknown = require(`./unknown`);
const generate = require(`./generate`);
const server = require(`./server`);

const KEYS = {
  '--version': version,
  '--help': help,
  '--author': author,
  '--license': license,
  '--description': description,
  '--server': server,
};

const userParameter = process.argv[2];

if (!userParameter) {
  welcome.execute();
  generate.execute();
} else if (KEYS[userParameter]) {
  KEYS[userParameter].execute();
} else {
  unknown.execute(userParameter);
  help.execute();
  process.exit(1);
}
