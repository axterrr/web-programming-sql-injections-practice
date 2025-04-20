const clientService = require('../service/clientService');

async function getAllClients(req, res) {
    const result = await clientService.getAllClients();
    res.status(200).json(result);
}

async function getClient(req, res) {
    const result = await clientService.getClient(req.params.id);
    res.status(200).json(result);
}

async function createClient(req, res) {
    const result = await clientService.createClient(req.body);
    res.status(201).json(result);
}

async function updateClient(req, res) {
    req.body.id = req.params.id;
    const result = await clientService.updateClient(req.body);
    res.status(200).json(result);
}

async function deleteClient(req, res) {
    await clientService.deleteClient(req.params.id);
    res.status(204).json();
}


module.exports = {
    getAllClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
};
