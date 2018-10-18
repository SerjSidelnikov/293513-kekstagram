'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/server`).app;
const {posts} = require(`../src/posts/route`);

describe(`GET /api/posts`, () => {
  it(`get all posts`, async () => {

    const response = await request(app).
    get(`/api/posts`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const dataPosts = response.body;
    assert.equal(dataPosts.length, 50);
  });

  it(`get all posts with / at the end`, async () => {

    const response = await request(app).
    get(`/api/posts/`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const dataPosts = response.body;
    assert.equal(dataPosts.length, 50);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
    get(`/api/aaaa`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Page not found`).
    expect(`Content-Type`, /html/);
  });

  it(`get skip and limit posts`, async () => {
    const skip = 5;
    const limit = 5;
    const response = await request(app).
    get(`/api/posts?skip=${skip}&limit=${limit}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const dataPosts = response.body;
    assert.equal(dataPosts.length, 5);
  });
});

describe(`GET /api/posts/:date`, () => {
  it(`get post with date`, async () => {
    const postDate = posts[0].date;
    const response = await request(app).
    get(`/api/posts/${postDate}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const dataPosts = response.body;
    assert.strictEqual(dataPosts.date, postDate);
  });

  it(`get unknown post with date`, async () => {
    const postDate = 3;
    return request(app).
    get(`/api/posts/${postDate}`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Пост с такой датой "${postDate}" не найден.`).
    expect(`Content-Type`, /html/);
  });
});

