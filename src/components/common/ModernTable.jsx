import React from "react";
import "./ModernTable.css";

const ModernTable = ({ columns, data, onSearch, title, renderCell }) => {
  return (
    <div className="modern-table-container">
      {title && <h2 className="modern-table-title">{title}</h2>}
      
      <div className="modern-table-wrapper">
        <table className="modern-table">
          <thead>
            {/* Column Headers */}
            <tr>
              <th style={{ width: "50px" }}>#</th>
              {columns.map((col) => (
                <th key={col.field}>{col.label}</th>
              ))}
            </tr>

            {/* Search Row (First Row in Header) */}
            <tr className="modern-search-row">
              <td style={{ width: "50px" }}></td>
              {columns.map((col) => (
                <td key={col.field}>
                  <input
                    type="text"
                    className="modern-search-input"
                    placeholder={`Search ${col.label}...`}
                    onChange={(e) => onSearch(col.field, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={row.id || index}>
                  <td>{index + 1}</td>
                  {columns.map((col) => (
                    <td key={col.field}>
                      {renderCell ? renderCell(col.field, row) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: "center", padding: "2rem" }}>
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="modern-table-footer">
        Showing {data.length} records
      </div>
    </div>
  );
};

export default ModernTable;
