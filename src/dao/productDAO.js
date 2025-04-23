const pool = require('./connection/pool');

async function findAll() {
    const [result] = await pool.query('SELECT * FROM product');
    return result;
}

async function findById(id) {
    const [result] = await pool.query('SELECT * FROM product WHERE id = ?', [id]);
    return result[0];
}

async function create(product) {
    const query = `
        INSERT INTO product (name, description, price) 
        VALUES ('${product.name}', '${product.description}', '${product.price}')
    `;
    const [result] = await pool.query(query);
    return findById(result.insertId);
}

async function update(product) {
    await pool.query(
        'UPDATE product SET name = ?, description = ?, price = ? WHERE id = ?',
        [product.name, product.description, product.price, product.id]
    );
    return findById(product.id);
}

async function remove(id) {
    await pool.query('DELETE FROM product WHERE id = ?', [id]);
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
