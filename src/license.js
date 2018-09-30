'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Show program license`,
  execute() {
    console.log(`Лицензия: ${packageInfo.license}`);
  }
};
