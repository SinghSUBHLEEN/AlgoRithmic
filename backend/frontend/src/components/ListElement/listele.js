import { Container, Col, Stack } from "react-bootstrap";
import "./listele.css";
import { Row, ProgressBar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import Grid from "./grid_for_element";
const ListElement = (props) => {

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
      <Row className="m-0 p-0 b-0">
        <Accordion variant="success">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Container className="m-0 p-0 b-0">
                <Row>
                  <Col>
                    <h1 className="title">{props.topic}</h1>
                  </Col>
                  <Col>
                    <div className="cls">
                      <Row>
                        <Col>
                          <ProgressBar now={(total.easy + total.medium + total.hard) == 0 ? 0 : ((count.easy + count.hard + count.medium) / (total.easy + total.medium + total.hard) * 100)}
                            label={(total.easy + total.medium + total.hard) == 0 ? 0 : (((count.easy + count.hard + count.medium) / (total.easy + total.medium + total.hard) * 100).toFixed(1)) + '%'} />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xs lg={2} md="auto"></Col>
                </Row>
              </Container>
            </Accordion.Header>
            <Accordion.Body className="rounded-bottom table-back">
              <Grid top={props.topic} setCount={getCount} setTotal={getTotal} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* </Row> */}
      </Row>
    </>
  );
};

export default ListElement;
