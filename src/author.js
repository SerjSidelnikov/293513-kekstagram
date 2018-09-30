'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Show name a author program`,
  execute() {
    console.log(`Автор: ${colors.yellow(packageInfo.author)}`);
  }
};
