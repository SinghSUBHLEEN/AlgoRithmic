import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "", rem: 0 });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.event });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <div className="formContainer">
      <div className="myForm d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-7 signup-form loginContainer">
          <Form.Group className="mb-3">
            <h1 className="heading">Login</h1>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="mb-3"
              controlId="formBasicEmail"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="email-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
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
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
