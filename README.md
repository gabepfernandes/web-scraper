# Netshoes Web Scraper

Este projeto é um scraper web que extrai informações de produtos da Netshoes e exibe os dados em uma página HTML.

## Pré-requisitos

- Node.js (versão 12 ou superior)
- NPM (Node Package Manager)

## Instalação

1. Clone este repositório para o seu ambiente local:

    ```sh
    git clone https://github.com/seu-usuario/netshoes-web-scraper.git
    cd netshoes-web-scraper
    ```

2. Instale as dependências do projeto:

    ```sh
    npm install
    ```

## Execução

1. Crie um arquivo `server.js` no diretório raiz do projeto com o seguinte conteúdo:

    ```javascript
    const express = require('express');
    const fetchProductData = require('./fetchProductData');
    const app = express();
    const port = 3000;

    app.get('/api/product', async (req, res) => {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send({ error: 'URL do produto é necessária' });
        }

        const data = await fetchProductData(url);
        if (data) {
            res.send(data);
        } else {
            res.status(500).send({ error: 'Não foi possível obter os dados do produto' });
        }
    });

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
    ```

2. Execute o servidor:

    ```sh
    node server.js
    ```

3. Abra o arquivo `index.html` no seu navegador. Você pode fazer isso abrindo o arquivo diretamente ou usando uma extensão de servidor local como Live Server no VS Code.

## Teste

1. No navegador, insira a URL de um produto da Netshoes no campo de texto e clique em "Buscar Dados".
2. Os dados do produto serão exibidos na página se a URL for válida.

## Estrutura do Projeto

```plaintext
netshoes-web-scraper/
│
├── fetchProductData.js  # Script Node.js para buscar os dados do produto
├── index.html           # Página HTML para exibir os dados do produto
├── package.json         # Arquivo de configuração do NPM
└── server.js            # Servidor Express para fornecer a API
# web-scraper
