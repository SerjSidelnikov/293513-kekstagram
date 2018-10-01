'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Show program license`,
  execute() {
    console.log(`Лицензия: ${colors.yellow(packageInfo.license)}`);
  }
};
