const orderDAO = require('../dao/orderDAO');
const productDAO = require('../dao/productDAO');
const orderProductDAO = require('../dao/orderProductDAO');

async function getAllOrders() {
    const orders = await orderDAO.findAll();
    for (const order of orders) {
        order.products = await orderProductDAO.findByOrderId(order.id);
    }
    return orders;
}

async function getOrder(id) {
    const order = await orderDAO.findById(id);
    order.products = await orderProductDAO.findByOrderId(order.id);
    return order;
}

async function processOrderProducts(items) {
    return await Promise.all(items.map(async item => {
        const product = await productDAO.findById(item.product_id);
        return {
            product_id: product.id,
            quantity: item.quantity,
            total_price: product.price * item.quantity,
        };
    }));
}

async function createOrderProducts(orderId, items) {
    await Promise.all(items.map(async item => {
        await orderProductDAO.create({
            order_id: orderId,
            ...item,
        });
    }))
}

async function createOrder(orderData) {
    let productList = await processOrderProducts(orderData.products);
    const order = await orderDAO.create({
        client_id: orderData.client_id,
        order_date: new Date(),
        total_price: productList.reduce((acc, prod) => acc + prod.total_price, 0),
    });
    await createOrderProducts(order.id, productList);
    return await getOrder(order.id);
}

async function updateOrder(orderData) {
    let productList = await processOrderProducts(orderData.products);
    await orderProductDAO.removeByOrderId(orderData.id);
    await orderDAO.update({
        id: orderData.id,
        client_id: orderData.client_id,
        order_date: new Date(),
        total_price: productList.reduce((acc, prod) => acc + prod.total_price, 0),
    });
    await createOrderProducts(orderData.id, productList);
    return await getOrder(orderData.id);
}

async function deleteOrder(id) {
    await orderDAO.remove(id);
    await orderProductDAO.removeByOrderId(id);
}

module.exports = {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};
