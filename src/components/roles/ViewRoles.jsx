import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { dataGridPlasticBlueSx } from "../../theme/plasticBlueTable";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewRoles = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

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

      // ✅ USE THIS WHEN BACKEND IS READY (add: import { fetchJson } from "../../utils/http")
      /*
      const list = await fetchJson("http://localhost:5000/api/roles");
      const formatted = (Array.isArray(list) ? list : []).map((item) => ({
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

      // ✅ USE THIS WHEN BACKEND READY (+ fetchJson import)
      /*
      await fetchJson(`http://localhost:5000/api/roles/${id}`, { method: "DELETE" });
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
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-100 p-4 sm:p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <Typography
          variant="h4"
          className="!font-extrabold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent"
        >
          Role Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/roles/create")}
          className="!rounded-xl !shadow-md"
          sx={{
            background: "linear-gradient(135deg, #3a78b8 0%, #2a5a94 100%)",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Role
        </Button>

      </div>

      <Card
        className="!rounded-2xl !border-slate-200/90 !shadow-[0_12px_40px_-18px_rgba(15,60,110,0.35)] overflow-hidden"
        sx={{
          background:
            "linear-gradient(145deg, rgba(154,204,242,0.12) 0%, #ffffff 38%)",
        }}
      >
        <CardContent className="!p-3 sm:!p-4">

          <div className="min-h-[420px] w-full sm:min-h-[520px]">
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
              sx={{
                ...dataGridPlasticBlueSx,
                minHeight: 400,
                width: "100%",
              }}
            />
          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default ViewRoles;