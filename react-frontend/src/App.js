import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/root/fragments/header/Header";
import AdminMenu from "./components/root/adminMenu/AdminMenu";
import Home from "./components/root/home/Home";
import SignUp from "./components/root/user/SignUp";
import Login from "./components/root/user/Login";
import AllUsers from "./components/root/adminMenu/AllUsers";
import MyProfile from "./components/root/user/MyProfile";
import Logout from "./components/root/user/Logout";

import './App.css';

function App() {
    return (

        <Router>
            <AdminMenu/>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/users" element={<AllUsers/>}/>
                <Route path="/my-profile" element={<MyProfile/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
        </Router>
    );
}

export default App;
