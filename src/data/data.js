'use strict';

const WEEK = 1000 * 60 * 60 * 24 * 7;
const MAX_SCALE = 100;
const MAX_HASHTAGS = 5;
const MAX_LENGTH_TEXT = 140;
const MAX_LIKES = 1000;
const MAX_COMMENTS = 10;

const effect = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const hashtags = [`#workout`, `#happy`, `#photo`, `#lifestyle`, `#girls`, `#handmade`, `#healthy`, `#sweet`, `#lol`, `#smile`, `#swag`];

const getRandomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const getHashtags = () => {
  const mass = new Set();

  while (mass.size !== MAX_HASHTAGS) {
    mass.add(hashtags[getRandomNumber(hashtags.length - 1)]);
  }

  return [...mass];
};

const getRandomWord = () => Math.random().toString(36).slice(2);
const getRandomText = () => {
  let str = ``;
  const length = getRandomNumber(MAX_LENGTH_TEXT);

  while (str.length <= length) {
    str += ` ${getRandomWord()}`;
  }

  return str.slice(0, length);
};

const getComments = () => {
  const mass = [];

  while (mass.length <= MAX_COMMENTS) {
    mass.push(getRandomText());
  }

  return mass;
};

const getDate = () => {
  const date = Date.now();
  const minDate = date - WEEK;

  return getRandomNumber(date, minDate);
};

module.exports = {
  WEEK,
  MAX_SCALE,
  MAX_LIKES,
  effect,
  hashtags,
  getRandomNumber,
  getHashtags,
  getRandomText,
  getComments,
  getDate,
};
