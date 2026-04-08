import React from 'react';
import NewCustodianTransferReqList from '../tables/NewCustodianTransferReqList';
import ApprovedCustodianTransferAdminList from '../tables/ApprovedCustodianTransferAdminList';
import { Box } from '@mui/material';

const ApproverCustTransfer = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <NewCustodianTransferReqList />
      <ApprovedCustodianTransferAdminList />
    </Box>
  );
};

export default ApproverCustTransfer;
