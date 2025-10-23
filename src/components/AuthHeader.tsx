
import "bootstrap";
import { Link } from "react-router";
import "../styles/authHeader.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router';
import '../styles/HeaderAuth.css'
import Cookies from "js-cookie";


const AuthHeader = () => {
  
  const navigate = useNavigate();

  const handleLogout = () =>{
    Cookies.remove('access');
    navigate("/login");
  } 

  return (

    <Navbar expand="lg" className="bg-body-primary">
      <Container className='contain'>
        <Navbar.Brand className='logo' as={NavLink} to="/">لوجو</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/dashboard"
            >
              لوحة القيادة
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/book"
            >
              الكتاب
            </Nav.Link>
            <Nav.Link href="/login" onClick={handleLogout}>تسجيل خروج</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AuthHeader;