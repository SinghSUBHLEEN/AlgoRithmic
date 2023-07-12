import { React, useEffect } from "react";
import Nav from "../Navbar/Navbar";
import "./profile.css";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const cook = cookie.get("token");

    useEffect(() => {
        if (!cook)
            navigate('/home');
    }, []);

    return <>
        <Nav></Nav>
    </>
}

export default Profile;