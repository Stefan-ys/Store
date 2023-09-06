import React, { useState } from 'react';
import styles from '../css/admin-page.module.css';
// import { withRouter } from "../common/with-router";
import Menu from "../utils/menu.util.js";
import Pagination from "../utils/pagination.util";
import AdminService  from '../services/admin-page.service';


const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const getAllUsers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await AdminService.getAllUsers(currentPage, productsPerPage, sortOption, sortOrder);

      setUsers(data.users);
      setTotalPages(data.totalPages);

    } catch (error) {
      console.log("Error fetching products data: ", error);
      setMessage(error.response ? error.response.data.message : "An error has occurred.");

    } finally {
      setLoading(false);
    }
  };

  const getAdminUsers = () => {

  };

  const getModeratorUsers = () => {

  };

  const AddProduct = () => {

  };

  const getAllProducts = () => {

  };

  const getAllOrders = () => {

  };

  const getActiveOrders = () => {

  };

  const getCompletedOrders = () => {

  };

  const getCanceledOrders = () => {

  };

  const getAllComments = () => {

  };

  const myNotifications = () => {
  };

  const sendNotification = () => {

  };

  const getAllNotifications = () => {

  };


  const menuItems = [
    {
      name: "Users",
      items: [
        { label: "All Users", action: getAllUsers },
        { label: "Admin Users", action: getAdminUsers },
        { label: "Moderator Users", action: getModeratorUsers },
      ],
    },
    {
      name: "Products",
      items: [
        { label: "Add Product", action: AddProduct },
        { label: "All Products", action: getAllProducts },
      ],
    },
    {
      name: "Orders",
      items: [
        { label: "All Orders", action: getAllOrders },
        { label: "Active Orders", action: getActiveOrders },
        { label: "Completed Orders", action: getCompletedOrders },
        { label: "Canceled Orders", action: getCanceledOrders },
      ],
    },
    {
      name: "Comments",
      items: [
        { label: "All Comments", action: getAllComments },
      ],
    },
    {
      name: "Notifications",
      items: [
        { label: "My Notifications", action: myNotifications },
        { label: "Send Notification", action: sendNotification },
        { label: "All Notifications", action: getAllNotifications },
      ],
    },
  ];


  return (
    <section>
      <div className={styles['admin-page']}>
        <Menu menu={menuItems} />
      </div>
    </section>
  );
};

export default AdminPage;
