import { React, useEffect, useState } from "react";
import Nav from "../Navbar/Navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./landing.css";
import { CBadge } from '@coreui/react'
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { DiCode } from "react-icons/di";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Landing = () => {

    const cook = cookie.get("token");
    const navigate = useNavigate();

    const [text, setText] = useState("#78184A");

    useEffect(() => {
        if (cook)
            navigate('/home');
    }, []);

    const handleClick = () => {
        navigate('/login')
    }

    const handleMouse = () => {
        setText("white");
    }

    return <>
        <Nav />
        <Container fluid>
            <Row className="content">
                <Col md="auto"></Col>
                <Col lg={5}>
                    <Row>
                        <h1 className="custom-h1-land">AlgoRithmic</h1>
                    </Row>
                    <Row>
                        <Container fluid className="m-1 custom-p-land">
                            The best way to learn Programming and prepare for Coding interviews.
                        </Container>
                    </Row>
                    <Row>
                        <Container fluid style={{ textAlign: "left", fontSize: "3rem", marginTop: "2rem" }} >
                            <CBadge onClick={handleClick} className="land-badge" color="info-gradient" shape="rounded-pill"><div className="text" textColor={text}>Sign in</div></CBadge>
                        </Container>
                    </Row>
                </Col>
                <Col >
                    <Row margin="auto">
                        <Col>{" "}</Col>
                    </Row>
                    <Row style={{ justifyContent: "right", textAlign: "right" }}>
                        <DiCode style={{ marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto", fontSize: "10rem", color: "ghostwhite", textAlign: "center" }}></DiCode>
                    </Row>
                </Col>
                <Col md="auto"></Col>
            </Row >
            <Container style={{ marginTop: "10rem" }}>
                <Row>
                    <Col>
                        <h1 className="custom-practice">Practice for Free</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={2}></Col>
                    <Col lg={8}>
                        <Card style={{ width: 'auto', marginLeft: "auto", marginRight: "auto", boxShadow: "none", paddingTop: "0.5rem" }}>
                            <Card.Body>
                                <Card.Text style={{ color: "ghostwhite" }}>
                                    <h4 className="card-details">
                                        <TaskAltIcon style={{ color: "green", fontSize: "1.6rem" }}></TaskAltIcon>
                                        {" "}Well designed study plan and Roadmap
                                    </h4>
                                    <h4 className="card-details">
                                        <TaskAltIcon style={{ color: "green", fontSize: "1.6rem" }}></TaskAltIcon>
                                        {" "}Register and Sign in to save all your progress
                                    </h4>
                                    <h4 className="card-details">
                                        <TaskAltIcon style={{ color: "green", fontSize: "1.6rem" }}></TaskAltIcon>
                                        {" "}Sign in and create your own problems list
                                    </h4>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="auto"></Col>
                </Row>
                <Row>
                    <Col>
                        <Container fluid style={{ textAlign: "right", fontSize: "3rem", marginTop: "2rem" }} >
                            <CBadge onClick={handleClick} className="land-badge-1" color="info-gradient" shape="rounded-pill"><div className="text" textColor={text}>Start Practicing</div></CBadge>
                        </Container>
                    </Col>
                    <Col>
                        <Container fluid style={{ textAlign: "left", fontSize: "3rem", marginTop: "2rem", marginBottom: "3rem" }} >
                            <CBadge onClick={handleClick} className="land-badge-2" color="info-gradient" shape="rounded-pill"><div className="text" textColor={text}>View Roadmap</div></CBadge>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container >
    </>
}

export default Landing;