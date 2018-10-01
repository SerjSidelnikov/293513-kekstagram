'use strict';

const colors = require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `default`,
  description: `Show welcome message`,
  execute() {
    console.log(colors.green(`Привет пользователь!
Эта программа будет запускать сервер «Кекстаграм».
Автор: ${colors.yellow(packageInfo.author)}.`));
  }
};
