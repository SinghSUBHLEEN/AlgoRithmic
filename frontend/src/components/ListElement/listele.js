import { Container, Col, Stack } from "react-bootstrap";
import "./listele.css";
import { Row, ProgressBar } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Grid from "./grid_for_element";
import { useState } from "react";
const ListElement = (props) => {
  //   const [l, setL] = useState([]);
  //   setL(props.arrP);
  //   console.log(l);
  //console.log(props.r);
  // console.log("y");
  //   console.log(props.difficulty);

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
                        <ProgressBar>
                          <ProgressBar
                            striped
                            variant="success"
                            now={35}
                            key={1}
                          />
                          <ProgressBar variant="warning" now={30} key={2} />
                          <ProgressBar
                            striped
                            variant="danger"
                            now={10}
                            key={3}
                          />
                        </ProgressBar>
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                </Container>
              </Accordion.Header>
              <Accordion.Body className="rounded">
                <Grid
                  difficulty={props.difficulty}
                  title={props.title}
                  link={props.link}
                  top={props.topic}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </>
  );
};

export default ListElement;
