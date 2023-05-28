import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyList from "../ViewLists/ListsPage";
import cookie from "js-cookie";

export default function Protected() {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(cookie.token);
        if (cookie.token === "")
            navigate('/login');
        else {
            axios.post("/api/verify", { token: cookie.jwt_token }).then((res) => {
                if (res.status === 400);
                navigate('/login');
            }).catch(err => console.log(err));
        }
    });

    return (
        <>
            <MyList />
        </>
    );
}