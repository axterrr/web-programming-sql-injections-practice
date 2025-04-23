import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col} from 'react-bootstrap';
import Navbar from "./Navbar";

const ClientsPage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/client');

            const nonAdminClients = response.data.filter(client => client.email !== 'admin');

            setClients(nonAdminClients);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };


    const handleDeleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api//client/${id}`);
            setClients((prevClients) => prevClients.filter((client) => client.id !== id));
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container fluid className="flex-grow-1 my-5">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h2>Clients</h2>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                            <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.id}</td>
                                    <td>{client.first_name}</td>
                                    <td>{client.last_name}</td>
                                    <td>{client.email}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDeleteClient(client.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ClientsPage;
