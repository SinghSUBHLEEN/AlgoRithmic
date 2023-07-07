import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarB from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import cookie from 'js-cookie';
const Navbar = (props) => {
  const navigate = useNavigate();
  const deleteCookie = () => {
    cookie.remove("token");
    cookie.remove("fname");
    cookie.remove("lname");
    navigate('/login');
  }

  const cook = cookie.get('token');

  const loginF = () => {
    navigate('/login');
  }

  const homeF = () => {
    navigate('/');
  }

  const roadF = () => {
    navigate('/road');
  }

  const registerF = () => {
    navigate('/register');
  }

  const problemF = () => {
    navigate('/problems');
  }

  const mylistF = () => {
    navigate('/mylists');
  }

  return (
    <NavbarB collapseOnSelect expand="lg" sticky="top" className="color-nav" variant="dark" bg='info'>
      <Container>
        <NavbarB.Brand onClick={homeF} className=".an">Algorithmic</NavbarB.Brand>
        <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarB.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={homeF}>Roadmap</Nav.Link>
            <Nav.Link onClick={problemF}>Problems</Nav.Link>
            <Nav.Link onClick={roadF}>Road</Nav.Link>
          </Nav>
          <Nav>
            {props.hide ? <></> : (<NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={mylistF}>My Lists</NavDropdown.Item>
              <NavDropdown.Divider />
              {cook ? (
                <NavDropdown.Item onClick={deleteCookie}>Logout</NavDropdown.Item>
              ) : <NavDropdown.Item onClick={loginF}>Login</NavDropdown.Item>}
              {cook ? (
                <></>
              ) : <NavDropdown.Item onClick={registerF}>Register</NavDropdown.Item>}

            </NavDropdown>)
            }

          </Nav>
        </NavbarB.Collapse>
      </Container>
    </NavbarB>
  );
};

export default Navbar;