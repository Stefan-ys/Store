import React, { useState, useEffect } from "react";
import styles from "../css/store.module.css";
import { withRouter } from "../common/with-router";
import Pagination from "../utils/pagination.util";
import StoreService from "../services/store.service";
import ShoppingCartService from "../services/shopping-cart.service";
import { Link } from "react-router-dom";

const Store = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [categoryOption, setCategoryOption] = useState("All");
    const [sortOption, setSortOption] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");


    useEffect(() => {
        getProducts();
    }, [currentPage, productsPerPage, categoryOption, sortOption, sortOrder]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        getProducts();
    };

    const handleSortChange = (event) => {
        const { name, value } = event.target;
        if (name === "categoryOption") {
            setCategoryOption(value);
        } else if (name === "sortOption") {
            setSortOption(value);
        } else if (name === "sortOrder") {
            setSortOrder(value);
        }
    };

    const handleProductsPerPageChange = (event) => {
        setProductsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getProducts = async () => {
        setLoading(true);
        setMessage("");
        try {

            const data = await StoreService.getAllProducts(currentPage, productsPerPage, categoryOption, sortOption, sortOrder);

            setProducts(data.products);
            setTotalPages(data.totalPages);

        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");

        } finally {
            setLoading(false);
        }
    };

    const addToShoppingCart = (productId) => {
        setLoading(true);
        try {
            ShoppingCartService.addToCart(productId);
            setMessage("Product added to cart successfully.");
        } catch (error) {
            console.log("Error adding product to cart: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");

        } finally {
            setLoading(false);
        }
    };





    const renderProducts = () => {
        return products.map((product) => (
            <div key={product.catalogNumber} className={styles.productBox}>
                {/* <img src={product.picture} alt={product.name} /> */}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: {product.price} $</p>
                <div>
                    <Link to={`/product/${product.id}`} state={product} style={{ textDecoration: 'none' }}>
                        <button className={styles.button}>
                            View Product
                        </button>
                    </Link>
                    <button className={styles.button} onClick={() => addToShoppingCart(product.id)}>Add to Cart</button>
                </div>
            </div>
        ));
    };

    return (
        <div className={styles.storeContainer}>
            <div className={styles.menuBar}>
                <div className={styles.sortOptions}>
                    <label>
                        Select category:
                        <select
                            name="categoryOption"
                            value={categoryOption}
                            onChange={handleSortChange}
                        >
                            <option value="all">All</option>
                            <option value="CAT 1">CAT 1</option>
                            <option value="CAT 2">CAT 2</option>
                            <option value="CAT 3">CAT 3</option>
                            <option value="CAT 4">CAT 4</option>
                        </select>
                    </label>
                    <label>
                        Sort by:
                        <select
                            name="sortOption"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="newest">Newest</option>
                        </select>
                    </label>
                    <label>
                        Order:
                        <select
                            name="sortOrder"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                    <button onClick={() => getProducts()}>Apply</button>
                </div>
                <div className={styles.productsPerPage}>
                    <span>Show products per page:</span>
                    <select value={productsPerPage} onChange={handleProductsPerPageChange}>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>

            </div>
            <div className={styles.productGrid}>
                {products.length > 0 ? (
                    renderProducts()
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default withRouter(Store);
