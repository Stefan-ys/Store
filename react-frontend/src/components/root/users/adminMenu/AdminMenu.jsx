import React, {useContext} from "react";
import {Link} from "react-router-dom";
import styles from "../../../../css/AdminMenu.module.css";
import AuthenticationService from "../../../../services/authentication/AuthenticationService";
import AuthContext from "../../../../context/AuthProvider"

const AdminMenu = () => {
    //const isAdmin = AuthenticationService.hasRole("ADMIN");
    const {authData} = useContext(AuthContext);
    console.log(authData.roles)
    let isAdmin = false;
    if(authData.roles) {
        isAdmin = authData.roles.includes("ROLE_ADMIN");
    }
    return (<>
            {isAdmin ? (
                <section className={styles.adminMenu}>
                    <div className={styles.adminMenuHeader}>Admin Menu</div>
                    <ul className={styles.adminMenuLinks}>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/messages">Messages</Link>
                        </li>
                        <li>
                            <Link to="/add-product">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/add-blog-post">Add Blog Post</Link>
                        </li>
                    </ul>
                </section>
            ) : (<></>)
            }</>
    );
};

export default AdminMenu;
