const pool = require('./connection/pool');

async function findAll() {
    const [result] = await pool.query('SELECT * FROM client');
    return result;
}

async function findById(id) {
    const [result] = await pool.query('SELECT * FROM client WHERE id = ?', [id]);
    return result[0];
}

async function create(client) {
    const [result] = await pool.query(
        'INSERT INTO client (first_name, last_name, age, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?)',
        [client.first_name, client.last_name, client.age, client.phone_number, client.email, client.password]
    );
    return findById(result.insertId);
}

async function update(client) {
    await pool.query(
        'UPDATE client SET first_name = ?, last_name = ?, age = ?, phone_number = ?, email = ?, password = ? WHERE id = ?',
        [client.first_name, client.last_name, client.age, client.phone_number, client.email, client.password, client.id]
    );
    return findById(client.id);
}

async function remove(id) {
    await pool.query('DELETE FROM client WHERE id = ?', [id]);
}

async function findByCredentials(credentials) {
    let query = `SELECT * FROM client WHERE email = '${credentials.email}' AND password = '${credentials.password}'`;
    const [result] = await pool.query(query);
    return result[0];
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findByCredentials,
};
