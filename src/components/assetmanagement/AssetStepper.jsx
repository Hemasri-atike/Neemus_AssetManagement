import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField, Paper } from "@mui/material";

const steps = ["Basic Info", "Ownership", "Technical", "Financial"];

const AssetStepper = ({ onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [form, setForm] = useState({
    assetId: "",
    assetNumber: "",
    subAssetNumber: "",
    assetClass: "",
    assetDescription: "",

    intenderName: "",
    custodianName: "",
    locationId: "",
    block: "",
    department: "",

    serialNumber: "",
    macId: "",
    model: "",
    materialNumber: "",
    grNumber: "",

    costCenter: "",
    assetVendor: "",
    poNumber: "",
    wbsNumber: "",
    yearOfPurchase: "",
    capitalizationDate: "",
    installationDate: "",
    acceptDate: "",
    expiryDate: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = () => {
    onSubmit(form);
  };

  return (
    <Paper className="p-6 rounded-2xl shadow-md">

      {/* 🔥 Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* 🔥 FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* STEP 1 */}
        {activeStep === 0 && (
          <>
            <TextField label="Asset ID" name="assetId" onChange={handleChange} />
            <TextField label="Asset Number" name="assetNumber" onChange={handleChange} />
            <TextField label="Sub Asset Number" name="subAssetNumber" onChange={handleChange} />
            <TextField label="Asset Class" name="assetClass" onChange={handleChange} />
            <TextField label="Asset Description" name="assetDescription" onChange={handleChange} fullWidth multiline rows={2} />
          </>
        )}

        {/* STEP 2 */}
        {activeStep === 1 && (
          <>
            <TextField label="Intender Name" name="intenderName" onChange={handleChange} />
            <TextField label="Custodian Name" name="custodianName" onChange={handleChange} />
            <TextField label="Location ID" name="locationId" onChange={handleChange} />
            <TextField label="Block" name="block" onChange={handleChange} />
            <TextField label="Department" name="department" onChange={handleChange} />
          </>
        )}

        {/* STEP 3 */}
        {activeStep === 2 && (
          <>
            <TextField label="Serial Number" name="serialNumber" onChange={handleChange} />
            <TextField label="Mac ID" name="macId" onChange={handleChange} />
            <TextField label="Model" name="model" onChange={handleChange} />
            <TextField label="Material Number" name="materialNumber" onChange={handleChange} />
            <TextField label="GR Number" name="grNumber" onChange={handleChange} />
          </>
        )}

        {/* STEP 4 */}
        {activeStep === 3 && (
          <>
            <TextField label="Cost Center" name="costCenter" onChange={handleChange} />
            <TextField label="Vendor" name="assetVendor" onChange={handleChange} />
            <TextField label="PO Number" name="poNumber" onChange={handleChange} />
            <TextField label="WBS Number" name="wbsNumber" onChange={handleChange} />
            <TextField label="Year of Purchase" name="yearOfPurchase" onChange={handleChange} />

            <TextField type="date" label="Capitalization Date" name="capitalizationDate" onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField type="date" label="Installation Date" name="installationDate" onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField type="date" label="Accept Date" name="acceptDate" onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField type="date" label="Expiry Date" name="expiryDate" onChange={handleChange} InputLabelProps={{ shrink: true }} />

            <TextField label="Remarks" name="remarks" onChange={handleChange} fullWidth multiline rows={2} />
          </>
        )}

      </div>

      {/* 🔥 Buttons */}
      <div className="flex justify-between mt-8">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleFinish}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default AssetStepper;