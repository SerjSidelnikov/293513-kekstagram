'use strict';

const express = require(`express`);

const DEFAULT_PORT = 3000;
const PORT = process.argv[3] || DEFAULT_PORT;

const app = express();

app.use(express.static(`${__dirname}/../static`));

const runServer = (port) => {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
};

module.exports = {
  name: `server`,
  description: `Start server`,
  execute() {
    runServer(PORT);
  }
};
