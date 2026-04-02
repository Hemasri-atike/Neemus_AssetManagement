import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { tableHeadCellSx } from "../../theme/plasticBlueTable";
import "./ModernTable.css";

const DEFAULT_ROWS_PER_PAGE = 10;
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

const ModernTable = ({ columns, data, onSearch, title, renderCell }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const safeData = Array.isArray(data) ? data : [];

  const paginatedRows = useMemo(
    () =>
      safeData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [safeData, page, rowsPerPage]
  );

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      className="rounded-2xl border border-slate-200/90 shadow-[0_12px_40px_-18px_rgba(15,60,110,0.35)]"
      sx={{
        background: "linear-gradient(145deg, rgba(154,204,242,0.22) 0%, #ffffff 42%, #ffffff 100%)",
        p: { xs: 1.5, sm: 2, md: 2.5 },
      }}
    >
      {title && (
        <Typography
          variant="h6"
          className="!mb-4 !font-bold !tracking-tight bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 bg-clip-text text-transparent"
        >
          {title}
        </Typography>
      )}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(226, 232, 240, 0.95)",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: { xs: 360, sm: 480, md: 560 },
            overflowX: "auto",
          }}
        >
          <Table stickyHeader size="small" sx={{ minWidth: 640 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...tableHeadCellSx, width: 52 }}>#</TableCell>
                {columns.map((col) => (
                  <TableCell key={col.field} sx={tableHeadCellSx}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    background: "linear-gradient(180deg, #e8f2fc 0%, #f1f6fb 100%)",
                    borderBottom: "1px solid #e2e8f0",
                    py: 1,
                  }}
                />
                {columns.map((col) => (
                  <TableCell
                    key={`search-${col.field}`}
                    sx={{
                      background: "linear-gradient(180deg, #e8f2fc 0%, #f1f6fb 100%)",
                      borderBottom: "1px solid #e2e8f0",
                      py: 1,
                      px: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      placeholder={`Filter ${col.label}`}
                      onChange={(e) => onSearch?.(col.field, e.target.value)}
                      variant="outlined"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                          bgcolor: "#fff",
                          fontSize: "0.8125rem",
                        },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <TableRow
                    key={row.id ?? page * rowsPerPage + index}
                    hover
                    sx={{
                      "&:nth-of-type(even)": { bgcolor: "rgba(248, 250, 252, 0.7)" },
                    }}
                  >
                    <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.field} sx={{ color: "text.secondary" }}>
                        {renderCell ? renderCell(col.field, row) : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">No results found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={safeData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          sx={{
            borderTop: "1px solid rgba(58, 120, 184, 0.2)",
            background: "linear-gradient(90deg, #e8f4ff 0%, #ffffff 50%, #eef6ff 100%)",
            "& .MuiTablePagination-toolbar": { flexWrap: "wrap", gap: 1 },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ModernTable;
