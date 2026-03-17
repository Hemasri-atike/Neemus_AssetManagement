import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const Assets = () => {
  const [search, setSearch] = useState("");

  // 🔥 Dummy Data (more columns for horizontal scroll)
  const data = [
    {
      id: 1,
      assetId: "AST-001",
      name: "Laptop",
      category: "Electronics",
      status: "Active",
      location: "Hyderabad",
      department: "IT",
      cost: "₹60,000",
      vendor: "Dell",
    },
    {
      id: 2,
      assetId: "AST-002",
      name: "Printer",
      category: "Office",
      status: "Inactive",
      location: "Chennai",
      department: "Admin",
      cost: "₹15,000",
      vendor: "HP",
    },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      
      {/* 🔥 Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-5">
        
        <h2 className="text-xl font-semibold text-slate-800">
          Asset Management
        </h2>

        <div className="flex gap-3 w-full md:w-auto">
          
          {/* 🔍 Search */}
          <TextField
            size="small"
            placeholder="Search..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ➕ Add Button */}
          <Button
            variant="contained"
            startIcon={<Add />}
            className="!bg-blue-600 hover:!bg-blue-700 !whitespace-nowrap"
          >
            Add Asset
          </Button>

        </div>
      </div>

      {/* 🔥 Table */}
      <Paper className="rounded-2xl shadow-md">
        
        <TableContainer
          className="
            max-h-[500px]
            overflow-y-auto
            overflow-x-auto
          "
        >
          <Table stickyHeader className="min-w-[900px]">
            
            {/* Header */}
            <TableHead>
              <TableRow>
                {[
                  "Asset ID",
                  "Name",
                  "Category",
                  "Department",
                  "Vendor",
                  "Cost",
                  "Status",
                  "Location",
                  "Actions",
                ].map((col) => (
                  <TableCell
                    key={col}
                    className="!bg-slate-100 !font-semibold !text-slate-700 whitespace-nowrap"
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* Body */}
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  className="hover:bg-slate-50 transition"
                >
                  <TableCell>{row.assetId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.vendor}</TableCell>
                  <TableCell>{row.cost}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        row.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>

                  <TableCell>{row.location}</TableCell>

                  {/* Actions */}
                  <TableCell>
                    <div className="flex gap-2">
                      <IconButton
                        size="small"
                        className="!bg-blue-50 hover:!bg-blue-100"
                      >
                        <Edit className="!text-blue-600" fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        className="!bg-red-50 hover:!bg-red-100"
                      >
                        <Delete className="!text-red-600" fontSize="small" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Assets;