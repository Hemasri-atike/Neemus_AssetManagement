import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewRoles = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  // ✅ FETCH ROLES (TEMP DUMMY DATA - since no backend yet)
  const fetchRoles = async () => {
    try {

      // 🔥 COMMENT THIS WHEN BACKEND READY
      const dummyData = [
        {
          id: 1,
          roleId: "R001",
          roleName: "Admin",
          roleDescription: "Full Access",
          pages: "Dashboard, Reports, Users",
          username: "admin",
          status: "Active",
          createdDate: "17/03/2026",
        },
        {
          id: 2,
          roleId: "R002",
          roleName: "Manager",
          roleDescription: "Limited Access",
          pages: "Dashboard, Reports",
          username: "manager",
          status: "Active",
          createdDate: "16/03/2026",
        }
      ];

      setRows(dummyData);

      // ✅ USE THIS WHEN BACKEND IS READY
      /*
      const res = await axios.get("http://localhost:5000/api/roles");

      const formatted = res.data.map((item) => ({
        id: item.id,
        roleId: item.id,
        roleName: item.role_name,
        roleDescription: item.role_description,
        pages: item.pages,
        username: item.username || "N/A",
        status: "Active",
        createdDate: new Date(item.created_date).toLocaleDateString(),
      }));

      setRows(formatted);
      */

    } catch (error) {
      console.error(error);
    }
  };

  // ✅ DELETE ROLE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this role?");
    if (!confirmDelete) return;

    try {

      // 🔥 TEMP (frontend only)
      const updated = rows.filter((row) => row.id !== id);
      setRows(updated);

      // ✅ USE THIS WHEN BACKEND READY
      /*
      await axios.delete(`http://localhost:5000/api/roles/${id}`);
      fetchRoles();
      */

      alert("Role deleted successfully");

    } catch (error) {
      console.error(error);
      alert("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // ✅ TABLE COLUMNS
  const columns = [
    { field: "roleId", headerName: "Role ID", flex: 1 },
    { field: "roleName", headerName: "Role Name", flex: 1 },
    { field: "roleDescription", headerName: "Role Description", flex: 1 },
    { field: "pages", headerName: "Pages", flex: 1 },
    { field: "username", headerName: "Created By", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdDate", headerName: "Created Date", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              navigate(`/roles/edit/${params.row.id}`, {
                state: params.row
              })
            }
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }
  ];

  return (
    <div className="p-4 bg-gray-100 h-screen overflow-y-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <Typography variant="h4" className="font-extrabold text-black">
          Role Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/roles/create")}
        >
          Add Role
        </Button>

      </div>

      {/* TABLE */}
      <Card>
        <CardContent>

          <div style={{ height: 500 }}>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableSelectionOnClick
            />

          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default ViewRoles;