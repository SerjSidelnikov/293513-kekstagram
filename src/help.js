'use strict';

const colors = require(`colors`);

module.exports = {
  name: `help`,
  description: `Show help message`,
  execute() {
    console.log(`Доступные команды:
--${colors.grey(`help`)}        — ${colors.green(`печатает этот текст`)};
--${colors.grey(`version`)}     — ${colors.green(`печатает версию приложения`)};
--${colors.grey(`author`)}      - ${colors.green(`печатает имя автора приложения`)};
--${colors.grey(`license`)}     - ${colors.green(`печатает тип лицензии`)};
--${colors.grey(`description`)} - ${colors.green(`печатает описание приложения`)}.`);
  }
};
