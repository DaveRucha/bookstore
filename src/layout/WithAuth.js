import Cookies from "js-cookie";
import React,{ Component, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const WithAuth = (Component) => {
    const Authentication = () => {
        const email = Cookies.get("email_ck");
        const navigate = useNavigate();

        useEffect(() => {
            if(!email)
            {
                navigate("/");
            }
        },[email]);
        return email?<Component/>:null;
    };
    return Authentication;
};
export default WithAuth;