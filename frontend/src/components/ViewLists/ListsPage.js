import React from "react";
import "./ListsPage.css";
import Navbar from "../Navbar/Navbar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState, useEffect } from "react";
import AddListButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const ListsPage = () => {
  const cook = cookie.get("token");
  const navigate = useNavigate();
  console.log(cook);
  if (!cook) {
    console.log("not  available");
    navigate('/login');
  }
  const [currentId, setCurrentId] = useState("");
  let [arr, setArr] = useState([]);
  const [l, setl] = useState(false);
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState([]);
  const functionSetter = async (id) => {
    if (cook) {
      let idx = list.find((p) => p._id === id);
      //setArr(list[idx].problems);
      console.log(typeof idx);
      console.log(idx);

      console.log(idx.problems);
      if (cook)
        setTitle(idx.listTitle);
      console.log(title);
      if (cook)
        setArr(idx.problems);
      console.log(arr);
    }
    else navigate('/login');
  };
  // const getSolvedProblems = async () => {
  //   const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const { data } = await axios.post(`/api/getSolved/${a}`, config);
  //   console.log(data);
  //   setCompleted(data);
  //   console.log(completed);
  // };

  const fetchLists = async () => {
    if (cook) {
      const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
      console.log(a);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`/api/getListForHomePage/${a}`, config);
      setList(data.listArray);
      setCompleted(data.solvedArray);
      console.log(data.solvedArray);
      console.log(data.listArray);
      console.log(data);
    }
    else
      navigate('/login');
  };
  const setColorHandler = (event, id) => {
    if (!cook)
      navigate('/login');
    setCurrentId(id);
    functionSetter(id);
  };
  useEffect(() => {
    const cook = cookie.get("token");
    if (!cook) {
      if (alert("Not allwoed"))
        navigate('/login');
    }
    // getSolvedProblems();
    fetchLists();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="rounded ListPageWrapper">
        <div className="rounded myListLeftSection">
          <div className="myListLeftSectionBottom">
            <Form>
              {cook && list.map((itr) => {
                return (
                  <div
                    onClick={(e) => {
                      setColorHandler(e, itr._id);
                    }}
                    className={
                      currentId == itr._id
                        ? "myListLeftSectionItemsColored"
                        : "myListLeftSectionItems"
                    }
                  >
                    <div>{itr.listTitle}</div>
                  </div>
                );
              })}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name of new list</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter list name"
                  className="newListNameField"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Create new list
              </Button>
            </Form>
          </div>
        </div>
        <div className="myListRightSection">
          <div className="myListRightSectionWrapper">
            <div className="myListRightSectionTitle">{title}</div>
            <Button variant="outline-danger" className="myListDeleteButton">
              Delete
            </Button>{" "}
          </div>

          {arr.map((itr) => {
            return (
              <div className="myListRightSectionItemWrapper">
                <div className="myListRightSectionProblemTitleWrapper">
                  {/* <div className="myListCheckBox">checkBox</div> */}
                  {/* {!l && (
                    <CheckBoxOutlineBlankIcon onClick={() => setl(true)} />
                  )}
                  {l && (
                    <CheckBoxIcon
                      className="myListProblemItemChecker"
                      onClick={() => setl(false)}
                    />
                  )} */}
                  {completed.find((p) => p === itr.problemId) ? (
                    <CheckIcon
                      className="gridElementFullBox"
                    // onClick={() => validate(it._id)}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      className="gridElementHollowBox"
                    // onClick={() => validate(it._id)}
                    />
                  )}

                  <div className="zucc">{itr.desc}</div>
                  {/* {arr.map((p) => {
                return (
                  <>
                    <div className="myListRightSectionProblemTitle">
                      {p.desc}
                    </div>
                  </>
                );
              })} */}
                </div>
                <DeleteOutlineIcon className="myListDeleteIcon" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
