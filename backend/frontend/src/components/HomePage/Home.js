import { React, useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar.js";
import { Container, Card, Stack, ProgressBar, Row, Col } from "react-bootstrap";
import ListElement from "../ListElement/listele";
import axios from "axios";
import cookie from "js-cookie";
import Menu from "../HomeMenu/menu";
import { useSelector, useDispatch } from "react-redux";
import Graph from "../graphView/graphView";



const arr = ["Basics", "Searching and Sorting", "Arrays and Hashing", "Strings", "Sets and Hasmaps", "Binary Search", "Two Pointers", "Prefix Sum", "Linked Lists", "Sliding Window", "Stack", "Queue", "Backtracking", "Trees", "Dynamic Programming", "Priority Queue/Heap", "Graphs", "Tries", "Greedy", "Bit Manipulation"];


const Home = () => {


  const mode = useSelector((state) => state.modeReducer);

  const easyCount = useSelector((state) => state.easyReducer);
  const mediumCount = useSelector((state) => state.mediumReducer);
  const hardCount = useSelector((state) => state.hardReducer);

  const [count, setCount] = useState({ easy: easyCount, medium: mediumCount, hard: hardCount });

  const cook = cookie.get("token");
  const fname = cookie.get("fname");
  const lname = cookie.get("lname");

  // useEffect(() => {
  //   const easy = easyCount;
  //   const medium = mediumCount;
  //   const hard = hardCount;
  //   setCount({ easy: easy, medium: medium, hard: hard });
  // }, [])

  return (
    <>
      <Navbar />
      {/* <h6 className="homePageTitle">
        {cook ? (<MDBContainer fluid><h1 className="welcome">Welcome to Algorithmic {fname},</h1></MDBContainer>) : (<MDBContainer fluid><h1 className="welcome">Welcome to Algorithmic,</h1></MDBContainer>)}
      </h6> */}
      <Row>
        <Col md="auto" >
          <Menu defOn={"list"} ></Menu>
        </Col>
        <Col>{mode ? <>{arr.map((it) => {
          return <ListElement topic={it} />;
        })}</> : <Col lg={30}><Graph></Graph></Col>}
        </Col>
        {/* {
          cook ? (mode ? <Col>{arr.map((it) => {
            return <ListElement topic={it} />;
          })}</Col> : <Col><Graph></Graph></Col>) : (!mode ? <Col>{arr.map((it) => {
            return <ListElement topic={it} />;
          })}</Col> : <Col><Graph></Graph></Col>)
        } */}
        {/* <Col md="auto"></Col> */}
      </Row>
    </ >
  );
};

export default Home;
