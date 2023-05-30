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
import cookie from 'js-cookie';
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";
export default function Grid(props) {
  const cook = cookie.get('token');
  const [list, setList] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [name, setName] = useState("");

  const fetchLists = async () => {
    // const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    // console.log(a);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/getList/${cook}`, config);
    setList(data);
    console.log(data);
  };




  const createListHandler = async () => {
    console.log("crea list");
    const t = name;
    // const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/createList",
      {
        userId: cook,
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
    // const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    // console.log(a);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/getProblems/${cook}`, config);
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
  //     const d = await axios.post(`/api/markProblem/${kk}/${a}`, config);
  //     let v = d.data.value;
  //     //console.log(v);
  //     fetcher();
  //     //console.log("type of v is " + typeof v);
  //     //console.log(d);
  //     return v;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fetchProblems = async () => {
  //   try {
  //     const a = JSON.parse(localStorage.getItem("userInfo"));
  //     console.log(a);

  //     const kk = a.data._id;
  //     console.log(kk);
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const { d } = await axios.get(
  //       "/api/getProblems",
  //       {
  //         userId: kk,
  //       },
  //       config
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [data, setData] = useState([]);

  const [count, setCount] = useState({ easy: 0, medium: 0, hard: 0 });

  const getProblemsByTag = () => {
    axios.post('/api/getProblemsByTag', { tag: props.top }).then((res) => {
      console.log(res);
      console.log(res.data.arr);
      setData(res.data.arr);
      props.setTotal(res.data.total);
    }).catch(err => console.log(err))
  }

  const getProblemsByTagAndId = () => {
    axios.post('/api/getProblemsByTagAndId', { tag: props.top, token: cook }).then((res) => {
      console.log(res);
      setCount(res.data.count);
      setData(res.data.arr);
      props.setTotal(res.data.total);
      props.setCount(res.data.count);
    }).catch(err => console.log(err))
  }

  const handleCheck = (event) => {
    if (!cook) {
      let temp = data;
      const obj = count;
      temp[event.taret.name].flag = event.target.value;
      if (!event.target.checked) {
        if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium")
          obj.medium = obj.medium - 1;
        else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard")
          obj.hard = obj.hard - 1;
        else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy")
          obj.easy = obj.easy - 1;
      }
      else {
        if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium")
          obj.medium = obj.medium + 1;
        else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard")
          obj.hard = obj.hard + 1;
        else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy")
          obj.easy = obj.easy + 1;
      }
      setCount(obj);
      props.setCount(count);
    }
    else {
      let temp = data;
      const obj = count;
      if (!event.target.checked) {
        if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium")
          obj.medium = obj.medium - 1;
        else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard")
          obj.hard = obj.hard - 1;
        else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy")
          obj.easy = obj.easy - 1;
      }
      else {
        if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium")
          obj.medium = obj.medium + 1;
        else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard")
          obj.hard = obj.hard + 1;
        else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy")
          obj.easy = obj.easy + 1;
      }
      console.log(event.target.checked);
      temp[event.target.name].flag = event.target.value;
      setCount(obj);
      props.setCount(count);
      axios.post('/api/handleUpdate', { problemId: temp[event.target.name]._id, token: cook }).then((res) => {
        setData(temp);
        console.log(obj);
      }).catch(err => console.log(err));
    }
  }

  useEffect(() => {
    if (cook) {
      getProblemsByTagAndId();
      fetchLists();
    }
    else
      getProblemsByTag();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
          {data.map((it, idx) => {
            if (Object.keys(it).length === 0 || props.top !== it.tag)
              return <></>
            else {
              let badge = "success";
              if (it.difficulty === "medium" || it.difficulty === "Medium")
                badge = "warning";
              else if (it.difficulty === "hard" || it.difficulty === "Hard")
                badge = "danger";
              return (<TableRow key={it._id}>
                <td>

                  <Form.Check
                    type="checkbox"
                    name={idx}
                    defaultChecked={it.flag}
                    onChange={handleCheck}
                  ></Form.Check>

                  {/* {done.find((c) => c === it._id) ? (
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
                  )} */}



                </td>
                <td>
                  <Badge bg={badge}>{it.difficulty}</Badge>
                </td>
                <td><a href={it.link} className='desc'>{it.desc}</a></td>
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
              </TableRow>)
            }
          })}
        </TableBody>
      </Table>
    </>
  );
}