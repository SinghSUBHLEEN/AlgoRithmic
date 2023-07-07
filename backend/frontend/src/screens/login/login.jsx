import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner, Alert } from "react-bootstrap";
import ErrorIcon from '@mui/icons-material/Error';
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from 'js-cookie';
import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
export default function Login() {

  const cook = cookie.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (cook)
      navigate('/');
  }, []);

  const [data, setData] = useState({ email: "", password: "", rem: 'off' });

  const [click, setClick] = useState(false);

  const [alert, setAlert] = useState("");

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    setClick(true);
    setAlert("");
    event.preventDefault();
    axios.post("/api/login", data).then((res) => {
      // console.log(res.data);
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
        // alert(err.response.data.error);
        setAlert(err.response.data.error);
      }
      else
        console.log(err);
    });
  };

  const [show, setShow] = useState(true);

  const handleRegister = (event) => {
    navigate('/register');
  }
  const str = "No account ? ";
  return (
    <>
      <Navbar hide={true} />
      <div className="formContainer">
        <div className="myForm d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-7 signup-form loginContainer">
            <Form.Group className="mb-3">
              <h1 className="loginHead">Login</h1>
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
                Sign in
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
                <a onClick={handleRegister} className="an"> Create here!</a>
              </Form.Text>
            </Form.Group>
            {alert !== "" ? <><Alert style={{ backgroundColor: "rgba(203, 0, 0, 0.8)" }} className="m-3" key="danger"  >
              <ErrorIcon></ErrorIcon>{"  "}{alert}
            </Alert></> : <></>}
          </Form>
        </div>
      </div >
    </>
  );
}




// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "./login.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// export default function Login() {
//   const [data, setData] = useState({ email: "", password: "", rem: 0 });
//   const navigate = useNavigate();
//   const handleInput = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };
//   const func = (p) => {
//     console.log(p);
//     if (p) {
//       localStorage.setItem("userInfo", JSON.stringify(p));
//       navigate("/home");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("/api/login", data)
//       .then((res) => console.log(func(res)))
//       .catch((err) => console.log(err));
//   };

//   const handleRegister = (event) => { };
//   const str = "No account ? ";
//   return (
//     <div className="formContainer">
//       <div className="myForm d-flex justify-content-center align-items-center">
//         <Form className="rounded p-4 p-sm-7 signup-form loginContainer">
//           <Form.Group className="mb-3">
//             <h1 className="loginHead">Login</h1>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               className="mb-3"
//               controlId="formBasicEmail"
//               type="email"
//               placeholder="Enter Email"
//               name="email"
//               onChange={handleInput}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               className="email-input"
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               onChange={handleInput}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Check
//               type="checkbox"
//               label="Remember me"
//               name="rem"
//               onChange={handleInput}
//             ></Form.Check>
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Button
//               className="submit-button"
//               variant="primary"
//               value="submit"
//               type="submit"
//               onClick={handleSubmit}
//             >
//               Sign in
//             </Button>
//           </Form.Group>
//           <Form.Group>
//             <Form.Text>
//               {str}
//               <a href="/register" onClick={handleRegister}>
//                 {" "}
//                 Create here!
//               </a>
//             </Form.Text>
//           </Form.Group>
//         </Form>
//       </div>
//     </div>
//   );
// }