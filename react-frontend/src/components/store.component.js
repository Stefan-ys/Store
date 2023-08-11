import React, { useState, useEffect } from "react";
import styles from "../css/store.module.css";
import { withRouter } from "../common/with-router";
import Pagination from "../utils/paginator.util";
import StoreService from "../services/store.service";

const Store = () => {
    const mockProduct = {
        name: "ITEM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 9.99,
        catalogNumber: 1, // Adding a unique identifier for the key
    };

    const [products, setProducts] = useState([]);

    const [sortBy, setSortBy] = useState("name"); // Default sorting criteria
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Number of products per page

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        // Simulating fetching products from a service
        setProducts(Array.from({ length: 30 }, (_, index) => ({ ...mockProduct, catalogNumber: index + 1 })));
    };

    const sortProducts = (sortBy) => {
        setSortBy(sortBy);
        // Implement sorting logic based on the selected criteria
        // Update the 'products' state with the sorted products
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    return (
        <div className={styles.storeContainer}>
            <div className={styles.menuBar}>
                <div className={styles.categoryBar}>
                    <button>ALL</button>
                    <button>CAT 1</button>
                    <button>CAT 2</button>
                    <button>CAT 3</button>
                    <button>CAT 4</button>
                </div>
                <div className={styles.sortOptions}>
                    <button onClick={() => sortProducts("name")}>Sort by Name</button>
                    <button onClick={() => sortProducts("price")}>Sort by Price</button>
                    {/* Add more sorting options as needed */}
                </div>

            </div>
            <div className={styles.productGrid}>
                {currentProducts.map((product) => (
                    <div key={product.catalogNumber} className={styles.productBox}>
                        {/* <img src={product.picture} alt={product.name} /> */}
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: {product.price} $</p>
                        <button className={styles.button}>Add to Cart</button>
                    </div>
                ))}
            </div>
            <Pagination
                itemsPerPage={productsPerPage}
                totalItems={products.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default withRouter(Store);
