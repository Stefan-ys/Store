import React from "react";
import styles from "../css/data-table.module.css";

const DataTable = ({ data, loading, message }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  return (
    <div>
      <h2>Data Content</h2>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, valueIndex) => (
                <td key={valueIndex}>
                  {typeof value === "object" ? JSON.stringify(value) : value}
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
