import * as http from "http";
import router from "./router";

const PORT = 3000;

const server = http.createServer((req, res) => {
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

  router(req, res); 
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
