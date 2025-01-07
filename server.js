const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');

const port = parseInt(process.env.PORT || process.env.ALWAYSDATA_HTTPD_PORT || '3000', 10);
const dev = false; // Mettre true pour le mode développement
const app = next({ dev });
const handle = app.getRequestHandler();

const publicFolder = path.join(__dirname, 'public'); // Dossier contenant les fichiers statiques

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Vérifier si la requête concerne une image
    if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      const filePath = path.join(publicFolder, pathname); // Chemin vers le fichier dans le dossier "public"
      
      // Vérifier si le fichier existe
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          // Le fichier existe, le retourner
          res.writeHead(200, { 'Content-Type': getContentType(filePath) });
          fs.createReadStream(filePath).pipe(res);
        } else {
          // Le fichier n'existe pas, laisser Next.js gérer la requête
          handle(req, res, parsedUrl);
        }
      });
    } else {
      // Requête normale, laisser Next.js gérer
      handle(req, res, parsedUrl);
    }
  }).listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`
    );
  });
});

// Fonction utilitaire pour déterminer le type MIME des fichiers
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}
