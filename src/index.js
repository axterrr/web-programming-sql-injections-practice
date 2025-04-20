"use strict";

require('dotenv').config({ path: '.env' });

const cors = require('cors');
const express = require('express');
const { jwtAuthorizationFilter } = require('./middleware/authorizationFilter');
const authRoutes = require('./route/authRoutes');
const clientRoutes = require('./route/clientRoutes');
const productRoutes = require('./route/productRoutes');
const orderRoutes = require('./route/orderRoutes');

const server = express();
const PORT = process.env.BACKEND_SERVER_PORT || 8888;

server.use(cors({ origin: `http://localhost:${process.env.FRONTEND_SERVER_PORT}` }));
server.use(express.json());
server.use("/api/auth", authRoutes);
server.use(jwtAuthorizationFilter);
server.use("/api/client", clientRoutes);
server.use("/api/product", productRoutes);
server.use("/api/order", orderRoutes);

server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
