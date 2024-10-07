const axios = require('axios');
const cheerio = require('cheerio');

async function fetchProductData(url) {
  try {
    if (!url || !url.startsWith('http')) {
      throw new Error('URL inválida. Por favor, insira uma URL válida.');
    }

    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Erro na requisição: Código de status ${response.status}`);
    }

    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('.product-name').text().trim();
    if (!title) {
      throw new Error('Não foi possível extrair o título do produto.');
    }

    const price = $('.saleInCents-value').first().text().trim();
    if (!price) {
      throw new Error('Não foi possível extrair o preço do produto.');
    }

    const image = $('img[src*="static.netshoes.com.br"]').attr('src');
    if (!image) {
      throw new Error('Não foi possível extrair a URL da imagem.');
    }

    const description = $('.showcase-details').text().trim();
    if (!description) {
      throw new Error('Não foi possível extrair a descrição do produto.');
    }

    return { title, price, image, description };

  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error.message);

    return { error: error.message };
  }
}

module.exports = fetchProductData;
