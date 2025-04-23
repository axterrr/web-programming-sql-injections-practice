import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Col, Modal, Form, Card} from 'react-bootstrap';
import Navbar from "./Navbar";

const ProductsPage = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/product');
            const data = await response.json();
            setFilteredProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
        });
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/product/${id}`, {
                method: 'DELETE',
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = selectedProduct ? 'PUT' : 'POST';
            const url = selectedProduct
                ? `http://localhost:8080/api/product/${selectedProduct.id}`
                : 'http://localhost:8080/api/product';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Failed to save product');
            handleModalClose();
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };


    const handleModalClose = () => {
        setSelectedProduct(null);
        setFormData({ name: '', description: '', price: '' });
        setShowModal(false);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
                <Container fluid className="my-5">
                    <Row className="mb-3">
                        <Col className="d-flex justify-content-between align-items-center">
                            <h2>Products</h2>
                            <Button variant="primary" onClick={() => setShowModal(true)}>
                                Add Product
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        {filteredProducts.map((product) => (
                            <Col md={4} lg={3} key={product.id} className="mb-4">
                                <Card className="h-100 d-flex flex-column">
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
                                        <Card.Text>
                                            <strong>Price: </strong>${product.price}
                                        </Card.Text>
                                        <div className="mt-auto d-flex justify-content-between">
                                            <Button size="sm" variant="warning" onClick={() => handleEditClick(product)}>
                                                Edit
                                            </Button>
                                            <Button size="sm" variant="danger" onClick={() => handleDeleteClick(product.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="productName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="productDescription" className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="productPrice" className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter product price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100">
                                    {selectedProduct ? 'Save Changes' : 'Add Product'}
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Container>
        </div>
    );
};

export default ProductsPage;
