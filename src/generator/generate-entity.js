'use strict';

const {
  MAX_SCALE,
  MAX_LIKES,
  effect,
  getRandomNumber,
  getHashtags,
  getRandomText,
  getComments,
  getDate,
} = require(`../data/data`);

const generateEntity = () => ({
  'url': `https://picsum.photos/600/?random`,
  'scale': getRandomNumber(MAX_SCALE),
  'effect': effect[getRandomNumber(effect.length - 1)],
  'hashtags': getHashtags(),
  'description': getRandomText(),
  'likes': getRandomNumber(MAX_LIKES),
  'comments': getComments(),
  'date': getDate(),
});

module.exports = generateEntity;
