const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const baseURl = `http://api.scraperapi.com?api_key = ${apiKey}&autoparse=true`
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=tue`

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.')
});

//Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});


//Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    try {
        const response = await request(`${generateScraperUrl(apikey)}&url=https://www.amazon.com/dp/product-reviews${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
