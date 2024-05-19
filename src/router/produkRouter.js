const express = require('express'); // Perhatikan penggunaan modul express yang benar
const router = express.Router(); // Menggunakan express.Router() untuk membuat router baru
const { addProduct, showProduct, spesificProduct, editProduct, deleteProduct } = require('../controller/produkController');
const upload = require('../middleware/multer');

router.post('/product', upload.single('photo_product'), addProduct);
router.get('/product', showProduct);
router.get('/product/:id', spesificProduct);
router.put('/product/:id', upload.single('photo_product'), editProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;
