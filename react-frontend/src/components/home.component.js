import React, { useState, useEffect } from "react";
import { withRouter } from "../common/with-router";
import styles from "../css/home.module.css";
import HomeService from "../services/home.service";
import Slider from "../utils/slider-util";

const Home = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        setMessage("");
        try {
            const data = await HomeService.getProducts();
            console.log(data);
            setProducts(data);


        } catch (error) {
            console.log("Error fetching products data: ", error);
            setMessage(error.response ? error.response.data.message : "An error has occurred.");

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles["carousel-section"]}>
                <h2>New Products</h2>
                <Slider items={products.NEW} itemsPerSlide={4} />
            </div>
            <div className={styles["carousel-section"]}>
                <h2>Promotions</h2>
                <Slider items={products.PROMOTION} itemsPerSlide={4} />
            </div>
            <div className={styles["carousel-section"]}>
                <h2>Coming Soon</h2>
                <Slider items={products.COMING_SOON} itemsPerSlide={4} />
            </div>
        </div>
    );
};


export default withRouter(Home);