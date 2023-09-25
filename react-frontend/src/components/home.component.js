import React, { useState } from "react";
import { withRouter } from "../common/with-router";
import { Carousel } from "bootstrap";
import styles from "../css/home.module.css";


const Home = () => {
    // const [newProducts, setNewProducts] = React.useState([]);
    // const [promotions, setPromotions] = React.useState([]);

    // return (
    //     <div className={styles.container}>
    //         <div className={styles["carousel-section"]}>
    //             <h2>New Products</h2>
    //             <Carousel items={newProducts} itemsPerSlide={4} />
    //         </div>
    //         <div className={styles["carousel-section"]}>
    //             <h2>Promotions</h2>
    //             <Carousel items={promotions} itemsPerSlide={4} />
    //         </div>
    //     </div>
    // );
};


export default withRouter(Home);