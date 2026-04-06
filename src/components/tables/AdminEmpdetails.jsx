import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { Add } from "@mui/icons-material";

// ✅ Existing data (unchanged)
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

const AdminEmpdetails = () => {
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

  // ❌ DO NOT CHANGE LABELS
  const columns = [
    { field: "userId", label: "Employee ID" },
    { field: "userName", label: "Custodian Name" },
    { field: "email", label: "Designation" },
    { field: "actions", label: "Reporting Authority" },
    { field: "actions2", label: "Email" },
  ];

  const renderCustomCell = (field, row) => {
    // ✅ Designation (fake mapping from email)
    if (field === "email") {
      return "Software Engineer";
    }

    // ✅ Reporting Authority
    if (field === "actions") {
      return "Manager";
    }

    // ✅ Email column (actual email)
    if (field === "actions2") {
      return row.email;
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Employee Details"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AdminEmpdetails;