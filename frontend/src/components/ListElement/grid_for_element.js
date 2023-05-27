import { Dropdown, ButtonGroup } from "react-bootstrap";
import "./grid.css";
import { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Check from "react-bootstrap/FormCheckInput";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckIcon from "@mui/icons-material/Check";
export default function Grid(props) {
  const [arr, setArr] = useState([]);
  const [pl, setPl] = useState([]);
  const [done, setDone] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const x = props.l;
  // console.log(x);
  const [badge, setBadge] = useState("sucess");
  let completed = [];
  let personId;
  const func = (str) => {
    if (str === "Medium") setBadge("warning");
    else if (str === "Hard") setBadge("danger");
    else setBadge("success");
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
      //console.log("type of v is " + typeof v);
      //console.log(d);
      return v;
    } catch (error) {
      console.log(error);
    }
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
      //console.log(typeof questionId);
      //console.log("this is checker");
      const a = JSON.parse(localStorage.getItem("userInfo"));
      const kk = a.data._id;
      //console.log(typeof a.data._id);
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
      if (d) {
        fetchProblems();
      }
      //console.log(d);
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
    //console.log(x);
    console.log(y);
  };
  useEffect(() => {
    fetcher();
  }, []);

  // useEffect(() => {
  //   func(props.difficulty);
  // });
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

  // useEffect(() => {
  //   // axios
  //   //   .get("https://jsonplaceholder.typicode.com/posts")
  //   //   .then((res) => {
  //   //     const obj = res.data.slice(15);
  //   //     setData(obj);
  //   //     console.log(typeof data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   setP(props.arr);
  //   console.log(p);
  // }, []);

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
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
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
