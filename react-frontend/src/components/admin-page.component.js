import React, { useState } from 'react';
import styles from '../css/admin-page.module.css'; 
import {withRouter} from "../common/with-router";

const AdminPage = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      // Toggle submenu if already active
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <div className={styles['admin-page']}>
      <div className={styles.menu}>
        <div
          className={`${styles['menu-item']} ${activeMenu === 'Users' ? styles.active : ''}`}
          onClick={() => handleMenuClick('Users')}
        >
          Users
          {activeMenu === 'Users' && (
            <ul className={styles.submenu}>
              <li>All Users</li>
            </ul>
          )}
        </div>
        <div
          className={`${styles['menu-item']} ${activeMenu === 'Products' ? styles.active : ''}`}
          onClick={() => handleMenuClick('Products')}
        >
          Products
          {activeMenu === 'Products' && (
            <ul className={styles.submenu}>
              <li>All Products</li>
              <li>Add Product</li>
            </ul>
          )}
        </div>
        <div
          className={`${styles['menu-item']} ${activeMenu === 'Comments' ? styles.active : ''}`}
          onClick={() => handleMenuClick('Comments')}
        >
          Comments
          {activeMenu === 'Comments' && (
            <ul className={styles.submenu}>
              <li>All Comments</li>
            </ul>
          )}
        </div>
        <div
          className={`${styles['menu-item']} ${activeMenu === 'Notifications' ? styles.active : ''}`}
          onClick={() => handleMenuClick('Notifications')}
        >
          Notifications
          {activeMenu === 'Notifications' && (
            <ul className={styles.submenu}>
              <li>All Notifications</li>
              <li>Received Notifications</li>
              <li>Send Notification</li>
            </ul>
          )}
        </div>
        <div
          className={`${styles['menu-item']} ${activeMenu === 'Orders' ? styles.active : ''}`}
          onClick={() => handleMenuClick('Orders')}
        >
          Orders
          {activeMenu === 'Orders' && (
            <ul className={styles.submenu}>
              <li>All Orders</li>
            </ul>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {/* Render content based on the activeMenu */}
        {activeMenu === 'Users' && <div>Users content here</div>}
        {activeMenu === 'Products' && <div>Products content here</div>}
        {activeMenu === 'Comments' && <div>Comments content here</div>}
        {activeMenu === 'Notifications' && <div>Notifications content here</div>}
        {activeMenu === 'Orders' && <div>Orders content here</div>}
      </div>
    </div>
  );
};

export default withRouter(AdminPage);
