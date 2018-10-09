'use strict';

const assert = require(`assert`);
const fs = require(`fs`);
const {writeEntity} = require(`../src/generate`);

const checkAccess = (path) => {
  fs.open(path, `r`, (err) => {
    if (err) {
      throw err;
    }
  });
};

describe(`File creation`, () => {
  it(`should create new file`, () => {
    const tempFileName = `${process.cwd()}/entity.json`;
    writeEntity(tempFileName, {});

    assert.doesNotThrow(() => {
      checkAccess(tempFileName);
    });
  });

  it(`should rewrite file`, () => {
    const tempFileName = `${process.cwd()}/entity.json`;
    writeEntity(tempFileName, {});

    const newTempFileName = `${process.cwd()}/entity.json`;
    writeEntity(newTempFileName, {foo: `bar`});

    assert.doesNotThrow(() => {
      checkAccess(newTempFileName);
    });
  });
});
