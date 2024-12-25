const {createServer} = require('http')
const {parse} = require('url')
const next = require('next')
const fs = require('fs-extra');
const path = require('path');
 
const port = parseInt(process.env.PORT || '3000', 10)
const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)

    const { pathname } = parsedUrl;

    // Serve images from the public directory
    if (pathname.startsWith('/formations/') || pathname.startsWith('/contact-images/')) {
      const imagePath = path.join(__dirname, 'public', pathname);
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          console.error(err);
          res.statusCode = 404;
          res.end('Image not found'); 
        } else {
          res.setHeader('Content-Type', 'image/*');
          res.end(data);
        }
      });
    } else {
      // Let Next.js handle all other requests
      handle(req, res, parsedUrl);
    }
  }).listen(port)
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})