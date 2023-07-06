import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/root/home/Home";
import Header from "./components/root/fragments/header/Header";
import SignUp from "./components/root/users/signUp/SignUp";
import Login from "./components/root/users/login/Login";

import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
