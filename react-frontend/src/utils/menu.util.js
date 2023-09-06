import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "../css/menu.module.css";

function Menu({ menu }) {
  const [activeMenu, setActiveMenu] = useState(null);


  const heightSpring = useSpring({
    height: activeMenu ? "auto" : 0,
  });

  
  const borderWidthSpring = useSpring({
    borderWidth: activeMenu ? "1px" : "0px", 
  });

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName === activeMenu ? null : menuName);
  };

  return (
    <div className={styles.menu}>
      {menu.map((menuItem, index) => (
        <div
          key={index}
          className={`${styles["menu-item"]} ${activeMenu === menuItem.name ? styles.active : ""}`}
          onClick={() => handleMenuClick(menuItem.name)}
        >
          {menuItem.name}
          {activeMenu === menuItem.name && (
            <animated.ul
              style={{  ...heightSpring, ...borderWidthSpring }}
              className={styles.submenu}
            >
              {menuItem.items.map((submenuItem, subIndex) => (
                <li key={subIndex} onClick={submenuItem.action}>
                  {submenuItem.label}
                </li>
              ))}
            </animated.ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;
