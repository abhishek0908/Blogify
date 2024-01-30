import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Protected = (props)=>{
    const {Component} = props
    const navigate = useNavigate()
    useEffect(()=>{
        const token = sessionStorage.getItem('jwtToken');
        if(!token){
            navigate('/signup')
        }
    },[])
    return(
        <div className="div">
            <Component/>
        </div>
    )
}

export default Protected