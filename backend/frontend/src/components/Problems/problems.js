import { React, useState } from "react";
import "./problems.css";
import Nav from "../Navbar/Navbar";
import Grid from "./Grid";
import Navbar from "react-bootstrap";

import { Dna } from 'react-loader-spinner';

import { Row, Col, Container } from "react-bootstrap";

const Problems = () => {

    const [load, setLoad] = useState(true);
    return <>
        <Nav />
        <Container fluid>
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
        </Container>
    </>
}

export default Problems;