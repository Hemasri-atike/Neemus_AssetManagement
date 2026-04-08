import React from "react";
import { useLocation } from "react-router-dom";

const LoctransferReq = () => {
  const { state } = useLocation();

  if (!state) return <p>No Data Found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Location Transfer Details</h2>

      <p><b>Asset Name:</b> {state.assetName}</p>
      <p><b>Request ID:</b> {state.requestId}</p>
      <p><b>Requestor:</b> {state.requestorName}</p>
      <p><b>Department:</b> {state.department}</p>
      <p><b>Designation:</b> {state.designation}</p>
      <p><b>Requested Location:</b> {state.requestedLocation}</p>
      <p><b>Comments:</b> {state.requestedComments}</p>
      <p><b>Date:</b> {state.requestedDate}</p>
      <p><b>Status:</b> {state.status}</p>
    </div>
  );
};

export default LoctransferReq;