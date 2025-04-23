import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Navbar from "./Navbar";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/order');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/order/${id}`);
            fetchOrders();
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container fluid className="flex-grow-1 my-5">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h2>Orders</h2>
                    </Col>
                </Row>

                <Row>
                    {orders.map((order) => (
                        <Col key={order.id} md={6} lg={4} className="mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Order #{order.id}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Client ID: {order.client_id}</h6>
                                    <p><strong>Total Price:</strong> ${order.total_price}</p>
                                    <div>
                                        <strong>Products:</strong>
                                        <ul className="list-unstyled mt-2">
                                            {order.products.map((prod, index) => (
                                                <li key={index}>
                                                    Product {prod.product_id} — Qty: {prod.quantity} — $
                                                    {prod.total_price}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => handleDeleteOrder(order.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
};

export default OrdersPage;
