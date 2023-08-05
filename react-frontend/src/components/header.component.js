import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {FaShoppingCart, FaBell} from "react-icons/fa";
import styles from "../css/header.module.css";
import AuthUtil from "../utils/auth.uitil";
import AuthService from "../services/auth.service";

const HeaderComponent = () => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const isLoggedIn = AuthUtil.isLoggedIn();
    const isAdmin = AuthUtil.isAdmin();
    const isModerator = AuthUtil.isModerator();
    const getUsername = AuthUtil.getUsername();
    const handleLogout = async () => {
        setShowLogoutConfirmation(false);
        try {
            await AuthService.logout();
            // window.location.href = "/home";
        } catch (error) {
            console.log("Error occurred during logout: ", error);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <NavLink to="/" className={styles.logoLink}>
                    Your Logo Here
                </NavLink>
            </div>
            <div className={styles.welcomeMessage}>
                {isLoggedIn && (
                    <div className={styles.userRoles}>
                        Welcome {getUsername}
                        {isAdmin && <span className={styles.adminRole}>ADMIN</span>}
                        {isModerator && <span className={styles.moderatorRole}>MODERATOR</span>}
                    </div>
                )}
            </div>
            <div className={styles.navContainer}>
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
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink to="/my-profile" activeClassName={styles.active}
                                             className={styles.navLink}>
                                        My Profile
                                    </NavLink>
                                </li>

                                {showLogoutConfirmation && (
                                    <div className={styles.logoutConfirmation}>
                                        <p>Are you sure you want to log out?</p>
                                        <button onClick={handleLogout}>Logout</button>
                                        <button onClick={() => setShowLogoutConfirmation(false)}>Cancel</button>
                                    </div>
                                )}

                                <li>
                                    <NavLink
                                        to="/logout"
                                        activeClassName={styles.active}
                                        className={styles.navLink}
                                        onClick={() => setShowLogoutConfirmation(true)}
                                    >
                                        Logout
                                    </NavLink>
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
                                    <NavLink to="/signup" activeClassName={styles.active} className={styles.navLink}>
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
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
            </div>

        </header>
    );
};

export default HeaderComponent;