import React, { useState } from "react";
import styles from "../css/menu.module.css";

const Menu = ({ menuItems }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState(null);

  const handleMenuClick = (action) => {
    if (action) {
      action();
    }
  };

  const handleMenuEnter = (menuName) => {
    setActiveMenu(menuName);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  };

  const handleSubmenuEnter = (menuName) => {
    setActiveSubmenu(menuName);
    setActiveSubSubmenu(null);
  };

  const handleSubSubmenuEnter = (menuName) => {
    setActiveSubSubmenu(menuName);
  };


  const handleMenuLeave = () => {
    setActiveMenu(null);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  };

  return (
    <nav className={styles.navMenu}>
      <menu className={styles.mainMenu}>
        {menuItems.map((menuItem, index) => (
          <li
            key={index}
            className={`${styles.menuItem} ${activeMenu === menuItem.name ? styles.active : ""
              }`}
            onMouseEnter={() => handleMenuEnter(menuItem.name)}
            onMouseLeave={handleMenuLeave}
          >
            <span onClick={menuItem.action ? () => handleMenuClick(menuItem.action) : () => { }}>
              {menuItem.name}
            </span>
            {menuItem.items && (
              <menu className={styles.submenu}>
                {menuItem.items.map((submenuItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`${styles.submenuItem} ${activeSubmenu === submenuItem.label ? styles.activeSubmenu : ""
                      }`}
                    onMouseEnter={() => handleSubmenuEnter(submenuItem.label)}
                  >
                    <span onClick={submenuItem.action ? () => handleMenuClick(submenuItem.action) : ""}>{submenuItem.label}  {submenuItem.items ? <i className={styles.arrowRight}></i> : ""}</span>
                    {submenuItem.items && (
                      <menu className={styles.subSubmenu}>
                        {submenuItem.items.map((subSubmenuItem, subSubIndex) => (
                          <li
                            key={subSubIndex}
                            className={`${styles.subSubmenuItem} ${activeSubSubmenu === subSubmenuItem.label
                              ? styles.activeSubSubmenu
                              : ""
                              }`}
                            onMouseEnter={() =>
                              handleSubSubmenuEnter(subSubmenuItem.label)
                            }
                          >
                            <span onClick={subSubmenuItem.action ? () => handleMenuClick(subSubmenuItem.action) : ""}>{subSubmenuItem.label}</span>
                          </li>
                        ))}
                      </menu>
                    )}
                  </li>
                ))}
              </menu>
            )}
          </li>
        ))}
      </menu>
    </nav>
  );
}

export default Menu;
