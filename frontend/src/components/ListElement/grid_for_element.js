import { Dropdown, ButtonGroup } from "react-bootstrap";
import "./grid.css";
import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cookie from "js-cookie";
import navigate from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckIcon from "@mui/icons-material/Check";
export default function Grid(props) {
  const [list, setList] = useState([]);
  const [pl, setPl] = useState([]);
  // for all the problems
  const [done, setDone] = useState([]);
  // for problem checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [name, setName] = useState("");
  // new list name inpt
  const [badge, setBadge] = useState("sucess");

  const func = (str) => {
    if (str === "Medium") setBadge("warning");
    else if (str === "Hard") setBadge("danger");
    else setBadge("success");
  };


  const cook = cookie.get('token');
  // do not change this
  const fetchLists = async () => {
    if (!cook) return;
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

  const createListHandler = async () => {
    if (!cook) return;
    console.log("creat list");
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
    if (!cook) return;
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
    // const= 
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
    if (!cook) return;
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





  useEffect(() => {
    fetchLists();
    fetcher();
  }, []);

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
                    defaultChecked={true}
                    className="bg-inherit"
                    size="lg"
                  /> */}
                  {/* {console.log(typeof it._id)}
                  {myMap[it._id] === 1 ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )} */}

                  {/* {done.find((c) => c === it._id) ? (
                    <CheckIcon
                      className="gridElementFullBox"
                      onClick={() => validate(it._id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      className="gridElementHollowBox"
                      onClick={() => validate(it._id)}
                    />
                  )} */}
                  {done.find((c) => c === it._id) ? (
                    <Check
                      type="checkbox"
                      name="rem"
                      defaultChecked={true}
                      className="bg-inherit"
                      size="lg"
                      onClick={() => validate(it._id)}
                    />
                  ) : (
                    <Check
                      type="checkbox"
                      name="rem"
                      className="bg-inherit"
                      size="lg"
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
                            onClick={cook ? (e) => {
                              addTolistHandler(e, itr._id, it._id);
                            } : navigate('/login')}
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
