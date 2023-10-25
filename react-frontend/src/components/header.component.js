import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaBell, FaSearch } from "react-icons/fa";
import styles from "../css/header.module.css";
import AuthService from "../services/auth.service";
import { withRouter } from "../common/with-router";
import { useShoppingCart } from "../hooks/shopping-cart.hook";
import useAuth from "../hooks/auth.hook";


const HeaderComponent = () => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { shoppingCart } = useShoppingCart();
    const { isLoggedIn, getUsername, isAdmin, isModerator } = useAuth();

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleLogout = () => {
        try {
            AuthService.logout();
            window.location.href = "/home";
            setShowLogoutConfirmation(false);
            window.location.reload();
        } catch (error) {
            console.log("Error occurred during logout: ", error);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <NavLink to="/home" className={styles.logoLink}>
                    Your Logo Here
                </NavLink>
            </div>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search for product..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <Link to={`/store?query=${searchQuery}`} className={styles.searchButton} style={{ textDecoration: 'none' }}>
                    <FaSearch />
                </Link>
            </div>

            <div className={styles.welcomeMessage}>
                {isLoggedIn && (
                    <div className={styles.userRoles}>
                        Welcome {getUsername}
                        {isAdmin && <span className={styles.adminRole}> ADMIN</span>}
                        {isModerator && <span className={styles.moderatorRole}> MODERATOR</span>}
                    </div>
                )}
            </div>

            <div className={styles.navContainer}>
                <nav>
                    <ul className={styles.navLinks}>
                        <li>
                            <NavLink exact to="/home" activeClassName={styles.active} className={styles.navLink}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog" activeClassName={styles.active} className={styles.navLink}>
                                Blog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/store" activeClassName={styles.active} className={styles.navLink}>
                                Store
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/shopping-cart" activeClassName={styles.active}
                                className={styles.navLink}>
                                Shopping Cart
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                {isAdmin && (
                                    <li>
                                        <NavLink to="/admin" activeClassName={styles.active} className={styles.navLink}>
                                            Admin Page
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/my-profile" activeClassName={styles.active}
                                        className={styles.navLink}>
                                        My Profile
                                    </NavLink>
                                </li>

                                {showLogoutConfirmation && (
                                    <div className={styles.logoutConfirmation}>
                                        <p className={styles.logoutConfirmationTextArea}>Are you sure you want to log
                                            out?</p>
                                        <div className={styles.buttonContainer}>
                                            <button className={styles.button} onClick={handleLogout}>Logout</button>
                                            <button className={styles.button}
                                                onClick={() => setShowLogoutConfirmation(false)}>Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <li>
                                    <button
                                        className={styles.navLink}
                                        onClick={() => setShowLogoutConfirmation(true)}
                                    >Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login" activeClassName={styles.active} className={styles.navLink}>
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register" activeClassName={styles.active} className={styles.navLink}>
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className={styles.icons}>
                    <div className={styles.iconContainer}>
                        <NavLink to="/shopping-cart">
                            <FaShoppingCart />
                        </NavLink>
                        <span className={styles.cartCount}>{shoppingCart.totalProducts}</span>
                    </div>
                    <div className={styles.iconContainer}>
                        <FaBell />
                        <span className={styles.notificationCount}>0</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default withRouter(HeaderComponent);