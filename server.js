const http = require('http');
const fs = require('fs');
const path = require('path');

// Azure ci dà la porta tramite process.env.PORT. Se non c'è, usiamo la 8080.
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    // Legge il file index.html
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Errore: Impossibile caricare index.html');
            return;
        }
        // Dice al browser che è un file HTML
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`Il server è attivo sulla porta ${port}`);
});