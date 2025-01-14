const functions = require("firebase-functions/v2");
const express = require("express");
const prerender = require("prerender-node");
const path = require("path");

const app = express();

// Configurar o token do Prerender.io
app.use(prerender.set("prerenderToken", "dgckNoHenEzj3jIxm1x6"));

// Rota de teste
app.get("/", (req, res) => {
  res.send("Prerender.io configurado com sucesso!");
});

// Exportar a função usando HTTPS
exports.app = functions.https.onRequest(app);
