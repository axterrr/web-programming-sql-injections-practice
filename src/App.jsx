import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import ClientsPage from "./components/ClientsPage";
import ProductsPage from "./components/ProductsPage";
import OrdersPage from "./components/OrdersPage";
import LoginSafe from "./components/LoginSafe";

function App() {
    return (
        <Router>
                <Container className="mt-4">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/safe" element={<LoginSafe />} />
                        <Route path="/clients" element={<ClientsPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                    </Routes>
                </Container>
        </Router>
    );
}

export default App;
