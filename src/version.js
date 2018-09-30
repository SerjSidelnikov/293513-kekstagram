'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Show program version`,
  execute() {
    console.log(`Версия: v${packageInfo.version}`);
  }
};
