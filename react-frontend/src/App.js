import React from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/header.component";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import MyProfile from "./components/my-profile.component";
import Store from "./components/store.component";
import ProductView from "./components/product-view.component";
import Order from "./components/order.component";
import ShoppingCart from "./components/shopping-cart.component";
import AdminPage from "./components/admin-page.component";
import './App.css';
import {ShoppingCartProvider} from "./hooks/shopping-cart.hook";
import useAuth from "./hooks/auth.hook";
import AuthVerify from './common/auth-verify';
import AuthService from "./services/auth.service";


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    };

    static getDerivedStateFromError(error) {
        return {hasError: true};
    };

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    };

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong. Please try again later.</div>;
        }
        return this.props.children;
    };
}

const handleLogout = () => {
    AuthService.logout();
};

const App = () => {
    const {isLoggedIn, isAdmin} = useAuth();

    return (
        <div className="App">
            <ShoppingCartProvider>
                <div>
                    <Header path="/header" element={<Header/>}/>
                </div>
                <div className="container mt-3">
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/store" element={<Store/>}/>
                            <Route path="/product/:productId" element={<ProductView/>}/>
                            <Route path="/shopping-cart" element={<ShoppingCart/>}/>
                            <Route path="/order" element={<Order/>}/>
                            <Route path="/my-profile" element={isLoggedIn ? <MyProfile/> : <Login/>}/>
                            <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminPage/> : <Home/>}/>
                        </Routes>
                    </ErrorBoundary>
                </div>
            </ShoppingCartProvider>
            <AuthVerify logOut={handleLogout}/>
        </div>
    );
};

export default App;
