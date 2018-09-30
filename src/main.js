'use strict';

const author = require(`./author`);
const version = require(`./version`);
const description = require(`./description`);
const license = require(`./license`);
const help = require(`./help`);
const welcome = require(`./default`);
const unknown = require(`./unknown`);

const KEYS = {
  '--version': version,
  '--help': help,
  '--author': author,
  '--license': license,
  '--description': description,
};

const userParameter = process.argv[2];

if (userParameter === undefined) {
  welcome.execute();
  process.exit(0);
}

if (KEYS[userParameter]) {
  KEYS[userParameter].execute();
  process.exit(0);
} else {
  unknown.execute(userParameter);
  process.exit(1);
}
