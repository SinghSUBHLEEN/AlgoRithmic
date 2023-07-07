import { React, useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar.js";
import { Container, Card, Stack, ProgressBar, Row, Col } from "react-bootstrap";
import ListElement from "../ListElement/listele";
import axios from "axios";
import cookie from "js-cookie";
import Menu from "../HomeMenu/menu";
import { useSelector, useDispatch } from "react-redux";



const arr = [
  "Basics",
  "Arrays and Hashing",
  "Searching and Sorting",
  "Binary Search",
  "Prefix Sum",
  "Sets and Hashmaps",
  "Strings",
  "DFS",
  "BFS",
  "Constructive Algorithms",
  "Stack",
  "Queue",
  "Two pointers",
  "Recursion and Backtracking",
  "Trees",
  "Dynamic Programming",
  "Graphs",
  "Tries",
  "Segment trees and BIT",
  "Bit manipulation",
  "Greedy",
];


const Home = () => {

  console.log(arr.length);

  const easyCount = useSelector((state) => state.easyReducer);
  const mediumCount = useSelector((state) => state.mediumReducer);
  const hardCount = useSelector((state) => state.hardReducer);

  const [count, setCount] = useState({ easy: easyCount, medium: mediumCount, hard: hardCount });

  const cook = cookie.get("token");
  const fname = cookie.get("fname");
  const lname = cookie.get("lname");

  useEffect(() => {
    const easy = easyCount;
    const medium = mediumCount;
    const hard = hardCount;
    setCount({ easy: easy, medium: medium, hard: hard });
  }, [])

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
        <Col md="auto">
          {
            arr.map((it) => {
              return <ListElement topic={it} />;
            })
          }
        </Col>
        <Col md="auto"></Col>
      </Row>
    </ >
  );
};

export default Home;
