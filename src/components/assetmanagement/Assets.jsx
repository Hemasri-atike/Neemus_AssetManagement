import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import CustomizeColumns from "../../buttons/CustomizeColumns";
import theme from "../../theme";
import { PLASTIC_BLUE_HEADER_GRADIENT } from "../../theme/plasticBlueTable";
import { FaEdit, FaTrash, FaPlus, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { allColumns } from "../../constants/Columns";
const columnLabels = {
  assetId: "Asset ID",
  assetNumber: "Asset Number",
  subAssetNumber: "Sub Asset Number",
  assetClass: "Asset Class",
  intenderName: "Intender Name",
  assetDescription: "Description",
  custodianName: "Custodian",
  serialNumber: "Serial No",
  macId: "MAC ID",
  locationId: "Location",
  block: "Block",
  model: "Model",
  grNumber: "GR Number",
  yearOfPurchase: "Year",
  capitalizationDate: "Capitalization",
  expiryDate: "Expiry",
  costCenter: "Cost Center",
  materialNumber: "Material No",
  acceptDate: "Accept Date",
  poNumber: "PO Number",
  wbsNumber: "WBS",
  installationDate: "Installation",
  assetVendor: "Vendor",
  department: "Department",
  remarks: "Remarks",
};

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
  "remarks",
];

const Assets = () => {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);
  const [sorting, setSorting] = useState([]);

const fetchAssets = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/assets");
    const data = await res.json();

    console.log("API DATA:", data);

    if (Array.isArray(data)) {
      setAssets(data);
    } else {
      setAssets([]);
    }
  } catch (err) {
    console.error(err);
    setAssets([]);
  }
};

  useEffect(() => {
    fetchAssets();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete asset?")) return;

    await fetch(`http://localhost:5000/api/assets/${id}`, {
      method: "DELETE",
    });

    fetchAssets();
  };

const filteredData = useMemo(() => {
  return assets.filter((item) =>
    [
      item.assetId,
      item.assetNumber,
      item.assetClass,
      item.department,
      item.assetVendor,
    ]
      .map((val) => String(val || "")) // ✅ FIX
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}, [assets, search]);

  // ✅ COLUMN DEFINITIONS
const columns = useMemo(() => {
  // ✅ only show selected columns
  const dynamicCols = allColumns
    .filter((col) => visibleColumns.includes(col))   // ⭐ IMPORTANT
    .map((col) => ({
      accessorKey: col,
      header: columnLabels[col] || col,
      cell: ({ getValue }) => getValue() || "-",
    }));

  // ✅ always keep Actions column at RIGHT
  dynamicCols.push({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => navigate(`/assets/edit/${row.original.id}`)}
          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm"
          title="Edit Asset"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => handleDelete(row.original.id)}
          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
          title="Delete Asset"
        >
          <FaTrash />
        </button>
      </div>
    ),
  });

  return dynamicCols;
}, [visibleColumns]); // ⭐ dependency

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div
      className="p-6"
      style={{
        fontFamily: theme.font.family,
        background: theme.colors.background,
      }}
    >
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: theme.colors.text }}
          >
            Asset Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">Manage and track your organization's assets in real-time.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2.5 w-64 border-0 bg-white shadow-sm ring-1 ring-inset ring-gray-300 rounded-xl focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all duration-200 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>

          <div className="p-0.5 bg-gray-100 rounded-xl shadow-inner inline-flex">
            <CustomizeColumns
              allColumns={allColumns}
              visibleColumns={visibleColumns}
              setVisibleColumns={setVisibleColumns}
            />
          </div>

          <button
            onClick={() => navigate("/assets/add-asset")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform active:scale-95 transition-all duration-200"
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #333 100%)` 
            }}
          >
            <FaPlus />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <table className="min-w-[2200px] w-full border-separate border-spacing-0 text-sm">
            {/* HEADER */}
            <thead className="sticky top-0 z-40 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isLast = header.column.id === "actions";

                    return (
                      <th
                        key={header.id}
                        className="border-b border-white/20 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-white sm:px-6 sm:py-4"
                        style={{
                          position: isLast ? "sticky" : "relative",
                          right: isLast ? 0 : undefined,
                          zIndex: isLast ? 50 : 10,
                          background: isLast
                            ? "linear-gradient(180deg, #3d6b96 0%, #2a5a94 100%)"
                            : PLASTIC_BLUE_HEADER_GRADIENT,
                          backdropFilter: isLast ? "blur(12px)" : "none",
                          borderLeft: isLast ? "1px solid rgba(255,255,255,0.2)" : "none",
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-blue-50/40 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => {
                    const isLast = cell.column.id === "actions";

                    return (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium"
                        style={{
                          position: isLast ? "sticky" : "relative",
                          right: isLast ? 0 : undefined,
                          zIndex: isLast ? 20 : 5,
                          // Glassmorphism effect for the actions column
                          backgroundColor: isLast ? "rgba(255, 255, 255, 0.7)" : "transparent",
                          backdropFilter: isLast ? "blur(12px)" : "none",
                          borderLeft: isLast ? "1px solid rgba(229, 231, 235, 0.5)" : "none",
                          boxShadow: isLast ? "-4px 0 15px -10px rgba(0, 0, 0, 0.1)" : "none",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

    </table>
  </div>
</div>
    </div>
  );
};

export default Assets;