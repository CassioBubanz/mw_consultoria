const express = require('express');
const path = require('path');
const prerender = require('prerender-node');  // Adiciona o Prerender.io

const app = express();
const port = process.env.PORT || 5000;

// Adiciona o seu token do Prerender.io
prerender.set('prerenderToken', 'kcj4JCm2sJcqGgjBaOn3');  // Substitua pelo seu token

// Configura o Prerender.io
app.use(prerender);

// Serve os arquivos estáticos da pasta "build" do React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Qualquer requisição para um caminho que não existe, redireciona para o index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
