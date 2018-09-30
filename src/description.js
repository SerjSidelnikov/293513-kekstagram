'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Show program description`,
  execute() {
    console.log(`Описание: ${packageInfo.description}`);
  }
};
