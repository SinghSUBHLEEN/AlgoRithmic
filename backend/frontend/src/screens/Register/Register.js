import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Register.css";
import axios from "axios";
import cookie from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
export default function Register() {
  const navigate = useNavigate();
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
    event.preventDefault();
    axios.post("/api/register", data).then((res) => {
      if (res.status !== 201) {
        throw (res);
      }
      else {
        navigate('/')
      }
    }).catch(err => {
      if (err.response.status === 400 || err.response.status === 501) {
        alert(err.response.data.error);
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
              <Button
                className="submit-button"
                variant="primary"
                value="submit"
                type="submit"
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Text>{str}
                <a onClick={loginF} className="an"> Sign in here!</a>
              </Form.Text>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}
