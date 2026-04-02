/**
 * DevExpress ASPxGridView `dxgvControl_PlasticBlue`–inspired header surface.
 * Vertical blue gradient used for MUI DataGrid, MUI Table, and global CSS tables.
 */
export const PLASTIC_BLUE_HEADER_GRADIENT =
  "linear-gradient(180deg, #9cccf2 0%, #5a9fd4 38%, #3a78b8 72%, #2a5a94 100%)";

export const tableHeadCellSx = {
  background: PLASTIC_BLUE_HEADER_GRADIENT,
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.75rem",
  letterSpacing: "0.055em",
  textTransform: "uppercase",
  borderBottom: "2px solid rgba(255,255,255,0.35)",
  py: 1.75,
  px: 2,
  whiteSpace: "nowrap",
};

/** MUI X DataGrid — Plastic Blue header + modern footer */
export const dataGridPlasticBlueSx = {
  border: "none",
  borderRadius: 2,
  overflow: "hidden",
  boxShadow: "0 12px 40px -16px rgba(15, 60, 110, 0.45)",
  "& .MuiDataGrid-columnHeaders": {
    background: PLASTIC_BLUE_HEADER_GRADIENT,
    color: "#fff",
    borderBottom: "2px solid rgba(255,255,255,0.35)",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700,
    fontSize: "0.78rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  "& .MuiDataGrid-columnHeader": {
    outline: "none",
  },
  "& .MuiDataGrid-iconSeparator": {
    color: "rgba(255,255,255,0.45)",
  },
  "& .MuiDataGrid-sortIcon": {
    color: "rgba(255,255,255,0.95)",
  },
  "& .MuiDataGrid-menuIconButton": {
    color: "rgba(255,255,255,0.9)",
  },
  "& .MuiDataGrid-footerContainer": {
    background: "linear-gradient(90deg, #e8f4ff 0%, #ffffff 50%, #eef6ff 100%)",
    borderTop: "1px solid rgba(58, 120, 184, 0.28)",
  },
  "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    color: "#475569",
    fontWeight: 500,
  },
  "& .MuiDataGrid-cell": {
    borderColor: "rgba(226, 232, 240, 0.95)",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "rgba(154, 204, 242, 0.14)",
  },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
};
