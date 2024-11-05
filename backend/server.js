"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var router_1 = require("./router");
var PORT = 3000;
var server = http.createServer(function (req, res) {
    // Gérer CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000'); // Autorise les requêtes depuis votre client
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Méthodes autorisées
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // En-têtes autorisés
    // Si la requête est un pré-vol (OPTIONS), répondez avec un statut 204 et terminez la requête
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    (0, router_1.default)(req, res);
});
server.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
