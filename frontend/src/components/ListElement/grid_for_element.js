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

export default function Grid(props) {
  const [arr, setArr] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const x = props.l;
  // console.log(x);
  const [badge, setBadge] = useState("sucess");

  const func = (str) => {
    if (str === "Medium") setBadge("warning");
    else if (str === "Hard") setBadge("danger");
    else setBadge("success");
  };

  const fetchProblems = async () => {
    try {
      // const { res } = await axios.get("/api/getProblems");
      const { data } = await axios.get("/api/getProblems");
      //console.log(data);
      setArr(data);
      //console.log(arr);
      // console.log(data);
    } catch (error) {
      console.log("something is wrong");
    }
  };
  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    func(props.difficulty);
  });

  const [p, setP] = useState([]);

  useEffect(() => {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then((res) => {
    //     const obj = res.data.slice(15);
    //     setData(obj);
    //     console.log(typeof data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setP(props.arr);
    console.log(p);
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
          {arr.map((it) => {
            return props.top != it.tag ? (
              <></>
            ) : (
              <TableRow key={it._id}>
                <td>
                  <Check
                    type="checkbox"
                    name="rem"
                    className="bg-inherit"
                    size="lg"
                  />
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
