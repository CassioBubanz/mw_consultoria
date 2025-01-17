const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Configuração do Firebase (do arquivo .env)
dotenv.config();

// Inicializando o Firebase Admin SDK com a chave de serviço (que você encontra no console do Firebase)
const serviceAccount = require('./mwconsultoria-e14e4-firebase-adminsdk-mjjla-9b56ceff64.json');  // Caminho para o arquivo JSON da chave de serviço

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`, // Substituímos com o projeto do Firebase
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
    const docRef = db.collection('properties').doc(id);  // Alterado para 'properties'
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const property = docSnap.data();
      
      // Renderizando a página com EJS
      res.render('property', {
        title: property.title,
        description: property.description,
        image: property.imageUrl,  // A URL da imagem armazenada no Cloudinary
        url: `https://mwconsultoriaimobiliaria.com.br/properties/${id}`  // Alterado para 'properties'
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
