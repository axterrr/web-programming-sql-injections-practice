const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
