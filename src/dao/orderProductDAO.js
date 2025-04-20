const pool = require('./connection/pool');

async function create(order_product) {
    await pool.query(
        'INSERT INTO order_product (product_id, order_id, quantity, total_price) VALUES (?, ?, ?, ?)',
        [order_product.product_id, order_product.order_id, order_product.quantity, order_product.total_price]
    );
}

async function findByOrderId(orderId) {
    const [result] = await pool.query('SELECT * FROM order_product WHERE order_id = ?', [orderId]);
    return result;
}

async function removeByOrderId(orderId) {
    const [result] = await pool.query('DELETE FROM order_product WHERE order_id = ?', [orderId]);
    return result;
}

module.exports = {
    create,
    findByOrderId,
    removeByOrderId,
};
