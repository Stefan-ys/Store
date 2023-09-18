import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import MyProfile from "./components/my-profile.component";
import Store from "./components/store.component";
import ProductView from "./components/product-view.component";
import ShoppingCart from "./components/shopping-cart.component";
import AdminPage from "./components/admin-page.component";
import './App.css';
import { ShoppingCartProvider } from "./utils/shopping-cart-data.util";

import AuthUtil from "./utils/auth.util";

const App = () => {
    return (
        <ShoppingCartProvider>
            <div>
                <Header path="/header" element={<Header />} />
            </div>
            <div className="container mt-3">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/product/:productId" element={<ProductView />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                    <Route path="/my-profile"
                        element={AuthUtil.isLoggedIn() ? <MyProfile /> : <Login />} />
                    <Route path="/admin"
                        element={AuthUtil.isLoggedIn() && AuthUtil.isAdmin() ? <AdminPage /> : <Home />} />
                </Routes>
            </div>
        </ShoppingCartProvider>
    );
};

export default App;
