import React from "react";
import styles from "../../../../../../css/Navbar.module.css"
import AuthenticationService from "../../../../../../api/authentication/AuthenticationService";
import {NavLink} from "react-router-dom";

const NavLinks = () => {
    const userLogged = AuthenticationService.isUserLoggedIn();

    return (
        <div>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>

                {userLogged && (
                    <li onClick={AuthenticationService.logout}>
                        <NavLink to="/">Logout</NavLink>
                    </li>
                )}
                {!userLogged && (
                    <>
                        <li>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}
export default NavLinks;