import React from 'react';
import styles from '../../../../css/Navbar.module.css'

import {Link} from "react-router-dom";


function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link to="/" className={styles.navbarLogo}>LOGO</Link>
                <ul className={styles.navbarMenu}>
                    <li className={styles.navbarItem}>
                        <Link to="/" className={styles.navbarLink}>Home</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;