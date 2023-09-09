import React, { useState, useRef } from "react";
import styles from "../css/menu.module.css";

function Menu({ menu }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const submenuTimer = useRef(null);

  const handleMenuEnter = (menuName) => {
    clearTimeout(submenuTimer.current);
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    submenuTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300); 
  };

  return (
    <nav>
      <ul className={styles.menu}>
        {menu.map((menuItem, index) => (
          <li
            key={index}
            className={`${styles.menuItem} ${
              activeMenu === menuItem.name ? styles.active : ""
            }`}
            onMouseEnter={() => handleMenuEnter(menuItem.name)}
            onMouseLeave={handleMenuLeave}
          >
            {menuItem.name}
            {activeMenu === menuItem.name && (
              <ul className={styles.submenu}>
                {menuItem.items.map((submenuItem, subIndex) => (
                  <li key={subIndex} onClick={submenuItem.action}>
                    {submenuItem.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;