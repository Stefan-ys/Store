import React, {useState, useEffect} from "react";
import styles from "../css/store.module.css";
import {withRouter} from "../common/with-router";
import Pagination from "../utils/paginator.util";
import StoreService from "../services/store.service";


const Store = () => {
    const [products, setProducts] = useState([]);
    const [sortBy, setSortBy] = useState('name'); // Default sorting criteria
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Number of products per page

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        StoreService.getProducts() // Replace with your actual service method
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log('Error fetching products: ', error);
            });
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
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className={styles.storeContainer}>
            <div className={styles.sortOptions}>
                <button onClick={() => sortProducts('name')}>Sort by Name</button>
                <button onClick={() => sortProducts('price')}>Sort by Price</button>
                {/* Add more sorting options as needed */}
            </div>
            <div className={styles.productGrid}>
                {currentProducts.map((product) => (
                    <div key={product.catalogNumber} className={styles.productBox}>
                        {/*<img src=/!* product picture *!/ alt={product.name} />*/}
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button>Add to Cart</button>
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