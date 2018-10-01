'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Show program description`,
  execute() {
    console.log(`Описание: ${colors.yellow(packageInfo.description)}`);
  }
};
