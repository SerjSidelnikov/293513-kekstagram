'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `default`,
  description: `Show welcome message`,
  execute() {
    console.log(`Привет пользователь!
Эта программа будет запускать сервер «Кекстаграм».
Автор: ${packageInfo.author}.`);
  }
};
