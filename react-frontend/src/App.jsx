import React from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import NavBar from './components/root/fragments/header/NavBar';
import Home from './components/root/home/Home';

function App() {
    return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route exact path="/" component={Home}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
