import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {FaShoppingCart, FaBell} from "react-icons/fa";
import styles from "../../../../css/Header.module.css";
import AuthenticationService from "../../../../services/authentication/AuthenticationService";

const Header = () => {
    const isAuthenticated = AuthenticationService.isAuthenticated()

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <NavLink exact to="/" activeClassName={styles.active} className={styles.navLink}>
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
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <NavLink to="/login" activeClassName={styles.active} className={styles.navLink}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup" activeClassName={styles.active} className={styles.navLink}>
                                    Signup
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/my-profile" activeClassName={styles.active} className={styles.navLink}>
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/logout" activeClassName={styles.active} className={styles.navLink}>
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                < /ul>
            </nav>
            <div className={styles.icons}>
                <div className={styles.iconContainer}>
                    <FaShoppingCart/>
                    <span className={styles.cartCount}>5</span>
                </div>
                <div className={styles.iconContainer}>
                    <FaBell/>
                    <span className={styles.notificationCount}>2</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
