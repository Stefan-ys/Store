import React from 'react';
import styles from '../../../../../css/Navbar.module.css'
import NavLinks from "./NavLinks/NavLinks";

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <NavLinks/>
        </nav>
    );
}

export default NavBar;