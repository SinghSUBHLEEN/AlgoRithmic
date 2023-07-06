import { React, useState, useEffect } from "react";
import BallotIcon from '@mui/icons-material/Ballot';
import InsightsIcon from '@mui/icons-material/Insights';
import { Container, Card, Row, Col, Stack } from "react-bootstrap";
import "./menu.css";


const Menu = (props) => {

    const [mode, setMode] = useState(props.defOn);

    useEffect(() => {
        console.log(props);
    }, [mode]);

    const handleList = (event) => {
        if (mode === "list") return;
        setMode("list");
    }

    const handleGraph = (event) => {
        if (mode === "graph") return;
        setMode("graph");
    }


    return <>
        <Row className="menu">
            <Col></Col>
            <Col>
                <Card className="menu-container" border="dark" style={{ width: '18rem' }}>
                    <Card.Header >
                        <Container className="menu-heading">Menu</Container>
                    </Card.Header>
                    <Card.Body>
                        <Card className="m-2 custom-menu-card" border="dark" style={{ width: '15rem', backgroundColor: mode === "list" ? "ghostwhite" : "#262d33" }} onClick={handleList}>
                            <Card.Header>
                                <Container>
                                    <Row className="custom-menu" style={{ color: mode === "list" ? "#262d33" : "ghostwhite", fontWeight: "bold" }} >List View</Row>
                                    <Row>
                                        <Col xs md="auto" lg={4}></Col>
                                        <Col md="auto">
                                            <BallotIcon style={{ fontSize: '3rem', color: (mode === "list") ? "#262d33" : "white" }} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                        </Card>
                        <Card className="m-2 custom-menu-card" border="dark" style={{ width: '15rem', backgroundColor: mode === "graph" ? "ghostwhite" : "#262d33" }} onClick={handleGraph}>
                            <Card.Header>
                                <Container>
                                    <Row className="custom-menu" bg="white" style={{ color: mode === "graph" ? "#262d33" : "ghostwhite", fontWeight: "bold" }}>Graph View</Row>
                                    <Row>
                                        <Col xs md="auto" lg={4}></Col>
                                        <Col md="auto">
                                            <InsightsIcon bg="light" style={{ fontSize: '3rem', color: mode === "graph" ? "#262d33" : "ghostwhite" }} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                        </Card>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="menu">
            <Col></Col>
            <Col>
                <Card className="menu-container" border="dark" style={{ width: '18rem' }}>
                    <Card.Header >
                        <Container className="menu-heading">Progress</Container>
                    </Card.Header>
                    <Card.Body>
                        <Card className="m-2 custom-menu-card" border="dark" style={{ width: '15rem', backgroundColor: mode === "list" ? "ghostwhite" : "#262d33" }} onClick={handleList}>
                            <Card.Header>
                                <Container>
                                    <Row className="custom-menu" style={{ color: mode === "list" ? "#262d33" : "ghostwhite", fontWeight: "bold" }} >List View</Row>
                                    <Row>
                                        <Col xs md="auto" lg={4}></Col>
                                        <Col md="auto">
                                            <BallotIcon style={{ fontSize: '3rem', color: (mode === "list") ? "#262d33" : "white" }} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                        </Card>
                        <Card className="m-2 custom-menu-card" border="dark" style={{ width: '15rem', backgroundColor: mode === "graph" ? "ghostwhite" : "#262d33" }} onClick={handleGraph}>
                            <Card.Header>
                                <Container>
                                    <Row className="custom-menu" bg="white" style={{ color: mode === "graph" ? "#262d33" : "ghostwhite", fontWeight: "bold" }}>Graph View</Row>
                                    <Row>
                                        <Col xs md="auto" lg={4}></Col>
                                        <Col md="auto">
                                            <InsightsIcon bg="light" style={{ fontSize: '3rem', color: mode === "graph" ? "#262d33" : "ghostwhite" }} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                        </Card>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
}

export default Menu;
