const productService = require('../service/productService');

async function getAllProducts(req, res) {
    const result = await productService.getAllProducts();
    res.status(200).json(result);
}

async function getProduct(req, res) {
    const result = await productService.getProduct(req.params.id);
    res.status(200).json(result);
}

async function createProduct(req, res) {
    const result = await productService.createProduct(req.body);
    res.status(201).json(result);
}

async function updateProduct(req, res) {
    req.body.id = req.params.id;
    const result = await productService.updateProduct(req.body);
    res.status(200).json(result);
}

async function deleteProduct(req, res) {
    await productService.deleteProduct(req.params.id);
    res.status(204).json();
}


module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
