import { React } from "react";
import "./problems.css";
import Nav from "../Navbar/Navbar";
import Grid from "./Grid";
import Navbar from "react-bootstrap";

import { Row, Col, Container } from "react-bootstrap";

const Problems = () => {
    return <>
        <Nav />
        <Row>
            <Col md="auto"></Col>
            <Col>
                <Container className="p-4 table-container" >
                    <Container className="p-4" style={{
                        backgroundColor: "#262d33"
                    }}><Grid /></Container>
                </Container>
            </Col>
            <Col md="auto"></Col>
        </Row>
    </>
}

export default Problems;