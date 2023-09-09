import React from "react";
import styles from "../css/data-table.module.css";

const DataTable = ({ data, loading, message }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  if (!data || data.length === 0) {
  
    return <div>No data available.</div>;
  }
  const columnHeaders = Object.keys(data[0]);

  return (
    <div>
      <h2>Data Content</h2>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
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
