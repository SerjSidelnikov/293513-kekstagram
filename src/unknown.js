'use strict';

module.exports = {
  name: `unknown`,
  description: `Show error message`,
  execute(parameter) {
    console.error(`Неизвестная команда ${parameter}.`);
  }
};
