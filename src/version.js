'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);
const version = packageInfo.version.split(`.`);

module.exports = {
  name: `version`,
  description: `Show program version`,
  execute() {
    console.log(`Версия: v${colors.red(version[0])}.${colors.green(version[1])}.${colors.blue(version[2])}`);
  }
};
