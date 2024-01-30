import { IMG_LOGO } from "../utils/constants"
import {Link}  from "react-router-dom";
import Banner from "./Banner";
import axios from "axios";
import { useContext, useState } from "react";
import ProtectedContext from "./ProtectedContext";
const Header = ()=>{
    const handleLogout = async () => {
            sessionStorage.removeItem('jwtToken');
    };
    const {name} = useContext(ProtectedContext)
    return (
        
        <>
        <div className="header">
            <div className="logo">
                <img src={IMG_LOGO} alt="logo" />
            </div>
            <div className="name">
                   <h3>Hello, {name}</h3>
                    </div>
            <div className="navigation">    
                <ul>
                    <li><Link to = '/' >All Blogs</Link></li>
                    <li><Link to = "/myprofile">Profile</Link></li>
                    <li><Link to = "/myfavorite">Favorite</Link></li>
                    <li ><Link to= "/createblog">Create Blog</Link></li>
                    <li ><Link to= "/myblogs">My Blog</Link></li>
                    <li><Link to = "/signup">SignUp</Link></li>
                    <li><Link to = "/signin">SignIn</Link></li>
                    <li><Link to ="/signup" onClick={handleLogout}>Logout</Link></li>
                </ul>
            </div>
       
        </div>
                </>
    )
}

export default Header