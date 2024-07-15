const express = require('express');
const fetchProductData = require('./fetchProductData');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/product', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL do produto é necessária' });
  }

  const productData = await fetchProductData(url);
  if (productData) {
    res.json(productData);
  } else {
    res.status(500).json({ error: 'Não foi possível obter os dados do produto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
