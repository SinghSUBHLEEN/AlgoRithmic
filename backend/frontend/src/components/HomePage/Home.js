import { React, useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar.js";
import { Container, Card, Stack, ProgressBar } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListElement from "../ListElement/listele";
import axios from "axios";
import cookie from "js-cookie";
import { MDBContainer } from 'mdb-react-ui-kit';
import Menu from "../HomeMenu/menu"


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
  const cook = cookie.get("token");
  const fname = cookie.get("fname");
  const lname = cookie.get("lname");

  return (
    <div>
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
    </div >
  );
};

export default Home;
