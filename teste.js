const axios = require('axios');
const cheerio = require('cheerio');
const readlineSync = require('readline-sync');

async function fetchProductData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extraindo os dados do produto
    const title = $('.product-name').text().trim();
    const price = $('.saleInCents-value').first().text().trim();
    const image = $('.showcase figure > img').attr('src');
    const description = $('.showcase-details').text().trim();
    return { title, price, image, description };
  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error.message);
  }
}

function main() {
  const productUrl = readlineSync.question('Digite a URL do produto: ');
  // const productUrl = 'https://www.netshoes.com.br/p/tenis-nike-air-max-masculino-preto+branco-HZM-5168-026';
  fetchProductData(productUrl).then((productData) => {
    if (productData) {
      console.log('Dados do Produto:');
      console.log(`Título: ${productData.title}`);
      console.log(`Preço: ${productData.price}`);
      console.log(`Imagem: ${productData.image}`);
      console.log(`Descrição: ${productData.description}`);
    } else {
      console.log('Não foi possível obter os dados do produto.');
    }
  });
}

main();
