import { React, useState, useEffect, useMemo } from "react";
import axios from "axios";
import cookie from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { DropdownButton, Dropdown, ButtonGroup, Badge, Button, Form, Navbar, NavDropdown, Container, Nav, Row, Col } from "react-bootstrap";
import { incrementEasyCount, incrementMediumCount, incrementHardCount, decrementEasyCount, decrementMediumCount, decrementHardCount, totalHardCount, totalEasyCount, totalMediumCount } from "../../actions/actions";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoneIcon from '@mui/icons-material/Done';

const Grid = (props) => {
    const cook = cookie.get('token');
    const [data, setData] = useState([]);
    const [count, setCount] = useState({ easy: 0, medium: 0, hard: 0 });
    const [list, setList] = useState([]);
    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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


    const getProblems = () => {
        axios.post('/api/getProblems', {}).then((res) => {
            console.log(res.data.arr);
            console.log(res);
            console.log(res.data.arr);
            setData(res.data.arr);
        }).catch(err => console.log(err))
    }

    const getProblemsById = () => {
        axios.post('/api/getProblemsById', { token: cook }).then((res) => {
            console.log(res.data.arr);
            setData(res.data.arr);
            console.log(data);
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
            console.log(res.data.arr);
        }).catch(err => console.log(err))
    }


    const handleCheck = (event) => {
        if (!cook) {
            return;
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

    const [searchProblem, setSearchProblem] = useState("");
    const [only, setOnly] = useState("");

    useEffect(() => {
        if (cook) {
            getProblemsById();
            fetchLists();
        }
        else
            getProblems();
        console.log(list);
        console.log(data);
    }, []);

    const handleInput = (e) => {
        setSearchProblem(e.target.value);
    };

    useEffect(() => {
        console.log(searchProblem);
        setOnly(searchProblem.toLowerCase());
    }, [searchProblem]);

    const handleSearch = (event) => {
        setOnly(searchProblem.toLowerCase());
        console.log(only);
        event.preventDefault();
    }

    const [click, setClick] = useState(0);
    const handleEasy = () => {
        if (click === 1)
            setClick(0);
        else
            setClick(1);
    }

    const handleMedium = () => {
        if (click === 2)
            setClick(0);
        else
            setClick(2);
    }

    const handleHard = () => {
        if (click === 3)
            setClick(0);
        else
            setClick(3);
    }

    return <>
        <div className="table-back">
            <Navbar expand="lg" className="bg-body-tertiary mb-3 rounded" bg="light" >
                <Form className="d-flex" style={{ backgroundColor: "inherit", boxShadow: "none", marginLeft: "1rem" }}>
                    <Form.Control
                        type="search"
                        placeholder="Search problems"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleInput}
                    />
                </Form>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" style={{ marginLeft: "33rem" }}>
                        <NavDropdown title={<><span style={{ color: "inherit", fontSize: "1.18rem" }}>Difficulty</span><ArrowDropDownIcon /></>}>
                            <NavDropdown.Item onClick={handleEasy}>
                                <Row>
                                    <Col xs={6}>Easy</Col>
                                    <Col md="auto">{click === 1 ? <DoneIcon /> : <></>}</Col>
                                </Row>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleMedium}>
                                <Row>
                                    <Col xs={6}>Medium</Col>
                                    <Col md="auto">{click === 2 ? <DoneIcon /> : <></>}</Col>
                                </Row>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleHard}>
                                <Row>
                                    <Col xs={6}>Hard</Col>
                                    <Col md="auto">{click === 3 ? <DoneIcon /> : <></>}</Col>
                                </Row>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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
                        if (Object.keys(it).length === 0 || (only !== "" && !it.desc.toLowerCase().startsWith(only)))
                            return <></>
                        else if (click === 1 && (it.difficulty === "hard" || it.difficulty === "Hard" || it.difficulty === "medium" || it.difficulty === "Medium"))
                            return <></>
                        else if (click === 2 && (it.difficulty === "hard" || it.difficulty === "Hard" || it.difficulty === "easy" || it.difficulty === "Easy"))
                            return <></>
                        else if (click === 3 && (it.difficulty === "easy" || it.difficulty === "Easy" || it.difficulty === "medium" || it.difficulty === "Medium"))
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
    </>
}

export default Grid;