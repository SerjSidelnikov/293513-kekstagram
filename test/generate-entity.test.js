'use strict';

const assert = require(`assert`);
const {effect, WEEK} = require(`../src/data/data`);
const generateEntity = require(`../src/generator/generate-entity`);
const entity = generateEntity();

const isUnique = (arr) => {
  const obj = {};

  for (const item of arr) {
    obj[item] = true;
  }

  return Object.keys(obj).length === arr.length;
};

describe(`Generate JSON command`, () => {
  describe(`Check url image`, () => {
    it(`check correct value`, () => {
      assert.equal(entity.url, `https://picsum.photos/600/?random`);
    });
  });

  describe(`Check scale value`, () => {
    it(`check correct value`, () => {
      assert(typeof entity.scale === `number`);
    });

    it(`should return a number in the specified range`, () => {
      assert(entity.scale >= 0 && entity.scale <= 100);
    });
  });

  describe(`Check effect value`, () => {
    it(`check correct value`, () => {
      assert(typeof entity.effect === `string`);
    });

    it(`should return one of the preset values`, () => {
      assert(effect.includes(entity.effect));
    });
  });

  describe(`Check hashtags value`, () => {
    it(`should return no more 5 items`, () => {
      assert(entity.hashtags.length <= 5);
    });

    it(`each line starts with a '#' character`, () => {
      assert(entity.hashtags.every((item) => item.startsWith(`#`)));
    });

    it(`there must be only unique values`, () => {
      const check = isUnique(entity.hashtags);
      assert(check);
    });

    it(`values must not contain spaces`, () => {
      const check = entity.hashtags.some((item) => item.includes(` `));
      assert.equal(check, false);
    });

    it(`the length of one word does not exceed 20 characters`, () => {
      const check = entity.hashtags.some((item) => item.length > 20);
      assert.equal(check, false);
    });
  });

  describe(`Check description value`, () => {
    it(`check correct value`, () => {
      assert(typeof entity.description === `string`);
    });

    it(`line length should not exceed 140 characters`, () => {
      assert(entity.description.length <= 140);
    });
  });

  describe(`Check likes value`, () => {
    it(`check correct value`, () => {
      assert(typeof entity.scale === `number`);
    });

    it(`should return a number in the specified range`, () => {
      assert(entity.scale >= 0 && entity.scale <= 1000);
    });
  });

  describe(`Check comments value`, () => {
    it(`check correct value`, () => {
      assert(Array.isArray(entity.comments));
    });

    it(`array must contain strings`, () => {
      const check = entity.comments.some((item) => typeof item !== `string`);
      assert.equal(check, false);
    });

    it(`the length of one word does not exceed 20 characters`, () => {
      const check = entity.comments.some((item) => item.length > 140);
      assert.equal(check, false);
    });
  });

  describe(`Check date value`, () => {
    it(`check correct value`, () => {
      assert(typeof entity.date === `number`);
    });

    it(`the number must be in the specified interval`, () => {
      const date = Date.now();
      const minDate = date - WEEK;
      assert(entity.date >= minDate && entity.date <= date);
    });
  });
});
