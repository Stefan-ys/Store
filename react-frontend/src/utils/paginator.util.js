import React from "react";
import PropTypes from "prop-types";
import styles from "../css/paginator.module.css";

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? styles.active : ""}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
