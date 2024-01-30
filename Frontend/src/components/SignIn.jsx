import { useState } from "react";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message,setMessage] = useState("")

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const responseData = await response.json()
      console.log(responseData.msg)
      if (response.ok) {
        sessionStorage.setItem('jwtToken', responseData.token);
        setMessage(responseData.msg)
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchData()
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={loginData.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={loginData.password} onChange={handleChange} />
        <button type="submit">Submit</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default SignIn;
