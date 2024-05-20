const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const produk = require('./src/router/produkRouter');
const keranjang = require('./src/router/keranjangRouter')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(morgan('combined'));
app.use(cors());


app.use(produk);
app.use(keranjang);

app.listen(3000, () => {
  console.log(`App running on server`);
});

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "server running" });
});
