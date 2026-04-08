import React from 'react'
import ItReqAssetTable from '../tables/itadmin/itReqAssetTable'
import App from '../../App'
import { Approval } from '@mui/icons-material'
import ApprovedAssetTable from '../tables/itadmin/ApprovedAssetTable'

const ApprovedAllocation = () => {
  return (
    <div>
      <ItReqAssetTable />
      <ApprovedAssetTable />
    </div>
  )
}

export default ApprovedAllocation
