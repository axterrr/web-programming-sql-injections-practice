const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientController');

router.get('/', clientController.getAllClients);
router.post('/', clientController.createClient);
router.get('/:id', clientController.getClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
