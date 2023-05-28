import { Dropdown, ButtonGroup } from "react-bootstrap";
import "./grid.css";
import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Check from "react-bootstrap/FormCheckInput";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";
export default function Grid(props) {
  const [list, setList] = useState([]);
  const [arr, setArr] = useState([]);
  const [pl, setPl] = useState([]);
  const [done, setDone] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const x = props.l;
  // console.log(x);
  const [name, setName] = useState("");
  const [badge, setBadge] = useState("sucess");
  let completed = [];
  let personId;
  const func = (str) => {
    if (str === "Medium") setBadge("warning");
    else if (str === "Hard") setBadge("danger");
    else setBadge("success");
  };
  const fetchLists = async () => {
    const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    console.log(a);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/getList/${a}`, config);
    setList(data);
    console.log(data);
  };

  // const validate = async (id) => {
  //   try {
  //     //console.log("validation");
  //     const a = JSON.parse(localStorage.getItem("userInfo"));
  //     const kk = a.data._id;
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const d = await axios.post(
  //       "/api/findIfSolved",
  //       {
  //         userId: kk,
  //         problemId: id,
  //       },
  //       config
  //     );
  //     let v = d.data.value;
  //     //console.log(v);
  //     //console.log("type of v is " + typeof v);
  //     //console.log(d);
  //     return v;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const createListHandler = async () => {
    console.log("crea list");
    const t = name;
    const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/createList",
      {
        userId: a,
        title: t,
      },
      config
    );
    fetchLists();
  };

  const addTolistHandler = async (event, listId, problemId) => {
    console.log("this is list id" + listId);
    console.log("this is problem id" + problemId);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/addToList/${listId}/${problemId}`,
      config
    );
    console.log(data);
  };

  const fetcher = async () => {
    const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    console.log(a);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/getProblems/${a}`, config);
    console.log(data);
    setPl(data.problemsArray);
    setDone(data.userList);
    console.log(pl);
  };
  const validate = async (id) => {
    try {
      //console.log("validation");
      const a = JSON.parse(localStorage.getItem("userInfo"));
      const kk = a.data._id;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const d = await axios.post(`/api/markProblem/${kk}/${id}`, config);
      let v = d.data.value;
      //console.log(v);
      fetcher();
      //console.log("type of v is " + typeof v);
      //console.log(d);
      return v;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProblems = async () => {
    try {
      const a = JSON.parse(localStorage.getItem("userInfo"));
      console.log(a);

      const kk = a.data._id;
      console.log(kk);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { d } = await axios.get(
        "/api/getProblems",
        {
          userId: kk,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkHandler = async (questionId) => {
    try {
      console.log("this is checkHandler");

      const a = JSON.parse(localStorage.getItem("userInfo"));
      const kk = a.data._id;

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { d } = await axios.post(
        "/api/markProblem",
        {
          userId: kk,
          problemId: questionId,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  let comp;
  let flag = 0;
  if (completed.lenth > 0) {
    flag = 1;
  }
  const caller = (y) => {
    console.log("this is calller function");

    console.log(y);
  };
  useEffect(() => {
    fetchLists();
    fetcher();
  }, []);

  const printer = async (id) => {
    console.log(typeof id);
    console.log(JSON.stringify(id));
    const a = JSON.stringify(id);
    console.log(a);
  };

  const [p, setP] = useState([]);

  const typo = (x, y) => {
    console.log("here");
    console.log(x);
    console.log(y);
  };
  const functtt = async () => {
    console.log("this is another function");
  };

  return (
    <>
      <Table
        className="table rounded table-light table-hover table-striped"
        responsive="sm"
      >
        <TableHead className="thead-dark">
          <TableRow>
            <th class="same-size-col">
              <h1 className="heading">Status</h1>
            </th>
            <th class="same-size-col">
              <h1 className="heading">Difficulty</h1>
            </th>
            <th class="same-size-col">
              <h1 className="heading">Problem</h1>
            </th>
            <th class="same-size-col"></th>
          </TableRow>
        </TableHead>
        <TableBody>
          {pl.map((it) => {
            return props.top != it.tag ? (
              <></>
            ) : (
              <TableRow key={it._id}>
                <td>
                  {/* <Check
                    type="checkbox"
                    name="rem"
                    className="bg-inherit"
                    size="lg"
                    onClick={() => checkHandler(it._id)}
                  /> */}
                  {/* {console.log(typeof it._id)}
                  {myMap[it._id] === 1 ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )} */}

                  {done.find((c) => c === it._id) ? (
                    <CheckIcon
                      className="gridElementFullBox"
                      onClick={() => validate(it._id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      className="gridElementHollowBox"
                      onClick={() => validate(it._id)}
                    />
                  )}
                </td>
                <td>
                  <Badge bg={badge}>{it.difficulty}</Badge>
                </td>
                <td>{it.desc}</td>
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    />
                    <Dropdown.Toggle variant="link" id="dropdown-split-basic" />
                    <Dropdown.Menu className="gridElementDropdownWrapper">
                      {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item> */}
                      {list.map((itr) => {
                        return (
                          <div
                            onClick={(e) => {
                              addTolistHandler(e, itr._id, it._id);
                            }}
                          >
                            <Dropdown.Item href="#/action-3">
                              {itr.listTitle}
                            </Dropdown.Item>
                          </div>
                        );
                      })}

                      <Form className="gridElementCreateListSection">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="email"
                            placeholder="Enter Name"
                            className="gridElementCreateListTextField"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>

                        <Button
                          onClick={createListHandler}
                          variant="primary"
                          type="submit"
                        >
                          Create List
                        </Button>
                      </Form>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
