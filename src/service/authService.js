const clientDAO = require("../dao/clientDAO");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(credentials) {
    let client = await clientDAO.findByEmail(credentials.email);
    if (!client || !bcrypt.compareSync(credentials.password, client.password)) {
        throw new Error();
    }
    return jwt.sign({ id: client.id, email: client.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

async function register(client) {
    client.password = await bcrypt.hash(client.password, 10);
    await clientDAO.create(client);
    return jwt.sign({ id: client.id, email: client.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

module.exports = {
    login,
    register,
};
