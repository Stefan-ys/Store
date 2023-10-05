import React, {useState, useEffect} from "react";
import styles from "../css/store.module.css";
import {withRouter} from "../common/with-router";
import Pagination from "../utils/paginator.util";
import StoreService from "../services/store.service";
import ShoppingCartService from "../services/shopping-cart.service";
import {Link} from "react-router-dom";

const Store = () => {
    const mockProduct = {
        name: "ITEM",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        price: 9.99,
        catalogNumber: 1,
    };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [sortBy, setSortBy] = useState("name");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);

    useEffect(() => {
        getProducts();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const getProducts = () => {
        setLoading(true);
        // setProducts(Array.from({ length: 30 }, (_, index) => ({ ...mockProduct, catalogNumber: index + 1 })));
        StoreService.getProducts(sortBy)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log("Error fetching products data: ", error);
                setMessage(error.response ? error.response.data.message : "An error has occurred.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const addToShoppingCart = (productId) => {
        setLoading(true);
        ShoppingCartService.addToCart(productId)
            .then((data) => {
                // TODO: show on success message
                setMessage("Product added to cart successfully.")
            })
            .catch((error) => {
                console.log("Error adding product to cart: ", error);
                setMessage(error.response ? error.response.data.message : "An error has occurred.");
            })
            .finally(() => {
                setLoading(false);
            });
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
                    <button onClick={() => getProducts("name")}>Sort by Name</button>
                    <button onClick={() => getProducts("price")}>Sort by Price</button>
                </div>

            </div>
            <div className={styles.productGrid}>
                {currentProducts.map((product) => (
                    <div key={product.catalogNumber} className={styles.productBox}>

                        {/* <img src={product.picture} alt={product.name} /> */}
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: {product.price} $</p>
                        <div className={styles.buttonsContainer}>
                            <Link to={`/product/${product.id}`} className={styles.button}>
                                View Product
                            </Link>
                            <button className={styles.button} onClick={() => addToShoppingCart(product.id)}>Add to
                                Cart
                            </button>
                        </div>
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
