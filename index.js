const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const produk = require('./src/router/produkRouter');
const keranjang = require('./src/router/keranjangRouter');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan('combined'));
app.use(cors());

// Gunakan route yang sudah di-import
app.use( produk); // Tambahkan prefix '/produk' pada route produk
app.use( keranjang); // Tambahkan prefix '/keranjang' pada route keranjang

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = app;

