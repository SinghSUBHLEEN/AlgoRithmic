import { Container, Col, Stack } from "react-bootstrap";
import "./listele.css";
import { Row, ProgressBar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import Grid from "./grid_for_element";
import cookie from "js-cookie";

const ListElement = (props) => {
  const cook = cookie.get("token");
  const [count, setCount] = useState({ easy: 0, medium: 0, hard: 0 });
  const [total, setTotal] = useState({ easy: 0, medium: 0, hard: 0 });
  const [change, setChange] = useState(0);


  useEffect(() => {

  }, [change]);


  const getCount = (obj) => {
    setCount(obj);
    setChange(change + 1);
  }

  const getTotal = (obj) => {
    setTotal(obj);
    setChange(change - 1);
  }


  useEffect(() => {
  }, [change])
  return (
    <>
      {/* <Row className="m-0 p-0 b-0" style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Col> */}
      <Accordion variant="success" style={{ width: "86%", marginLeft: "auto", marginRight: "auto", height: "auto" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Container className="m-0 p-0 b-0" fluid>
              <h1 className="title m-0 p-0 b-0">{props.topic}</h1>
            </Container>
          </Accordion.Header>
          <Accordion.Body className="rounded-bottom table-back">
            <Grid top={props.topic} setCount={getCount} setTotal={getTotal} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* </Row> */}
      {/* </Col>
      </Row> */}
    </>
  );
};

export default ListElement;
