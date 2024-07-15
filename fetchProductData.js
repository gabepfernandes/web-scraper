const axios = require('axios');
const cheerio = require('cheerio');

async function fetchProductData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('.product-name').text().trim();
    const price = $('.saleInCents-value').first().text().trim();
    const image = $('.color__image').attr('src');
    const description = $('.showcase-details').text().trim();

    return { title, price, image, description };
  } catch (error) {
    console.error('Erro ao buscar dados do produto:', error.message);
    return null;
  }
}

module.exports = fetchProductData;
