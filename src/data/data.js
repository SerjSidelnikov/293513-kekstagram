'use strict';

const Constants = {
  WEEK: 1000 * 60 * 60 * 24 * 7,
  MAX_SCALE: 100,
  MAX_HASHTAGS: 5,
  MAX_LENGTH_TEXT: 140,
  MAX_LIKES: 1000,
  MAX_COMMENTS: 10,
  EFFECTS: [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`],
  HASHTAGS: [`#workout`, `#happy`, `#photo`, `#lifestyle`, `#girls`, `#handmade`, `#healthy`, `#sweet`, `#lol`, `#smile`, `#swag`],
};

const getRandomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const getHashtags = () => {
  const mass = new Set();

  while (mass.size !== Constants.MAX_HASHTAGS) {
    mass.add(Constants.HASHTAGS[getRandomNumber(Constants.HASHTAGS.length - 1)]);
  }

  return [...mass];
};

const getRandomWord = () => Math.random().toString(36).slice(2);
const getRandomText = () => {
  let str = ``;
  const length = getRandomNumber(Constants.MAX_LENGTH_TEXT);

  while (str.length <= length) {
    str += ` ${getRandomWord()}`;
  }

  return str.slice(0, length);
};

const getComments = () => {
  const mass = [];

  while (mass.length <= Constants.MAX_COMMENTS) {
    mass.push(getRandomText());
  }

  return mass;
};

const getDate = () => {
  const date = Date.now();
  const minDate = date - Constants.WEEK;

  return getRandomNumber(date, minDate);
};

module.exports = {
  Constants,
  getRandomNumber,
  getHashtags,
  getRandomText,
  getComments,
  getDate,
};
