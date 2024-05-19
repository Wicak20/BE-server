const express = require('express'); // Mengimpor modul express
const router = express.Router(); // Menggunakan Router dari modul express

const { addCart, showCart, deleteCartProduct, updateStatus, showMyBought } = require('../controller/keranjangController');

router.post('/cart/:id', addCart);
router.get('/cart', showCart);
router.delete('/cart/:id', deleteCartProduct);
router.put('/cart/:id', updateStatus);
router.get('/history', showMyBought);

module.exports = router;
