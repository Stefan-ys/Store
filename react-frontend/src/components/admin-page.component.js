import React, { useState, useEffect } from "react";
import styles from "../css/admin-page.module.css";
import { withRouter } from "../common/with-router";
import Menu from "../utils/menu.util.js";
import DataTable from "../utils/data-table.util";
import AdminUserService from "../services/admin-user.service";
import AdminProductService from "../services/admin-product.service";
import AdminOrderService from "../services/admin-order.service";
import AdminCommentService from "../services/admin-comment.service";
import AddProductComponent from "./add-product.component";

const userRoles = [
    { label: "Show All", checked: true },
    { labe: "User Role", checked: false },
    { label: "Admin Role", checked: false },
    { label: "Moderator Role", checked: false },
];

const productStatus = [
    { label: "Show All", checked: true },
    { label: "New", checked: false },
    { label: "Promotion", checked: false },
    { label: "Coming soon", checked: false },
    { label: "Out of stock", checked: false },
];

const productCategories = [
    { label: "Show All", checked: true },
    { label: "Circles", checked: false },
    { label: "Triangles", checked: false },
    { label: "Squares", checked: false },
    { label: "Rectangles", checked: false },
];

const orderStatus = [
    { label: "Show All", checked: true },
    { label: "Active", checked: false },
    { label: "Completed", checked: false },
    { label: "Cancelled", checked: false },
];


const AdminPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showTableData, setShowTableData] = useState(false);
    const [userRoleOptions, setUserRoleOptions] = useState(userRoles);
    const [productCategoryOptions, setProductCategoryOptions] = useState(productCategories);
    const [productStatusOptions, setProductStatusOptions] = useState(productStatus);
    const [orderOptions, setOrderOptions] = useState(orderStatus);

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

    const getUsers = async () => {
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


    const AddProduct = () => {
        handleMenuClick(AddProduct);
    };

    const getProducts = async () => {
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

    const getOrders = async () => {
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


    const getComments = async () => {
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

    const updateOption = (label, options, setOptions) => {
        const updatedOptions = options.map((option) => {
          if (option.label === "Show All" && label !== "Show All") {
            return { ...option, checked: false };
          } else if (option.label !== "Show All" && label === "Show All") {
            return { ...option, checked: false };
          } else if (option.label === label) {
            return { ...option, checked: !option.checked };
          }
          return option;
        });
        setOptions(updatedOptions);
      };

    const menuItems = [

        {
            name: "Users",
            options: userRoleOptions,
            items: userRoleOptions.map((option) => ({
                label: option.label,
                action: () => updateOption(option.label, userRoleOptions, setUserRoleOptions),
            })),
        },
        {
            name: "Products",
            items: [
                // { label: "All Products", action: getAllProducts },
                { label: "Add Product", action: AddProduct },
            ],
        },
        {
            name: "Orders",
            items: [
                // { label: "All Orders", action: getAllOrders },
                // { label: "Active Orders", action: getActiveOrders },
                // { label: "Completed Orders", action: getCompletedOrders },
                // { label: "Canceled Orders", action: getCanceledOrders },
            ],
        },
        {
            name: "Comments",
            items: [
                // { label: "All Comments", action: getAllComments },
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
                <Menu menuItems={menuItems} />
            </div>
            {showAddProduct && (
                <AddProductComponent />
            )}
            {showTableData && (
                <div>
                    <DataTable data={data} loading={loading} message={message} />
                </div>
            )}

        </section>
    );
};

export default withRouter(AdminPage);