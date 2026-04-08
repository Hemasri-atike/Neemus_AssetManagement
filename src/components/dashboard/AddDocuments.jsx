import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { tableHeadCellSx, PLASTIC_BLUE_HEADER_GRADIENT } from "../../theme/plasticBlueTable";

const AddDocuments = () => {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [assetImage, setAssetImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [documentsList, setDocumentsList] = useState([]);

  // Mock data
  const assets = ["Laptop - LPT001", "Monitors - MON005", "Printer - PRT010"];
  const docTypes = ["Invoice", "Warranty", "Service Report", "Other"];

  const handleAddDocument = () => {
    if (!selectedAsset || !documentType || !documentFile) {
      alert("Please fill in all mandatory fields");
      return;
    }

    const newDoc = {
      id: Date.now(),
      asset: selectedAsset,
      documentName: documentType,
      imageLocation: assetImage ? assetImage.name : "N/A",
      file: documentFile,
    };

    setDocumentsList((prev) => [...prev, newDoc]);
    setDocumentType("");
    setDocumentFile(null);
  };

  const handleDelete = (id) => {
    setDocumentsList((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleSave = () => {
    console.log("Saving Documents:", documentsList);
    alert("Data saved successfully!");
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f1f6fb", minHeight: "100vh" }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: "1px solid #e2e8f0", background: "rgba(255,255,255,0.9)" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#1e293b" }}>
          Add Asset Documents
        </Typography>

        {/* Asset Details Section */}
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, color: "#2a5a94" }}>
          Asset Details:
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
              Select Asset <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormControl fullWidth size="small">
                <Select
                  value={selectedAsset}
                  displayEmpty
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  renderValue={(selected) => {
                    if (!selected) {
                      return <Typography variant="body2" color="text.secondary">Select Asset</Typography>;
                    }
                    return selected;
                  }}
                  sx={{ borderRadius: 1.5 }}
                >
                  {assets.map((asset) => (
                    <MenuItem key={asset} value={asset}>
                      {asset}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton sx={{ background: PLASTIC_BLUE_HEADER_GRADIENT, color: "white", "&:hover": { opacity: 0.9 }, borderRadius: 1.5, width: 40, height: 40 }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Add Image Section */}
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, color: "#2a5a94" }}>
          Add Image:
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
              Upload Image
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              width: 150, 
              height: 150, 
              border: "1px solid #cbd5e1", 
              bgcolor: "#f8fafc", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              mb: 1.5,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
            }}>
              {assetImage ? (
                <img
                  src={URL.createObjectURL(assetImage)}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Typography variant="caption" color="text.secondary">Image Preview</Typography>
              )}
            </Box>
            <Button variant="outlined" component="label" size="small" sx={{ textTransform: "none", borderRadius: 1.5, borderColor: "#cbd5e1", color: "#475569" }}>
              Choose File
              <input type="file" hidden onChange={(e) => setAssetImage(e.target.files[0])} />
            </Button>
            <Typography variant="caption" sx={{ ml: 1.5, color: "#94a3b8" }}>
              {assetImage ? assetImage.name : "No file chosen"}
            </Typography>
          </Grid>
        </Grid>

        {/* Add Documents Section */}
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, color: "#2a5a94" }}>
          Add Documents:
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
              Document Type <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <Select
                value={documentType}
                displayEmpty
                onChange={(e) => setDocumentType(e.target.value)}
                renderValue={(selected) => {
                  if (!selected) {
                    return <Typography variant="body2" color="text.secondary">Select Type</Typography>;
                  }
                  return selected;
                }}
                sx={{ borderRadius: 1.5 }}
              >
                {docTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155", textAlign: { md: "right" } }}>
              Upload Files <span style={{ color: "#ef4444" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button variant="outlined" component="label" size="small" sx={{ textTransform: "none", borderRadius: 1.5, borderColor: "#cbd5e1", color: "#475569" }}>
                Choose File
                <input type="file" hidden onChange={(e) => setDocumentFile(e.target.files[0])} />
              </Button>
              <Typography variant="caption" sx={{ color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>
                {documentFile ? documentFile.name : "No file selected"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddDocument}
              sx={{ 
                background: PLASTIC_BLUE_HEADER_GRADIENT, 
                color: "white", 
                textTransform: "none", 
                px: 5, 
                borderRadius: 1.5,
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(58, 120, 184, 0.25)",
                "&:hover": { opacity: 0.95, boxShadow: "0 6px 12px rgba(58, 120, 184, 0.35)" } 
              }}
            >
              Add Document
            </Button>
          </Grid>
        </Grid>

        {/* Documents List Section */}
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, color: "#2a5a94" }}>
          Documents List :
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", mb: 4, borderRadius: 2, overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeadCellSx}>Asset</TableCell>
                <TableCell sx={tableHeadCellSx}>Document Name</TableCell>
                <TableCell sx={tableHeadCellSx}>Image Location</TableCell>
                <TableCell sx={tableHeadCellSx}>View</TableCell>
                <TableCell sx={tableHeadCellSx}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documentsList.length > 0 ? (
                documentsList.map((doc) => (
                  <TableRow key={doc.id} sx={{ "&:hover": { bgcolor: "rgba(241, 245, 249, 0.5)" } }}>
                    <TableCell sx={{ fontWeight: 500, color: "#475569" }}>{doc.asset}</TableCell>
                    <TableCell>{doc.documentName}</TableCell>
                    <TableCell sx={{ color: "#64748b", fontStyle: "italic" }}>{doc.imageLocation}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary" sx={{ color: "#3a78b8" }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="error" onClick={() => handleDelete(doc.id)} sx={{ color: "#ef4444" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6, color: "text.secondary" }}>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>No data to display</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ 
            background: PLASTIC_BLUE_HEADER_GRADIENT, 
            color: "white", 
            textTransform: "none", 
            px: 6, 
            py: 1.25,
            borderRadius: 1.5,
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(42, 90, 148, 0.3)",
            "&:hover": { opacity: 0.95, boxShadow: "0 6px 15px rgba(42, 90, 148, 0.4)" } 
          }}
        >
          Save Details
        </Button>
      </Paper>
    </Box>
  );
};

export default AddDocuments;