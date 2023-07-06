import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyList from "../ViewLists/ListsPage";
import cookie from "js-cookie";

export default function Protected(props) {

    const navigate = useNavigate();
    const cook = cookie.get("token");
    useEffect(() => {
        const cook = cookie.get("token");
        if (!cook)
            navigate('/login');
        else {
            axios.post("/api/verify", { token: cook }).then((res) => {
                if (res.status === 201)
                    return;
            }).catch(err => {
                console.log(err)
            });
        }
    });

    return (
        <>
            <props.component />
        </>
    );
}