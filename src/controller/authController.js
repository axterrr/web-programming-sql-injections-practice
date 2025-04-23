const authService = require('../service/authService');

async function login(req, res) {
    const result = await authService.login(req.body);
    res.status(200).json(result);
}

async function loginsafe(req, res) {
    const result = await authService.loginsafe(req.body);
    res.status(200).json(result);
}

async function register(req, res) {
    const result = await authService.register(req.body);
    res.status(200).json(result);
}

module.exports = {
    login,
    register,
    loginsafe,
};
