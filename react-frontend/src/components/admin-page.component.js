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

const userRoles = {
    "Show All": true,
    "User": false,
    "Admin": false,
    "Moderator": false,
};

const productStatus = {
    "Show All": true,
    "New": false,
    "Promotion": false,
    "Coming soon": false,
    "Out Of Stock": false,
};

const productCategories = {
    "Show All": true,
    "Circles": false,
    "Triangles": false,
    "Squares": false,
    "Rectangles": false,
};

const orderStatus = {
    "Show All": true,
    "Active": false,
    "Completed": false,
    "Cancelled": false,
};

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showTableData, setShowTableData] = useState(false);
    const [tableName, setTableName] = useState("None");
    const [userRoleFilter, setUserRoleFilter] = useState(userRoles);
    const [productStatusFilter, setProductStatusFilter] = useState(productStatus);
    const [productCategoryFilter, setProductCategoryFilter] = useState(productCategories);
    const [orderStatusFilter, setOrderStatusFilter] = useState(orderStatus);

    useEffect(() => {
    }, [data]);

    useEffect(() => {
        switch (tableName) {
            case "Users":
                filterData([[userRoleFilter, "roles"]]);
                break;
            case "Products":
                filterData([[productCategoryFilter, "productCategory"], [productStatusFilter, "status"]]);
                break;
            case "Orders":
                filterData([[orderStatusFilter, "status"]]);
                break;
        };
    }, [userRoleFilter, productStatusFilter, productCategoryFilter, orderStatusFilter]);

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
            setFilteredData(users);
            setTableName("Users");
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const getAllProducts = async () => {
        setLoading(true);
        setMessage("");
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const products = await AdminProductService.getAllProductsService();
            setData(products);
            setTableName("Products");
            setFilteredData(products);
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

    const getAllOrders = async () => {
        setLoading(true);
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const users = await AdminOrderService.getOrders();
            setData(users);
            setTableName("Orders");
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const getAllComments = async () => {
        setLoading(true);
        setShowAddProduct(false);
        setShowTableData(true);
        try {
            const comments = await AdminCommentService.getAllComments();
            setData(comments);
            setTableName("Comments");
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");
        } finally {
            setLoading(false);
        }
    };

    const getAllNotifications = () => {
    };

    const myNotifications = () => {
    };

    const sendNotification = () => {
    };

    const menuItems = [
        {
            name: "Users",
            items: [
                { label: "Show Users", action: getAllUsers },
            ],
        },
        {
            name: "Products",
            items: [
                { label: "Show Products", action: getAllProducts },
                { label: "Add Product", action: AddProduct },
            ],
        },
        {
            name: "Orders",
            items: [
                { label: "Show Orders", action: getAllOrders },
            ],
        },
        {
            name: "Comments",
            items: [
                { label: "Show Comments", action: getAllComments },
            ],
        },
        {
            name: "Notifications",
            items: [
                { label: "Show Notifications", action: getAllNotifications },
                { label: "My Notifications", action: myNotifications },
                { label: "Send Notification", action: sendNotification },
            ],
        },
    ];

    const renderFilterBox = () => {
        switch (tableName) {
            case "Users":
                return (
                    <div className={styles.filterBox}>
                        {renderBox(userRoleFilter, setUserRoleFilter)}
                    </div>
                );
            case "Products":
                return (
                    <div className={styles.filterBoxRow}>
                        <div className={styles.filterBox}>
                            {renderBox(productStatusFilter, setProductStatusFilter)}
                        </div>
                        <div className={styles.filterBox}>
                            {renderBox(productCategoryFilter, setProductCategoryFilter)}
                        </div>
                    </div>
                );
            case "Orders":
                return (
                    <div className={styles.filterBox}>
                        {renderBox(orderStatusFilter, setOrderStatusFilter)}
                    </div>
                );
            case "Comments":
                return null;
        }
    };

    const renderBox = (filter, setFilter, getData) => {
        return (
            <div className={styles.box}>
                {Object.keys(filter).map((label) => (
                    <label key={label} className={styles.label}>
                        <input
                            type="checkbox"
                            value={label}
                            checked={filter[label]}
                            onChange={() => toggleFilter(label, filter, setFilter, getData)}
                        />
                        {label}
                    </label>
                ))}
            </div>
        );
    };


    const toggleFilter = (label, filter, setFilter, getData) => {
        const updatedFilter = { ...filter };
        if (label === "Show All") {
            for (const key in filter) {
                updatedFilter[key] = false;
            }
        } else {
            updatedFilter["Show All"] = false;
        }
        updatedFilter[label] = !updatedFilter[label];
        setFilter(updatedFilter);
    };

    const filterData = (filterArray) => {
        let updatedData = [...data];

        filterArray.forEach(([filter, subject]) => {
            console.log(filter);
            console.log(subject);
            if (!filter["Show All"]) {
                updatedData = updatedData.filter((item) => {
                    return Object
                        .keys(filter)
                        .some((sub) =>
                            item[subject].includes(sub.toUpperCase()) && filter[sub]);
                });
            }
        });
        setFilteredData(updatedData);
    };

    return (
        <section>
            <div className={styles['menu-page']}>
                <Menu menuItems={menuItems} />
            </div>
            {showAddProduct && (
                <AddProductComponent />
            )}
            {showTableData && (
                <>
                    {renderFilterBox()}
                    <div>
                        <DataTable data={filteredData} loading={loading} message={message} />
                    </div>
                </>
            )}
        </section>
    );
};

export default withRouter(AdminPage);
