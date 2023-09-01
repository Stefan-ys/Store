/* Pagination.js */

import React from "react";
import PropTypes from "prop-types";
import styles from "../css/pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const pagesToShow = 5;

        let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
        let endPage = Math.min(startPage + pagesToShow - 1, totalPages);


        if (endPage === totalPages) {
            startPage = Math.max(endPage - pagesToShow + 1, 1);
        }

        if (currentPage > 1) {
            pageNumbers.push(
                <li key="prev" onClick={() => onPageChange(currentPage - 1)}>
                    {"<"}
                </li>
            );
        }

        if (startPage > 1) {
            pageNumbers.push(
                <li key="first" onClick={() => onPageChange(1)}>
                    {"1"}
                </li>
            );

            if (startPage > 2) {
                pageNumbers.push(<li key="ellipsis-start">{"..."}</li>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={currentPage === i ? styles.active : ""}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </li>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<li key="ellipsis-end">{"..."}</li>);
            }

            pageNumbers.push(
                <li key="last" onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                </li>
            );
        }

        if (currentPage < totalPages) {
            pageNumbers.push(
                <li key="next" onClick={() => onPageChange(currentPage + 1)}>
                    {">"}
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <div className={styles.paginationContainer}>
            <ul className={styles.pagination}>
                {renderPageNumbers()}
            </ul>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
