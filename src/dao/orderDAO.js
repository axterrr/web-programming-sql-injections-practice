const pool = require('./connection/pool');

async function findAll() {
    const [result] = await pool.query('SELECT * FROM order_');
    return result;
}

async function findById(id) {
    const [result] = await pool.query('SELECT * FROM order_ WHERE id = ?', [id]);
    return result[0];
}

async function create(order) {
    const [result] = await pool.query(
        'INSERT INTO order_ (client_id, total_price) VALUES (?, ?)',
        [order.client_id, order.total_price]
    );
    return findById(result.insertId);
}

async function update(order) {
    await pool.query(
        'UPDATE order_ SET client_id = ?, total_price = ? WHERE id = ?',
        [order.client_id, order.total_price, order.id]
    );
    return findById(order.id);
}

async function remove(id) {
    await pool.query('DELETE FROM order_ WHERE id = ?', [id]);
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
