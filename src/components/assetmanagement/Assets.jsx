import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import CustomizeColumns from "../../buttons/Customizecolumns";

const Assets = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ✅ Load from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("assets")) || [];
    setData(storedData);
  }, []);

  // ✅ Delete Function
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("assets", JSON.stringify(updatedData));
  };

  // ✅ Search
  const filteredData = data.filter((item) =>
    (item.assetId || "").toLowerCase().includes(search.toLowerCase())

  );
  const defaultColumns = [
  "assetId",
  "assetNumber",
  "assetClass",
  "assetDescription",
  "custodianName",
  "locationId",
  "department",
   "materialNumber",
  "poNumber",
  "wbsNumber",
  "assetVendor",
  "department",
  "remarks",
];


  // ✅ Columns
  const columns = [
    "Asset ID",
    "Asset Number",
    "Sub Asset Number",
    "Asset Class",
    "Intender Name",
    "Asset Description",
    "Custodian Name",
    "Serial Number",
    "Mac ID",
    "Location ID",
    "Block",
    "Model",
    "GR Number",
    "Year of Purchase",
    "Capitalization Date",
    "Expiry Date",
    "Cost Center",
    "Material Number",
    "Accept Date",
    "PO Number",
    "WBS Number",
    "Installation Date",
    "Vendor",
    "Department",
    "Remarks",
    "Actions",
  ];
    const [visibleColumns, setVisibleColumns] = useState(columns);

  return (
    <div className="p-4 md:p-6">
      
      {/* 🔥 Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-5">
        <h2 className="text-xl font-semibold text-slate-800">
          Asset Management
        </h2>

      <div className="flex gap-3 w-full md:w-auto">
  
  <TextField
    size="small"
    placeholder="Search by Asset ID..."
    fullWidth
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* ✅ Customize Columns */}
  <CustomizeColumns
    allColumns={columns}
    visibleColumns={visibleColumns}
    setVisibleColumns={setVisibleColumns}
  />

  <Button
    variant="contained"
    startIcon={<Add />}
    onClick={() => navigate("/assets/add-asset")}
    className="!bg-blue-600 hover:!bg-blue-700 !whitespace-nowrap"
  >
    Add Asset
  </Button>
</div>
      </div>

      {/* 🔥 Table */}
      <Paper className="rounded-2xl shadow-md overflow-hidden">

        <TableContainer
          className="max-h-[500px] overflow-auto"
        >
          <Table stickyHeader className="min-w-[1800px] text-sm">

            {/* 🔥 HEADER */}
            <TableHead>
              <TableRow>
              {visibleColumns.map((col) => (
                  <TableCell
                    key={col}
                    className={`
                      !bg-slate-100 !font-semibold !text-slate-700 whitespace-nowrap
                      
                      ${col === "Asset ID" ? "sticky left-0 z-20 bg-slate-100" : ""}
                      ${col === "Actions" ? "sticky right-0 z-30 bg-slate-100" : ""}
                    `}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* 🔥 BODY */}
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    className="hover:bg-slate-50 transition"
                  >

                    {visibleColumns.map((col) => {
                      switch (col) {
                        case "Asset ID":
                          return (
                            <TableCell key={col} className="sticky left-0 bg-white z-10">
                              {row.assetId}
                            </TableCell>
                          );
                        case "Asset Number": return <TableCell key={col}>{row.assetNumber}</TableCell>;
                        case "Sub Asset Number": return <TableCell key={col}>{row.subAssetNumber}</TableCell>;
                        case "Asset Class": return <TableCell key={col}>{row.assetClass}</TableCell>;
                        case "Intender Name": return <TableCell key={col}>{row.intenderName}</TableCell>;
                        case "Asset Description": return <TableCell key={col}>{row.assetDescription}</TableCell>;
                        case "Custodian Name": return <TableCell key={col}>{row.custodianName}</TableCell>;
                        case "Serial Number": return <TableCell key={col}>{row.serialNumber}</TableCell>;
                        case "Mac ID": return <TableCell key={col}>{row.macId}</TableCell>;
                        case "Location ID": return <TableCell key={col}>{row.locationId}</TableCell>;
                        case "Block": return <TableCell key={col}>{row.block}</TableCell>;
                        case "Model": return <TableCell key={col}>{row.model}</TableCell>;
                        case "GR Number": return <TableCell key={col}>{row.grNumber}</TableCell>;
                        case "Year of Purchase": return <TableCell key={col}>{row.yearOfPurchase}</TableCell>;
                        case "Capitalization Date": return <TableCell key={col}>{row.capitalizationDate}</TableCell>;
                        case "Expiry Date": return <TableCell key={col}>{row.expiryDate}</TableCell>;
                        case "Cost Center": return <TableCell key={col}>{row.costCenter}</TableCell>;
                        case "Material Number": return <TableCell key={col}>{row.materialNumber}</TableCell>;
                        case "Accept Date": return <TableCell key={col}>{row.acceptDate}</TableCell>;
                        case "PO Number": return <TableCell key={col}>{row.poNumber}</TableCell>;
                        case "WBS Number": return <TableCell key={col}>{row.wbsNumber}</TableCell>;
                        case "Installation Date": return <TableCell key={col}>{row.installationDate}</TableCell>;
                        case "Vendor": return <TableCell key={col}>{row.assetVendor}</TableCell>;
                        case "Department": return <TableCell key={col}>{row.department}</TableCell>;
                        case "Remarks": return <TableCell key={col}>{row.remarks}</TableCell>;
                        case "Actions":
                          return (
                            <TableCell
                              key={col}
                              className="
                                sticky right-0 bg-white z-20
                                shadow-[-6px_0_8px_-2px_rgba(0,0,0,0.15)]
                              "
                            >
                              <div className="flex gap-2">
                                <IconButton
                                  size="small"
                                  className="!bg-blue-50 hover:!bg-blue-100"
                                >
                                  <Edit className="!text-blue-600" fontSize="small" />
                                </IconButton>

                                <IconButton
                                  size="small"
                                  onClick={() => handleDelete(row.id)}
                                  className="!bg-red-50 hover:!bg-red-100"
                                >
                                  <Delete className="!text-red-600" fontSize="small" />
                                </IconButton>
                              </div>
                            </TableCell>
                          );
                        default:
                          return null;
                      }
                    })}

                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length} align="center">
                    No Assets Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Assets;