'use strict';

const {
  Constants,
  getRandomNumber,
  getHashtags,
  getRandomText,
  getComments,
  getDate,
} = require(`../data/data`);

const generateEntity = () => ({
  'url': `https://picsum.photos/600/?random`,
  'scale': getRandomNumber(Constants.MAX_SCALE),
  'effect': Constants.EFFECTS[getRandomNumber(Constants.EFFECTS.length - 1)],
  'hashtags': getHashtags(),
  'description': getRandomText(),
  'likes': getRandomNumber(Constants.MAX_LIKES),
  'comments': getComments(),
  'date': getDate(),
});

module.exports = generateEntity;
