import React, { useState, useEffect } from "react";
import styles from "../../css/admin-page.module.css";
import { withRouter } from "../../common/with-router";
import { FaSearch } from "react-icons/fa";
import Menu from "../../utils/menu.util.js";
import DataTable from "../../utils/data-table.util";
import AdminUserService from "../../services/admin/admin-user.service";
import AdminProductService from "../../services/admin/admin-product.service";
import AdminOrderService from "../../services/admin/admin-order.service";
import AdminCommentService from "../../services/admin/admin-comment.service";
import AddProductComponent from "./add-product.component";
import { update } from "react-spring";

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
    const [searchUsername, setSearchUsername] = useState("");
    const [productStatusFilter, setProductStatusFilter] = useState(productStatus);
    const [productCategoryFilter, setProductCategoryFilter] = useState(productCategories);
    const [searchProductName, setSearchProductName] = useState("");
    const [orderStatusFilter, setOrderStatusFilter] = useState(orderStatus);

    useEffect(() => {
    }, [data]);

    useEffect(() => {
        switch (tableName) {
            case "Users":
                filterData([[
                    userRoleFilter, "roles",
                    searchUsername, ["username", "firstName", "lastName", "email"]
                ]]);
                break;
            case "Products":
                filterData([[
                    productCategoryFilter, "productCategory"],
                [
                    productStatusFilter, "status",
                    searchProductName, ["name", "catalogueNumber"]
                ]]);
                break;
            case "Orders":
                filterData([[orderStatusFilter, "status"]]);
                break;
        }
    }, [userRoleFilter, productStatusFilter, productCategoryFilter,
        orderStatusFilter, searchUsername, searchProductName]);


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
                    <div className={styles.filterBoxRow}>
                        <div className={styles.filterBox}>
                            <h2>User Roles</h2>
                            {renderCheckbox(userRoleFilter, setUserRoleFilter)}
                        </div>
                        <div className={styles.filterBox}>
                            <h2>Search</h2>
                            {renderSearchBox("Search for users", searchUsername, setSearchUsername)}
                        </div>
                    </div>
                );
            case "Products":
                return (
                    <div className={styles.filterBoxRow}>
                        <div className={styles.filterBox}>
                            <h2>Product Status</h2>
                            {renderCheckbox(productStatusFilter, setProductStatusFilter)}
                        </div>
                        <div className={styles.filterBox}>
                            <h2>Product Category</h2>
                            {renderCheckbox(productCategoryFilter, setProductCategoryFilter)}
                        </div>
                        <div className={styles.filterBox}>
                            <h2>Search</h2>
                            {renderSearchBox("Search for products", searchProductName, setSearchProductName)}
                        </div>
                    </div>
                );
            case "Orders":
                return (
                    <div className={styles.filterBox}>
                        {renderCheckbox(orderStatusFilter, setOrderStatusFilter)}
                    </div>
                );
            case "Comments":
                return null;
        }
    };

    const renderCheckbox = (filter, setFilter) => {
        return (
            <div className={styles.box}>
                {Object.keys(filter).map((label) => (
                    <label key={label} className={styles.label}>
                        <input
                            type="checkbox"
                            value={label}
                            checked={filter[label]}
                            onChange={() => toggleFilter(label, filter, setFilter)}
                        />
                        {label}
                    </label>
                ))}
            </div>
        );
    };

    const toggleFilter = (label, filter, setFilter) => {
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

    const renderSearchBox = (label, search, setSearch) => {
        return (
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder={label}
              value={search}
              onChange={handleSearchInputChange(setSearch)}
              className={styles.searchInput}
            />
          </div>
        );
      };

    const handleSearchInputChange = (valueSetter) => (e) => {
        valueSetter(e.target.value);
    };

    const filterData = (filterArray) => {
        let updatedData = [...data];

        filterArray.forEach(([filter, filterSubject, search, searchSubjects]) => {
            if (!filter["Show All"]) {
                updatedData = updatedData.filter((item) => {
                    return Object
                        .keys(filter)
                        .some((subject) =>
                            item[filterSubject].includes(subject.toUpperCase()) && filter[subject]);
                });
            }
            if (searchSubjects) {
                updatedData = updatedData.filter((item) => {
                    return searchSubjects.some((searchSubject) => {
                        return item[searchSubject] && item[searchSubject].toLowerCase().includes(search.toLowerCase());
                    });
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