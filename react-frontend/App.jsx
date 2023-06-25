import React from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';

import Home from "./components/root/home/Home";
import Header from "./components/root/fragments/header/Header";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
