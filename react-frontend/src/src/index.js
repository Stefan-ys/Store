import React from "react";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import {createRoot} from "react-dom/client";
import App from "./App";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Router>
        <App/>
    </Router>
);

