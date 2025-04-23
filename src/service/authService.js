const clientDAO = require("../dao/clientDAO");
const jwt = require("jsonwebtoken");

async function login(credentials) {
    let client = await clientDAO.findByCredentials(credentials);
    if (!client) {
        throw new Error();
    }
    return jwt.sign({ id: client.id, email: client.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

async function loginsafe(credentials) {
    let client = await clientDAO.findByCredentialsSafe(credentials);
    if (!client) {
        throw new Error();
    }
    return jwt.sign({ id: client.id, email: client.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

async function register(client) {
    await clientDAO.create(client);
    return jwt.sign({ id: client.id, email: client.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
}

module.exports = {
    login,
    loginsafe,
    register,
};
