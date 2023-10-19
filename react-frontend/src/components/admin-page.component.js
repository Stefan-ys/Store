import React, {useState, useEffect} from "react";
import styles from "../css/admin-page.module.css";
import {withRouter} from "../common/with-router";
import Menu from "../utils/menu.util.js";
import DataTable from "../utils/data-table.util";
import AdminUserService from "../services/admin-user.service";
import AdminProductService from "../services/admin-product.service";
import AdminOrderService from "../services/admin-order.service";
import AdminCommentService from "../services/admin-comment.service";
import AddProductComponent from "./add-product.component";


const AdminPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showTableData, setShowTableData] = useState(false);

    useEffect(() => {
    }, [data]);

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

    const getAllUsers = async () => {
        setLoading(true);
        setMessage("");
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const users = await AdminUserService.getAllUsersService();
            setData(users);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const getAdminUsers = async () => {
        setLoading(true);
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const users = await AdminUserService.getAdminUsers();
            setData(users);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const getModeratorUsers = async () => {
        setLoading(true);
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const users = await AdminUserService.getModeratorUsers();
            setData(users);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
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
            const products = await AdminProductService.getAllProductsService();
            console.log(products);
            setData(products);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }

    };

    const getAllOrders = async () => {
        setLoading(true);
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const users = await AdminOrderService.getOrders();
            setData(users);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const getActiveOrders = () => {
    };

    const getCompletedOrders = () => {
    };

    const getCanceledOrders = () => {
    };

    const getAllComments = async () => {
        setLoading(true);
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const comments = await AdminCommentService.getAllComments();
            setData(comments);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
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
                {label: "All Users", action: getAllUsers},
                {label: "Admin Users", action: getAdminUsers},
                {label: "Moderator Users", action: getModeratorUsers},
            ],
        },
        {
            name: "Products",
            items: [
                {label: "All Products", action: getAllProducts},
                {label: "Add Product", action: AddProduct},
            ],
        },
        {
            name: "Orders",
            items: [
                {label: "All Orders", action: getAllOrders},
                {label: "Active Orders", action: getActiveOrders},
                {label: "Completed Orders", action: getCompletedOrders},
                {label: "Canceled Orders", action: getCanceledOrders},
            ],
        },
        {
            name: "Comments",
            items: [
                {label: "All Comments", action: getAllComments},
            ],
        },
        {
            name: "Notifications",
            items: [
                {label: "My Notifications", action: myNotifications},
                {label: "Send Notification", action: sendNotification},
                {label: "All Notifications", action: getAllNotifications},
            ],
        },
    ];

    return (
        <section>
            <div className={styles['menu-page']}>
                <Menu menuItems={menuItems}/>
            </div>
            {showAddProduct && (
                <AddProductComponent/>
            )}
            {showTableData && (
                <div>
                    <DataTable data={data} loading={loading} message={message}/>
                </div>
            )}

        </section>
    );
};

export default withRouter(AdminPage);