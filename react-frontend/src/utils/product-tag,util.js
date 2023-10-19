import React from "react";
import styles from "../css/productTag.module.css";
import PropTypes from "prop-types";


const ProductTag = ({tags}) => {
    const getTagColor = (tagType) => {
        switch (tagType) {
            case "NEW":
                return styles.new;
            case "PROMOTION":
                return styles.promotion;
            case "COMING_SOON":
                return styles.comingSoon;
            case "OUT_OF_STOCK":
                return styles.outOfStock;
            case "LIMITED_STOCK":
                return styles.limitedStock;
            case "SALE":
                return styles.sale;
            default:
                return styles.default;
        }
    };

    return (
        <div className={styles.tagContainer}>
            {tags.map((tag, index) => (
                <div key={index} className={`${styles.tag} ${getTagColor(tag)}`}>
                    {tag.replace(/_/g, " ")}
                </div>
            ))}
        </div>
    );
};

ProductTag.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.oneOf([
            "COMING_SOON",
            "NEW",
            "PROMOTION",
            "SALE",
            "LIMITED_STOCK",
            "OUT_OF_STOCK",
        ])
    ).isRequired,
};

export default ProductTag;
