'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/server`).app;

describe(`POST /api/posts`, () => {
  it(`send post as json`, async () => {
    const sent = {
      filename: {
        name: `keks.png`,
      },
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
      filename: {
        name: `keks.png`,
      },
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: 100
    };

    const response = await request(app)
      .post(`/api/posts`)
      .attach(`filename`, `test/fixtures/keks.png`)
      .field(`description`, sent.description)
      .field(`effect`, sent.effect)
      .field(`hashtags`, sent.hashtags)
      .field(`scale`, sent.scale)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);

    const post = response.body;
    assert.deepEqual(post, sent);
  });

  it(`send post without filename`, async () => {
    const sent = {
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: 100
    };

    const response = await request(app).
    post(`/api/posts`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field name "filename" is required!`
    ]);
  });

  it(`send post without scale`, async () => {
    const sent = {
      filename: {
        name: `keks.png`,
      },
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: `#тачка #огонь #car #bmwX5`,
    };

    const response = await request(app).
    post(`/api/posts`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field name "scale" is required!`
    ]);
  });

  it(`send post scale an invalid value`, async () => {
    const sent = {
      filename: {
        name: `keks.png`,
      },
      description: `Самая красивая тачка на этой планете`,
      effect: `chrome`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: -2,
    };

    const response = await request(app).
    post(`/api/posts`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field name "scale" contains an invalid value!`
    ]);
  });

  it(`send post without effect`, async () => {
    const sent = {
      filename: {
        name: `keks.png`,
      },
      description: `Самая красивая тачка на этой планете`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: 100,
    };

    const response = await request(app).
    post(`/api/posts`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field name "effect" is required!`
    ]);
  });

  it(`send post effect an invalid value`, async () => {
    const sent = {
      filename: {
        name: `keks.png`,
      },
      description: `Самая красивая тачка на этой планете`,
      effect: `sss`,
      hashtags: `#тачка #огонь #car #bmwX5`,
      scale: 100,
    };

    const response = await request(app).
    post(`/api/posts`).
    send(sent).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);


    const errors = response.body;
    assert.deepEqual(errors, [
      `Field name "effect" contains an invalid value!`
    ]);
  });
});
