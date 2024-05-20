const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const produkRouter = require('./src/router/produkRouter'); // Ubah nama variabel dari 'produk' menjadi 'produkRouter'
const keranjangRouter = require('./src/router/keranjangRouter'); // Ubah nama variabel dari 'keranjang' menjadi 'keranjangRouter'

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan('combined'));
app.use(cors());

// Gunakan route yang sudah di-import
app.use(produkRouter); // Tambahkan prefix '/produk' pada route produk
app.use(keranjangRouter); // Tambahkan prefix '/keranjang' pada route keranjang

app.listen(3000, () => {
  console.log(`App running on server`);
});

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "server running" });
});

module.exports = app