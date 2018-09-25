const userParameter = process.argv[2];

const KEYS = {
  version: `--version`,
  help: `--help`,
};

const message = {
  welcome: `Привет пользователь!\nЭта программа будет запускать сервер «Кекстаграм».\nАвтор: Кекс.`,
  version: `v0.0.1`,
  help: `Доступные команды:\n--help\t— печатает этот текст;\n--version — печатает версию приложения;`,
  error: `Неизвестная команда ${userParameter}.\nЧтобы прочитать правила использования приложения, наберите "--help"`
};

switch (userParameter) {
  case KEYS.version:
    console.log(message.version);
    break;
  case KEYS.help:
    console.log(message.help);
    break;
  case undefined:
    console.log(message.welcome);
    break;
  default:
    console.error(message.error);
    process.exit(1);
}
