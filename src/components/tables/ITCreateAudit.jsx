import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const ITCreateAudit = () => {
  const [search, setSearch] = useState({});

  // ✅ Dummy data (same as screenshot)
  const rows = [
    {
      auditName: "CISF Audit",
      auditDesc: "CISF NRL Audit",
      auditBy: "100495",
      location: "CISF",
      createdDate: "21-Sep-2020",
      status: "Active",
    },
    {
      auditName: "Site Office Audit",
      auditDesc: "",
      auditBy: "100495",
      location: "SITE OFFICE",
      createdDate: "21-Sep-2020",
      status: "Active",
    },
    {
      auditName: "EIL Audit",
      auditDesc: "EIL Office and Store",
      auditBy: "100495",
      location: "PROJECT DEPARTMENT",
      createdDate: "18-Sep-2020",
      status: "Active",
    },
    {
      auditName: "Admin audit",
      auditDesc: "physical verification of IT assets",
      auditBy: "100495",
      location: "ADMINISTRATIVE BUILDING - SITE",
      createdDate: "14-Aug-2020",
      status: "InActive",
    },
    {
      auditName: "August'20",
      auditDesc: "physical verification for month of August'20",
      auditBy: "100495",
      location: "IT DEPARTMENT",
      createdDate: "04-Aug-2020",
      status: "InActive",
    },
  ];

  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  const filteredRows = rows.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ Columns EXACT like your screenshot
  const columns = [
    { field: "auditName", label: "Audit Name" },
    { field: "auditDesc", label: "Audit Description" },
    { field: "auditBy", label: "Audit By" },
    { field: "location", label: "Location" },
    { field: "createdDate", label: "Created Date" },
    { field: "status", label: "Audit Status" },
  ];

  return (
    <ModernTable
      title="Audits"
      columns={columns}
      data={filteredRows}
      onSearch={handleSearch}
    />
  );
};

export default ITCreateAudit;