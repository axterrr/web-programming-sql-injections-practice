const productDAO = require('../dao/productDAO');

async function getAllProducts() {
    return await productDAO.findAll();
}

async function getProduct(id) {
    return await productDAO.findById(id);
}

async function createProduct(user) {
    return await productDAO.create(user);
}

async function updateProduct(user) {
    return await productDAO.update(user);
}

async function deleteProduct(id) {
    return await productDAO.remove(id);
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
