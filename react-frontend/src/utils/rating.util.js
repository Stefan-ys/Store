import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const maxRating = 5;



const rateProduct = (rating, setRating) => {
    const stars = [];


    for (let i = 1; i <= maxRating; i++) {
        if (i > rating) {
            stars.push(
                <FaRegStar
                    key={i}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => setRating(i)}
                // onMouseEnter={() => setStars(i)}
                // onMouseLeave={() => setRating(0)}
                />
            );
        } else {
            stars.push(
                <FaStar
                    key={i}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => setRating(i)}
                // onMouseEnter={() => setStars(i)}
                // onMouseLeave={() => setRating(0)}
                />
            );
        }
    }


    return stars;

};

const showRating = (rating) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            stars.push(
                <FaStar
                    key={i}
                    style={{ color: "black" }}
                />
            );
        } else if (i - 0.5 <= rating) {
            stars.push(
                <FaStarHalfAlt
                    key={i}
                    style={{ color: "black" }}
                    FaStar s
                />
            );
        } else {
            stars.push(
                <FaRegStar
                    key={i}
                    style={{ color: "black" }}
                />
            );
        }
    }

    return stars;
};


export { showRating, rateProduct };
