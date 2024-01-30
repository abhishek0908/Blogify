import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Banner from './components/Banner';
import Body from './components/Body';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {RouterProvider, useLocation,createBrowserRouter,Outlet } from 'react-router-dom';
import MyProfile from './components/MyProfile';
import CreateBlog from './components/CreateBlog';
import BlogContent from './components/BlogContent';
import MyFavorite from './components/MyFavorite';
import MyBlogs from './components/MyBlogs';
import ProtectedContext from './components/ProtectedContext';

const AppLayout = () => {
    const[userData,setUserData] = useState("")
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
          setUserData(responseData.firstname);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    const location = useLocation();
    return (
        <>
        {console.log(userData)}
        <ProtectedContext.Provider value={{name:userData,setUserData}}>
        <div className="app">
        <Header />
        {/* Conditionally render Banner based on route */}
        {location.pathname === '/' && <Banner />}
        <Outlet />
    </div>
    </ProtectedContext.Provider>
    </>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/signin",
                element: <SignIn/>,
            },
            {
                path: "/myprofile",
                element: <MyProfile/>,
            },
            {
                path: "/createblog",
                element: <CreateBlog/>,
            },
            {
                path: "/blog/:resId",
                element: <BlogContent/>,
            },
            {
                path: "/myfavorite",
                element: <MyFavorite/>,
            },
            {
                path: "/myblogs",
                element: <MyBlogs/>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);