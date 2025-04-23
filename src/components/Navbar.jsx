import { Navbar as BSNavbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <BSNavbar bg="dark" variant="dark">
            <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                    </Nav>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            </Container>
        </BSNavbar>
    );
};

export default Navbar;