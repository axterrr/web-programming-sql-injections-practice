"use strict";

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { jwtAuthorizationFilter } = require('./src/middleware/authorizationFilter');
const authRoutes = require('./src/route/authRoutes');
const clientRoutes = require('./src/route/clientRoutes');
const productRoutes = require('./src/route/productRoutes');
const orderRoutes = require('./src/route/orderRoutes');

const server = express();
const PORT = process.env.BACKEND_SERVER_PORT || 8888;

server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
server.use(express.json());
server.use("/api/auth", authRoutes);
// server.use(jwtAuthorizationFilter);
server.use("/api/client", clientRoutes);
server.use("/api/product", productRoutes);
server.use("/api/order", orderRoutes);

server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });