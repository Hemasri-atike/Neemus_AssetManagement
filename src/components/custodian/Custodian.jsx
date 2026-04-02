import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJson } from "../../utils/http";

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

const Custodian = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm("Are you sure you want to delete this custodian?");

  if (!confirmDelete) return;

  try {

    await fetchJson(`http://localhost:5000/custodians/${id}`, {
      method: "DELETE",
    });

    alert("Custodian deleted successfully ");

    fetchCustodians(); // refresh table

  } catch (error) {

    console.error(error);
    alert("Delete failed ❌");

  }

};

  const fetchCustodians = async () => {

    try {

      const list = await fetchJson("http://localhost:5000/custodians");

      const formatted = (Array.isArray(list) ? list : []).map((item) => ({
        id: item.id,
        custodianId: item.custodian_id,
        department: item.department,
        custodianName: item.custodian_name,
        designation: item.designation,
        authority: item.reporting_authority,
        email: item.email,
        username: item.username,
        status: "Active",
        createdDate: new Date(item.created_date).toLocaleDateString(),
      }));

      setRows(formatted);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    fetchCustodians();
  }, []);

  const columns = [
    { field: "custodianId", headerName: "Custodian ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "custodianName", headerName: "Custodian Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "authority", headerName: "Reporting Authority", flex: 1 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdDate", headerName: "Created Date", flex: 1 },

    {
  field: "actions",
  headerName: "Actions",
  width: 120,
  renderCell: (params) => (
    <>
      <IconButton
        color="primary"
        onClick={() =>
          navigate(`/custodian/edit/${params.row.id}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-100 p-4 sm:p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <Typography
          variant="h5"
          className="!font-bold bg-gradient-to-r from-slate-800 to-blue-900 bg-clip-text text-transparent"
        >
          Custodian Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/custodian/add")}
          className="!rounded-xl !shadow-md"
          sx={{
            background: "linear-gradient(135deg, #3a78b8 0%, #2a5a94 100%)",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Custodian
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

export default Custodian;
