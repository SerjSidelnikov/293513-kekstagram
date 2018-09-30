'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Show name a author program`,
  execute() {
    console.log(`Автор: ${packageInfo.author}`);
  }
};
