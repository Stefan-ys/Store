import React, { useState, useRef } from "react";
import styles from "../css/menu.module.css";
import { withRouter } from "../common/with-router";

function Menu({ menu }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const submenuTimer = useRef(null);

  const handleMenuClick = (action) => {
    if (action) {
      action();
    }
  };

  const handleMenuEnter = (menuName) => {
    clearTimeout(submenuTimer.current);
    setActiveMenu(menuName);
    setActiveSubmenu(null);
  };

  const handleSubmenuEnter = (menuName) => {
    clearTimeout(submenuTimer.current);
    setActiveSubmenu(menuName);
  };

  const handleMenuLeave = () => {
    submenuTimer.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubmenu(null);
    }, 300);
  };

  return (
    <nav>
      <ul className={styles.menu}>
        {menu.map((menuItem, index) => (
          <li
            key={index}
            className={`${styles.menuItem} ${activeMenu === menuItem.name ? styles.active : ""
              }`}
            onMouseEnter={() => handleMenuEnter(menuItem.name)}
            onMouseLeave={handleMenuLeave}
          >
            <span onClick={() => handleMenuClick(menuItem.action)}>{menuItem.name}</span>
            {(activeMenu === menuItem.name || menuItem.items) && (
              <ul className={styles.submenu}>
                {menuItem.items &&
                  menuItem.items.map((submenuItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`${styles.submenuItem} ${activeSubmenu === submenuItem.label
                        ? styles.activeSubmenu
                        : ""
                        }`}
                      onMouseEnter={() => handleSubmenuEnter(submenuItem.label)}
                    >
                      <span onClick={() => handleMenuClick(submenuItem.action)}>{submenuItem.label}</span>
                      {submenuItem.items && activeSubmenu === submenuItem.label && (
                        <ul className={styles.submenuRight}>
                          {submenuItem.items.map((subSubmenuItem, subSubIndex) => (
                            <li
                              key={subSubIndex}
                              onClick={() => handleMenuClick(subSubmenuItem.action)}
                            >
                              {subSubmenuItem.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
