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

const ListsPage = () => {
  const [currentId, setCurrentId] = useState("");
  let [arr, setArr] = useState([]);
  const [l, setl] = useState(false);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState([]);
  const functionSetter = async (id) => {
    let idx = list.find((p) => p._id === id);
    //setArr(list[idx].problems);
    // console.log(typeof idx);
    //console.log(idx);

    //console.log(idx.problems);
    setTitle(idx.listTitle);
    //console.log(title);

    setArr(idx.problems);
    //console.log(arr);
  };

  const fetchLists = async () => {
    const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    //console.log(a);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/getListForHomePage/${a}`, config);
    setList(data.listArray);
    setCompleted(data.solvedArray);
  };
  const deleteList = async (id) => {
    //const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(`/api/deleteList/${id}`, config);

    //window.location.reload(false);

    if (data) {
      fetchLists();
    }
  };

  const createListHandler = async () => {
    //console.log("crea list");
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
  const deleteProblemFromList = async (event, problemId, listId) => {
    const a = JSON.parse(localStorage.getItem("userInfo")).data._id;
    // console.log(a);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/deleteProblemFromList/${listId}/${problemId}`
    );
    //console.log(data);
    fetchLists();
  };
  const validate = async (id) => {
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

    if (d) {
      fetchLists();
    }

    return v;
  };
  const setColorHandler = (event, id) => {
    setCurrentId(id);
    functionSetter(id);
  };
  useEffect(() => {
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
              {list.map((itr) => {
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
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Button
                onClick={createListHandler}
                variant="primary"
                type="submit"
              >
                Create new list
              </Button>
            </Form>
          </div>
        </div>
        <div className="myListRightSection">
          <div className="myListRightSectionWrapper">
            <div className="myListRightSectionTitle">{title}</div>
            <Button
              onClick={() => deleteList(currentId)}
              variant="outline-danger"
              className="myListDeleteButton"
            >
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
                      onClick={() => validate(itr.problemId)}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                      className="gridElementHollowBox"
                      onClick={() => validate(itr.problemId)}
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
                <DeleteOutlineIcon
                  onClick={(e) =>
                    deleteProblemFromList(e, itr.problemId, currentId)
                  }
                  className="myListDeleteIcon"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListsPage;
