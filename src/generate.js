'use strict';

const fs = require(`fs`);
const readline = require(`readline`);
const generateEntity = require(`./generator/generate-entity`);

const DEFAULT_PATH = `${process.cwd()}/entity.json`;

const entity = generateEntity();
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const isGenerate = (count) => {
  const entities = [];

  for (let i = 0; i < count; i++) {
    entities.push(entity);
  }

  return entities;
};

const welcomeEntity = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Хотите сгенерировать данные? (да/нет): `,
  });

  rl.prompt();
  rl.on(`line`, (line) => {
    line = line.trim();

    switch (line) {
      case `нет`:
        rl.close();
        process.exit(0);
        break;
      case `да`:
        rl.close();
        countEntity();
        break;
      default:
        console.log(`Нужно ввести "да" или "нет".`);
        rl.prompt();
    }
  }).on(`close`, () => {})
    .on(`error`, (err) => {
      console.error(err);
      process.exit(1);
    });
};

const countEntity = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Сколько элементов нужно сгенерировать? (1): `,
  });

  rl.prompt();
  rl.on(`line`, (line) => {
    line = parseInt(line, 10);

    if (line > 0) {
      rl.close();
      const data = isGenerate(line);
      saveEntity(data);
    } else if (line === 0) {
      console.log(`Количество элементов должно быть больше нуля.`);
      rl.prompt();
    } else {
      console.log(`Нужно ввести число больше нуля.`);
      rl.prompt();
    }
  }).on(`close`, () => {})
    .on(`error`, (err) => {
      console.error(err);
      process.exit(1);
    });
};

const saveEntity = (data) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Куда вы хотите сохранить файл? (${process.cwd()}/entity.json): `,
  });

  rl.prompt();
  rl.on(`line`, (line) => {
    fs.open(line = DEFAULT_PATH, `r`, (err) => {
      if (err) {
        rl.close();
        writeEntity(line, data);
      } else {
        rl.close();
        rewriteEntity(line, data);
      }
    });
  }).on(`close`, () => {})
    .on(`error`, (err) => {
      console.error(err);
      process.exit(1);
    });
};

const writeEntity = (path, data) => {
  fs.writeFile(path, JSON.stringify(data), fileWriteOptions, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Файл успешно создан.`);
    process.exit(0);
  });
};

const rewriteEntity = (path, data) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Такой файл уже существует, хотите его перезаписать? (да/нет): `,
  });

  rl.prompt();
  rl.on(`line`, (line) => {
    line = line.trim();

    switch (line) {
      case `нет`:
        rl.close();
        console.log(`Выберите другое имя файла.`);
        saveEntity(data);
        break;
      case `да`:
        rl.close();
        writeEntity(path, data);
        break;
      default:
        console.log(`Нужно ввести "да" или "нет".`);
        rl.prompt();
    }
  }).on(`close`, () => {})
    .on(`error`, (err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = {
  name: `generator`,
  description: `Creates an object with data`,
  execute() {
    welcomeEntity();
  },
  writeEntity,
};
