'use strict';

const express = require(`express`);
const {postsRouter} = require(`./posts/route`);

const DEFAULT_PORT = 3000;
const PORT = process.argv[3] || DEFAULT_PORT;

const notFoundHandler = (req, res) => {
  res.status(404).send(`Page not found`);
};

const errorHandler = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

const app = express();

app.use(express.static(`${__dirname}/../static`));

app.use(`/api/posts`, postsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

const runServer = (port) => {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
};

module.exports = {
  name: `server`,
  description: `Start server`,
  execute() {
    runServer(PORT);
  },
  app,
};
