'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/server`).app;

describe(`POST /api/posts`, () => {
  it(`send post as json`, async () => {
    const sent = {
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: 100
    };

    const response = await request(app)
      .post(`/api/posts`)
      .send(sent)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.deepEqual(post, sent);
  });

  it(`send post as multipart/form-data`, async () => {
    const sent = {
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: 100
    };

    const response = await request(app)
      .post(`/api/posts`)
      .field(`description`, sent.description)
      .field(`effect`, sent.effect)
      .field(`hashtags`, sent.hashtags)
      .field(`scale`, sent.scale)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.equal(post.description, sent.description);
    assert.equal(post.effect, sent.effect);
    assert.deepEqual(post.hashtags, sent.hashtags);
    assert.equal(post.scale, sent.scale);
  });
});
