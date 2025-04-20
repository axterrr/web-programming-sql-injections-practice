const jwt = require("jsonwebtoken");

function jwtAuthorizationFilter(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Please, log in to have access to this resouce." });
    }
    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return res.status(403).json({ error: "Your session has ended. Please, log in again." });
    }
}

module.exports = {
    jwtAuthorizationFilter,
};
