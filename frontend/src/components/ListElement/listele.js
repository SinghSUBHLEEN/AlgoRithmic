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

  const getCount = (obj) => {
    console.log("Called");
    setCount(obj);
    setChange(change + 1);
    console.log(count);
  }

  const getTotal = (obj) => {
    setTotal(obj);
    console.log("total");
    console.log(obj);
    setChange(change - 1);
  }

  useEffect(() => {
    console.log("effect");
  }, [change])
  return (
    <>
      <Container>
        <Row className="justify-content-md-center" lg={1}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <Container>
                  <Row></Row>
                  <Row>
                    <Col>
                      <h1 className="title">{props.topic}</h1>
                    </Col>
                    <Col>
                      <div className="cls">
                        <ProgressBar variant="success" now={(count.easy / total.easy) * 100} className="pg-top" />
                        <ProgressBar variant="warning" now={(count.medium / total.medium) * 100} className="pg" />
                        <ProgressBar variant="danger" now={(count.hard / total.hard) * 100} className="pg-bottom" />
                      </div>
                      {/* <div className="cls">
                        <ProgressBar>
                          <ProgressBar
                            striped
                            variant="success"
                            now={count.easy * 10}
                            key={1}
                          />
                          <ProgressBar variant="warning" now={count.medium * 10} key={2} />
                          <ProgressBar
                            striped
                            variant="danger"
                            now={count.hard * 10}
                            key={3}
                          />
                        </ProgressBar>

                      </div> */}
                    </Col>
                    <Col></Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body className="rounded">
                <Grid top={props.topic} setCount={getCount} setTotal={getTotal} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};

export default ListElement;
