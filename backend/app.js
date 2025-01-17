const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Carregando variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializando o Firebase Admin SDK com variáveis de ambiente
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Corrige o formato da chave
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`, // Usando a variável para o URL
});

const db = admin.firestore();

const app = express();

// Configuração do motor de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve arquivos estáticos (para imagens, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para obter e renderizar o imóvel
app.get('/properties/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscando o imóvel na coleção 'properties' do Firestore
    const docRef = db.collection('properties').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();

      // Verifique se 'imagens' está presente nos dados e se é um array
      const images = property.imagens || [];
      
      // Renderizando a página com EJS
      res.render('property', {
        title: property.nm_titulo,          // Certifique-se que o nome do campo é correto
        description: property.ds_descricao, // Certifique-se que o nome do campo é correto
        images: images,                     // Imagens armazenadas no Firestore
        url: `https://mwconsultoriaimobiliaria.com.br/properties/${id}`  // URL personalizada para o imóvel
      });
    } else {
      res.status(404).send('Imóvel não encontrado!');
    }
  } catch (error) {
    console.error("Erro ao acessar o Firestore: ", error);
    res.status(500).send('Erro ao acessar o Firestore');
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
