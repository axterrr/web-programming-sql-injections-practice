const clientDAO = require('../dao/clientDAO');
const bcrypt = require("bcryptjs");

async function getAllClients() {
    return await clientDAO.findAll();
}

async function getClient(id) {
    return await clientDAO.findById(id);
}

async function createClient(client) {
    client.password = await bcrypt.hash(client.password, 10);
    return await clientDAO.create(client);
}

async function updateClient(client) {
    client.password = await bcrypt.hash(client.password, 10);
    return await clientDAO.update(client);
}

async function deleteClient(id) {
    return await clientDAO.remove(id);
}

module.exports = {
    getAllClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
};
