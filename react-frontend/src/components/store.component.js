import React, { useState, useEffect } from "react";
import styles from "../css/store.module.css";
import { withRouter } from "../common/with-router";
import Pagination from "../utils/pagination.util";
import StoreService from "../services/store.service";
import Carousel from "../utils/image-carousel.util";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../hooks/shopping-cart.hook";
import { showRating } from "../utils/rating.util";
import ProductTag from "../utils/product-tag,util";
import Menu from "../utils/menu.util";


const Store = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState();
    const [categoryOption, setCategoryOption] = useState("All");
    const [sortOrder, setSortOrder] = useState(["date", "asc"]);

    const { addToShoppingCart } = useShoppingCart();


    useEffect(() => {
        getProducts();
    }, [currentPage, productsPerPage, categoryOption, sortOrder[0], sortOrder[1]]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        getProducts();
    };

    const getProducts = async () => {
        setLoading(true);
        setMessage("");
        try {
            const data = await StoreService.getAllProducts(currentPage, productsPerPage, categoryOption, sortOrder[0], sortOrder[1]);
            setProducts(data.products);
            setTotalPages(data.totalPages);

        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");

        } finally {
            setLoading(false);
        }
    };

    const addToCart = (productId) => {
        addToShoppingCart(productId);
    };



    const menuItems = (
        [
            {
                name: "Categories",
                items: [
                    { label: "All", action: () => setCategoryOption("All") },
                    { label: "Circles", action: () => setCategoryOption("Circles") },
                    { label: "Triangles", action: () => setCategoryOption("Triangles") },
                    { label: "Squares", action: () => setCategoryOption("Squares") },
                    { label: "Rectangles", action: () => setCategoryOption("Rectangles") },
                ],
            },
            {
                name: "Sort Products By",
                items: [
                    {
                        label: "date added",
                        items: [
                            { label: "newest", action: () => setSortOrder(["date", "asc"]) },
                            { label: "oldest", action: () => setSortOrder(["date", "desc"]) },
                        ],
                    },
                    {
                        label: "price",
                        items: [
                            { label: "highest", action: () => setSortOrder(["price", "desc"]) },
                            { label: "lowest", action: () => setSortOrder(["price", "asc"]) },
                        ],
                    },
                    {
                        label: "name",
                        items: [
                            { label: "ascending", action: () => setSortOrder(["name", "asc"]) },
                            { label: "descending", action: () => setSortOrder(["name", "desc"]) },
                        ],
                    },
                ]
            },
            {
                name: "Per Page",
                items: [
                    { label: "12", action: () => setProductsPerPage(12) },
                    { label: "24", action: () => setProductsPerPage(24) },
                    { label: "48", action: () => setProductsPerPage(48) },
                    { label: "Show All", action: () => setProductsPerPage(1000) },
                ],
            },
        ]
    );

    const renderProducts = () => {
        return products.map((product) => (
            <div key={product.catalogNumber} className={styles.productBox}>
                <ProductTag tags={product.status || []} />
                <Carousel images={product.images} />
                <h3>{product.name}</h3>
                <p>Price: {product.price} $</p>
                <p>Category: {product.productCategory}</p>
                <p>Manufacturer: {product.manufacturer}</p>
                <p>{showRating(product.rating)}</p>
                <div>
                    <Link to={`/product/${product.id}`} state={product} style={{ textDecoration: 'none' }}>
                        <button className={styles.button}>
                            View Product
                        </button>
                    </Link>
                    <button className={styles.button} onClick={() => addToCart(product.id)}>Add to Cart</button>
                </div>
            </div>
        ));
    };


    return (
        <>
            <Menu menuItems={menuItems} />
            < div className={styles.productGrid} >
                {loading ? <> <p>Loading... </p> <span className={styles.spinner}></span> </> :
                    products.length > 0 ? renderProducts() : <p>No products found from this selection.</p>}
            </div >
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>

    );
};

export default withRouter(Store);
