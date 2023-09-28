import React, { useState } from "react";
import styles from "../css/data-table.module.css";

const DataTable = ({ data, loading, message }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Sort data based on selected column and order
  const sortedData = data.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortOrder === "asc") {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
    }

    return 0;
  });

  const columnHeaders = Object.keys(data[0]);

  return (
    <div>
      <h2>Data Content</h2>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>#</th>
            {columnHeaders.map((header) => (
              <th key={header} onClick={() => handleSort(header)}>
                {header}
                {sortColumn === header && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {columnHeaders.map((header) => (
                <td key={header}>
                  {typeof item[header] === "object"
                    ? JSON.stringify(item[header])
                    : item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
