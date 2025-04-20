const orderService = require('../service/orderService');

async function getAllOrders(req, res) {
    const result = await orderService.getAllOrders();
    res.status(200).json(result);
}

async function getOrder(req, res) {
    const result = await orderService.getOrder(req.params.id);
    res.status(200).json(result);
}

async function createOrder(req, res) {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
}

async function updateOrder(req, res) {
    req.body.id = req.params.id;
    const result = await orderService.updateOrder(req.body);
    res.status(200).json(result);
}

async function deleteOrder(req, res) {
    await orderService.deleteOrder(req.params.id);
    res.status(204).json();
}


module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};
