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
import Protected from './components/Protected';

const AppLayout = () => {
    
    const location = useLocation();
    return (
        <>
      
        <div className="app">
        <Header />
        {/* Conditionally render Banner based on route */}
        {location.pathname === '/' && <Banner />}
        <Outlet />
    </div>
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
                element: <Protected Component = {MyProfile}></Protected>,
            },
            {
                path: "/createblog",
                element: <Protected Component = {CreateBlog}></Protected>,
            },
            {
                path: "/blog/:resId",
                element: <Protected Component = {BlogContent}></Protected>,
            },
            {
                path: "/myfavorite",
                element: <Protected Component = {MyFavorite}></Protected>,
            },
            {
                path: "/myblogs",
                element: <Protected Component = {MyBlogs}></Protected>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);