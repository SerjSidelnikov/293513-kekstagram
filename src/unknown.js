'use strict';

const colors = require(`colors`);

module.exports = {
  name: `unknown`,
  description: `Show error message`,
  execute(parameter) {
    console.error(colors.red(`Неизвестная команда ${parameter}.`));
  }
};
