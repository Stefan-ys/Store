import React, { useState } from "react";
import styles from "../css/admin-page.module.css";
import { withRouter } from "../common/with-router";
import Menu from "../utils/menu.util.js";
import DataTable from "../utils/data-table.util";
import AdminUserService from "../services/admin-user.service";
import AdminProductService from "../services/admin-product.service";
import Pagination from "../utils/pagination.util";
import AddProductComponent from "./add-product.component";


const AdminPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [currentFunction, setCurrentFunction] = useState("() => () => {}");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOption, setSortOption] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");

    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showTableData, setShowTableData] = useState(false);

    const handleMenuClick = (action) => {
        if (action) {
            if (action === AddProduct) {
                setShowAddProduct(true);
                setShowTableData(false);
            } else {
                setShowAddProduct(false);
                setShowTableData(true);
            }
        }
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        eval(currentFunction)();
    };

    const getAllUsers = async () => {
        setLoading(true);
        setMessage("");
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const users = await AdminUserService.getAllUsersService(currentPage, itemsPerPage, sortOption, sortOrder);
            setCurrentFunction("getAllUsers");
            setData(users.users);
            setTotalPages(users.totalPages);

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
        handleMenuClick(AddProduct);
    };

    const getAllProducts = async () => {
        setLoading(true);
        setMessage("");
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const products = await AdminProductService.getAllProductsService(currentPage, itemsPerPage, sortOption, sortOrder);
            setCurrentFunction("getAllProducts");
            setData(products.products);
            setTotalPages(products.totalPages);

        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");

        } finally {
            setLoading(false);
        }

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
                { label: "All Products", action: getAllProducts },
                { label: "Add Product", action: AddProduct },
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
            <div className={styles['menu-page']}>
                <Menu menuItems={menuItems}  />
            </div>
            {showAddProduct && (
                <AddProductComponent />
            )}
            {showTableData && (
                <div>
                    <DataTable data={data} loading={loading} message={message} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

        </section>
    );
};

export default withRouter(AdminPage);