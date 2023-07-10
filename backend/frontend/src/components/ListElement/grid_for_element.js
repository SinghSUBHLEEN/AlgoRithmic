import { DropdownButton, Dropdown, ButtonGroup, Container } from "react-bootstrap";
import "./grid.css";
import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import cookie from 'js-cookie';
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import { incrementEasyCount, incrementMediumCount, incrementHardCount, decrementEasyCount, decrementMediumCount, decrementHardCount, totalHardCount, totalEasyCount, totalMediumCount } from "../../actions/actions";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { useDispatch, useSelector } from "react-redux";

export default function Grid(props) {
  const cook = cookie.get('token');
  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

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
      let h = res.data.total.hard, m = res.data.total.medium, e = res.data.total.easy;
      while (h > 0) {
        dispatch(totalHardCount());
        h -= 1;
      }
      while (e > 0) {
        dispatch(totalEasyCount());
        e -= 1;
      }
      while (m > 0) {
        dispatch(totalMediumCount());
        m -= 1;
      }
      let e1 = res.data.count.easy, m1 = res.data.count.medium, h1 = res.data.count.hard;
      while (h1 > 0) {
        dispatch(incrementHardCount());
        h1 -= 1;
      }
      while (e1 > 0) {
        dispatch(incrementEasyCount());
        e1 -= 1;
      }
      while (m1 > 0) {
        dispatch(incrementMediumCount());
        m1 -= 1;
      }
      props.setCount(res.data.count);
    }).catch(err => console.log(err))
  }

  const handleCheck = (event) => {
    if (!cook) {
      return;
      // let temp = data;
      // const obj = count;
      // temp[event.target.name].flag = event.target.value;
      // if (!event.target.checked) {
      //   if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium") {
      //     obj.medium = obj.medium - 1;
      //   }

      //   else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard") {
      //     obj.hard = obj.hard - 1;
      //   }
      //   else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy") {
      //     obj.easy = obj.easy - 1;
      //   }
      // }
      // else {
      //   if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium") {
      //     obj.medium = obj.medium + 1;
      //   }
      //   else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard") {
      //     obj.hard = obj.hard + 1;
      //   }
      //   else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy") {
      //     obj.easy = obj.easy + 1;
      //   }
      // }

      // setCount(obj);
      // props.setCount(count);
    }
    else {
      let temp = data;
      const obj = count;
      if (!event.target.checked) {
        if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium") {
          obj.medium = obj.medium - 1;
          dispatch(decrementMediumCount());
        }
        else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard") {
          obj.hard = obj.hard - 1;
          dispatch(decrementHardCount());

        }
        else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy") {
          obj.easy = obj.easy - 1;
          dispatch(decrementEasyCount());
        }
      }
      else {
        if (temp[event.target.name].difficulty === "Medium" || temp[event.target.name].difficulty === "medium") {
          obj.medium = obj.medium + 1;
          dispatch(incrementMediumCount());
        }
        else if (temp[event.target.name].difficulty === "Hard" || temp[event.target.name].difficulty === "hard") {
          obj.hard = obj.hard + 1;
          dispatch(incrementHardCount());
        }
        else if (temp[event.target.name].difficulty === "Easy" || temp[event.target.name].difficulty === "easy") {
          obj.easy = obj.easy + 1;
          dispatch(incrementEasyCount());
        }
      }
      console.log(event.target.checked);
      temp[event.target.name].flag = event.target.value;
      setCount(obj);
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
    <Container fluid>
      <div className="table-back">
        <Table
          className="table table-hover custom-table" variant="dark"
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

                  </td>
                  <td>
                    <Badge pill bg={badge}>{it.difficulty}</Badge>
                  </td>
                  <td><Button className="custom-button cicular" href={it.link} target="_blanck" variant="light">{it.desc}</Button></td>
                  <td>
                    <DropdownButton as={ButtonGroup} variant="dark" style={{ boxShadow: "none" }} title={<PlaylistAddIcon></PlaylistAddIcon>}>
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
                        <Form.Group className="m-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            className="gridElementCreateListTextField"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>

                        <Button
                          onClick={createListHandler}
                          variant="primary"
                          type="submit"
                          className="mb-3 ml-7"
                        >
                          Create List
                        </Button>
                      </Form>
                    </DropdownButton>
                  </td>
                </TableRow>)
              }
            })}
          </TableBody>
        </Table >
      </div >
    </Container>
  );
}