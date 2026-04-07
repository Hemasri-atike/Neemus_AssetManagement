import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { Add } from "@mui/icons-material";

// ✅ Correct data according to labels
const rawData = [
  {
    userId: "USR001",
    userName: "Devajit Jaradhara",
    email: "devajit.jaradhara@example.com",
  },
  {
    userId: "USR002",
    userName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
  },
  {
    userId: "USR003",
    userName: "Anita Verma",
    email: "anita.verma@example.com",
  },
];

const AddnonNrluser = () => {
  const [search, setSearch] = useState({});

  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = rawData.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ Labels perfectly match fields
  const columns = [
    { field: "userId", label: "User id" },
    { field: "userName", label: "User Name" },
    { field: "email", label: "Email" },
    { field: "actions", label: "Actions" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Actions column
    if (field === "actions") {
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-view">Delete</button>
          <button className="btn-edit">Edit</button>
        </div>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Non-NRL Users List"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AddnonNrluser;