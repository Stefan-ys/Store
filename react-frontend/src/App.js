import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/root/fragments/header/Header";
import AdminMenu from "./components/root/users/adminMenu/AdminMenu";
import Home from "./components/root/home/Home";
import SignUp from "./components/root/users/signUp/SignUp";
import Login from "./components/root/users/login/Login";
import AllUsers from "./components/root/users/adminMenu/AllUsers";

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
            </Routes>
        </Router>
    );
}

export default App;
