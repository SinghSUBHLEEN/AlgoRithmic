import { React } from "react";
import { Image, Row, Col, Container, Stack } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "./Notfound.css";

const Notfound = () => {
    return <>
        <Navbar />
        <Container fluid>
            <Row className="justify-content-md-right" style={{ margin: "auto", marginTop: "9%" }}>
                {/* <Col md="auto"></Col> */}
                {/* <Col>
                    <Container fluid style={{ justifImage: "right" }} >
                        <Image fluid src={require("./404_face.png")} style={{ width: "20rem", margin: "0%", padding: "0%", marginLeft: "24rem", marginTop: "2rem" }}></Image>
                    </Container>
                </Col>
                <Col>
                    <h1 className="page-head">Page Not found</h1>
                    <h2 className="page-body">Sorry, but it looks like the requested page does not exist...</h2>
                </Col> */}

                <Col>
                    <Image src={require("./404_face.png")} style={{ width: "40%", height: "auto", margin: "0%", padding: "0%", marginLeft: "60%" }}></Image>
                </Col>
                <Col style={{ paddingTop: "4%" }}>
                    <h1 className="page-head">Page Not found</h1>
                    <h2 className="page-body">Sorry, but it looks like the requested page does not exist...</h2>
                </Col>
            </Row>
        </Container >
    </>
}

export default Notfound;