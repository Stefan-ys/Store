import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/header.component";
// import AdminBoard from "./components/admin-menu.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import MyProfile from "./components/my-profile.component";
import Store from "./components/store.component";
import Product from "./components/product-view.component";
import ShoppingCart from "./components/shopping-cart.component";
import AllUsers from "./components/all-users.component";


import './App.css';

const App = () => {

    return (
        <div>
            <Header path="/header" element={<Header/>}/>
            <div className="container mt-3">
                <Routes>
                    {/*<Route path="/" element={<Home/>}/>*/}
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/my-profile" element={<MyProfile/>}/>
                    <Route path="/store" element={<Store/>}/>
                    <Route path="/product" element={<Product/>}/>
                    <Route path="/shopping-cart" element={<ShoppingCart/>}/>
                    {/*<Route path="/admin" element={<AdminBoard/>}/>*/}
                    {/*<Route path="/all-users" element={<AllUsers/>}/>*/}
                </Routes>
            </div>
        </div>
    );
}

export default App;
