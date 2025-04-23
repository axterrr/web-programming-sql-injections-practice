const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.get('/client/:clientId', orderController.getOrdersByClientId);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
