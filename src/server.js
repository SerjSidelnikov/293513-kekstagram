'use strict';

const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);
const {contentType} = require(`./data/data`);

const HOSTNAME = `127.0.0.1`;
const DEFAULT_PORT = 3000;
const PORT = process.argv[3] || DEFAULT_PORT;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const printDirectory = (relativePath, files) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Directory content</title>
      </head>

      <body>
        <ul>
          ${files.map((it) => `<li><a href="${relativePath}/${it}">${it}</a></li>`).join(``)}
        </ul>
      </body>
    </html>
  `;
};

const readFile = async (pathValue, res) => {
  const data = await readfile(pathValue);
  const ext = path.extname(pathValue).slice(1);
  const type = contentType[ext] ? contentType[ext] : `text/plain`;
  res.setHeader(`content-type`, type);
  res.end(data);
};

const readDir = async (pathValue, res) => {
  const files = await readdir(pathValue);
  const content = printDirectory(pathValue, files);
  res.setHeader(`content-type`, `text/html`);
  res.end(content);
};

const server = http.createServer((req, res) => {
  const {pathname} = url.parse(req.url);
  const filename = path.basename(pathname);
  const absolutePath = path.join(__dirname, `..`, `static`, filename);

  (async () => {
    try {
      const pathStat = await stat(absolutePath);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

module.exports = {
  name: `server`,
  description: `Start server`,
  execute() {
    server.listen(PORT, HOSTNAME, (err) => {
      if (err) {
        return console.error(err);
      }
      return console.log(`Server running at http://${HOSTNAME}:${PORT}`);
    });
  }
};
