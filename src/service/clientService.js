const clientDAO = require('../dao/clientDAO');

async function getAllClients() {
    return await clientDAO.findAll();
}

async function getClient(id) {
    return await clientDAO.findById(id);
}

async function createClient(client) {
    return await clientDAO.create(client);
}

async function updateClient(client) {
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
