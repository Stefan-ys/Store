import React, {useState, useEffect} from "react";
import styles from "../css/home.module.css";
import {withRouter} from "../common/with-router";
import Slider from "../utils/slider-util";
import HomeService from "../services/home.service";
import {Link} from "react-router-dom";

const Home = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({
        NEW: [],
        PROMOTION: [],
        COMING_SOON: []
    });

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        setMessage("");
        try {
            const fetchedProducts = await HomeService.getProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(
                error.response ? error.response.data.message : "An error has occurred."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {!loading && (
                <>
                    <div className={styles.carouselSection}>
                        <h2>New Products</h2>
                        <Slider products={products.NEW} itemsPerSlide={4}/>
                        <Link to="/all-new-products" style={{textDecoration: "none"}}>
                            <button className={styles.button}>Show All</button>
                        </Link>
                    </div>
                    <div className={styles.carouselSection}>
                        <h2>Promotions</h2>
                        <Slider products={products.PROMOTION} itemsPerSlide={4}/>
                        <Link to="/all-promotions" style={{textDecoration: "none"}}>
                            <button className={styles.button}>Show All</button>
                        </Link>
                    </div>
                    <div className={styles.carouselSection}>
                        <h2>Coming Soon</h2>
                        <Slider products={products.COMING_SOON} itemsPerSlide={4}/>
                        <Link to="/all-coming-soon" style={{textDecoration: "none"}}>
                            <button className={styles.button}>Show All</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default withRouter(Home);
