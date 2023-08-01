import React from "react";
import "./Navbar.css";
import { changeMode, modeReducer } from "../../actions/actions";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarB from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cookie from 'js-cookie';
import { Row, Col } from "react-bootstrap";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteCookie = () => {
    cookie.remove("token");
    cookie.remove("fname");
    cookie.remove("lname");
    // dispatch(incrementMode());
    // dispatch(incrementMode());
    // dispatch(changeMode());
    navigate('/');
  }

  const cook = cookie.get('token');

  const loginF = () => {
    // dispatch(changeMode());
    navigate('/login');
  }

  const homeF = () => {
    navigate('/home');
  }

  const roadF = () => {
    navigate('/road');
  }

  const registerF = () => {
    // dispatch(changeMode());
    navigate('/register');
  }

  const problemF = () => {
    // dispatch(changeMode());
    navigate('/problems');
  }

  const landF = () => {
    // dispatch(changeMode());
    navigate('/');
  }

  const mylistF = () => {
    // dispatch(changeMode());
    navigate('/mylists');
  }

  const myProfile = () => {
    navigate('/profile');
  }

  return (
    <>
      <NavbarB collapseOnSelect expand="sm" sticky="top" className="color-nav fefefaf" variant="dark">
        <Container>
          <NavbarB.Brand onClick={landF} className="an fefefaf">AlgoRithmic</NavbarB.Brand>
          <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
          <NavbarB.Collapse id="responsive-navbar-nav afadda">
            <Nav className="me-auto">
              <Nav.Link onClick={homeF}>Roadmap</Nav.Link>
              <Nav.Link onClick={problemF}>Problems</Nav.Link>
              {/* <Nav.Link onClick={roadF}>Road</Nav.Link> */}
              {cook ? <Nav.Link onClick={mylistF}>{"My Lists"}</Nav.Link> : <></>}
            </Nav>
            <Nav>
              {props.hide ? <></> : (<><NavDropdown className="custom-nav-drop" title={<AccountCircleIcon style={{ color: "ghostwhite", marginLeft: "1rem", fontSize: "1.7rem" }}></AccountCircleIcon>} id="collasible-nav-dropdown">
                {cook ? <><NavDropdown.Item onClick={myProfile}>My Profile</NavDropdown.Item><NavDropdown.Divider /></> : <></>}
                {cook ? (
                  <NavDropdown.Item onClick={deleteCookie}>Logout</NavDropdown.Item>
                ) : <NavDropdown.Item onClick={loginF}>Login</NavDropdown.Item>}
                {cook ? (
                  <></>
                ) : <NavDropdown.Item onClick={registerF}>Register</NavDropdown.Item>}

              </NavDropdown></>)
              }
            </Nav>
          </NavbarB.Collapse>

        </Container>
      </NavbarB>
    </>
  );
};

export default Navbar;
