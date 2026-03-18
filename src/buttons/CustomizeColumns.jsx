import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const CustomizeColumns = ({ allColumns, visibleColumns, setVisibleColumns }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleToggle = (column) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  return (
    <>
      {/* Button */}
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Customize Columns
      </Button>

      {/* Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {allColumns.map((col) => (
          <MenuItem key={col} onClick={() => handleToggle(col)}>
            <Checkbox checked={visibleColumns.includes(col)} />
            <ListItemText primary={col} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomizeColumns;