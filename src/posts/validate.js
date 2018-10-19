'use strict';

const ValidationError = require(`../error/validation-error`);
const effects = require(`../data/data`).Constants.EFFECTS;

const validate = (data) => {
  const errors = [];

  if (!data.filename) {
    errors.push(`Field name "filename" is required!`);
  }

  if (!data.scale) {
    errors.push(`Field name "scale" is required!`);
  }

  if (data.scale < 0 || data.scale > 100) {
    errors.push(`Field name "scale" contains an invalid value!`);
  }

  if (!data.effect) {
    errors.push(`Field name "effect" is required!`);
  }

  if (data.effect && !effects.includes(data.effect)) {
    errors.push(`Field name "effect" contains an invalid value!`);
  }

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  return data;
};

module.exports = validate;
