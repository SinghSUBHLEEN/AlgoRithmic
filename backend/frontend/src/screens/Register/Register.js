import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner, Alert } from "react-bootstrap";
import ErrorIcon from '@mui/icons-material/Error';
import "./Register.css";
import axios from "axios";
import cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
export default function Register() {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [alert, setAlert] = useState("");

  const cook = cookie.get('token');
  useEffect(() => {
    if (cook)
      navigate('/');
  })
  const [data, setData] = useState({
    lname: "",
    fname: "",
    email: "",
    password: "",
    confirm_password: "",
    rem: "off"
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    setClick(true);
    setAlert("");
    event.preventDefault();
    axios.post("/api/register", data).then((res) => {
      if (res.status !== 201) {
        throw (res);
      }
      else {
        navigate('/')
        setClick(false);
        setAlert("");
      }
    }).catch(err => {
      setClick(false);
      if (err.response.status === 400 || err.response.status === 501) {
        setAlert(err.response.data.error);
      }
      else
        console.log(err);
    });
  };


  const str = "Already have an account ?   ";

  const loginF = () => {
    navigate('/login');
  }

  return (
    <>
      <Navbar hide={true} />
      <div className="formContainer">
        <div className="myForm d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-7 signup-form loginContainer">
            <Form.Group className="mb-3">
              <h1 className="loginHead">Register</h1>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><span className="star">* </span>First Name</Form.Label>
              <Form.Control
                className="mb-3"
                controlId="formBasicEmail"
                type="text"
                placeholder="Enter First Name"
                name="fname"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                className="mb-3"
                controlId="formBasicEmail"
                type="text"
                placeholder="Enter Last Name"
                name="lname"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><span className="star">* </span>Email Address</Form.Label>
              <Form.Control
                className="mb-3"
                controlId="formBasicEmail"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><span className="star">* </span>Password</Form.Label>
              <Form.Control
                className="email-input"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><span className="star">* </span>Confirm Password</Form.Label>
              <Form.Control
                className="email-input"
                type="text"
                placeholder="Re-enter Password"
                name="confirm_password"
                onChange={handleInput}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember me"
                name="rem"
                onChange={handleInput}
              ></Form.Check>
            </Form.Group>
            <Form.Group className="mb-3">
              {!click ? <><Button
                className="submit-button"
                variant="primary"
                value="submit"
                type="submit"
                onClick={handleSubmit}
              >
                Sign up
              </Button></> : <><Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button></>}
            </Form.Group>
            <Form.Group>
              <Form.Text>{str}
                <a onClick={loginF} className="an"> Sign in here!</a>
              </Form.Text>
            </Form.Group>
            {alert !== "" ? <><Alert style={{ backgroundColor: "rgba(203, 0, 0, 0.8)" }} className="m-3" key="danger" variant="danger">
              <ErrorIcon></ErrorIcon>{"  "}{alert}
            </Alert></> : <></>}
          </Form>
        </div>
      </div>
    </>
  );
}
