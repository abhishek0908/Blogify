import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ProtectedContext from "./ProtectedContext";
const MyProfile = () => {
  const [userData, setUserData] = useState({
    firstname:"",
    lastname:"",
  });
  const[message,setMessage] = useState("")
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');
      const payload = JSON.stringify(userData);
      console.log('Request Payload:', payload);
  
      const response = await fetch('http://localhost:3000/user/updateinfo', {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: payload,
      });
  
      if(response.ok)
      {
        setMessage("Profile Updated Successfully")
      }
    } catch (error) {
      const navigate = useNavigate()
      
      setMessage(" Some Error Occured! Try Again")
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Retrieve the token from sessionStorage or localStorage
      const token = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');

      const response = await fetch('http://localhost:3000/user/profile', {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log(responseData);
      setUserData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
    <div className="profile">
        <h1>Hi! {userData.firstname}</h1>
        <form onSubmit={handleSubmit}>
      <label htmlFor="">First Name</label>
      <input name ="firstname"type="text" value={userData.firstname || "" }  onChange={handleChange}/>
      <label htmlFor="">Last Name</label>
      <input name = "lastname" type="text" value={userData.lastname || ""}  onChange={handleChange}/>
      <label htmlFor="">email</label>
      <input disabled type="text" value={userData.email || ""} />
      <button type="submit">Update</button>
      <p>{message}</p>
      </form>
    </div>
    </>
  );
};

export default MyProfile;
