const { addProduct, showProduct, spesificProduct, editProduct, deleteProduct } = require('../controller/produkController');
const upload = require('../middleware/multer');

const app = require('express')
const router = app.Router()


router.post('/product', upload.single('photo_product'), addProduct);
router.get('/product', showProduct);
router.get('/product/:id', spesificProduct);
router.put('/product/:id', upload.single('photo_product'), editProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;
