const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;

// Mappa i tipi di file (MIME types) così il browser capisce cosa sta ricevendo
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
    console.log('Richiesta per:', req.url);

    // Se l'utente chiede la root "/", serviamo index.html
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Troviamo l'estensione del file
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Leggiamo il file richiesto
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT'){
                // File non trovato
                res.writeHead(404);
                res.end('File non trovato: ' + filePath);
            } else {
                // Errore del server
                res.writeHead(500);
                res.end('Errore server: ' + error.code);
            }
        } else {
            // Successo: inviamo il file con il tipo giusto
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

}).listen(port, () => {
    console.log(`Server attivo sulla porta ${port}`);
});