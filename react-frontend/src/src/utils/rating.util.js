import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const maxRating = 5;



const rateProduct = (rating, setRating) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            stars.push(
                <FaStar
                    key={i}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => setRating(i)}
                />
            );
        } else {
            stars.push(
                <FaRegStar
                    key={i}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => setRating(i)}
                />
            );
        }
    }


    return stars;
};

const showRating = (rating, usersCount) => {
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
    if (usersCount !== undefined) {
        stars.push("  " + rating);
        stars.push(" (" + usersCount + ")");
    }
    return stars;
};


export { showRating, rateProduct };
