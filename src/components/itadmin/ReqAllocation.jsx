import React from 'react'
import RejectedRequestedAssets from '../tables/itadmin/RejectedRequestedAssets'
import App from '../../App'
import ApprovedRequestedAssets from '../tables/itadmin/ApprovedRequestedAssets'

const ReqAllocation = () => {
  return (
    <div>
        <ApprovedRequestedAssets/>
      <RejectedRequestedAssets />
    </div>
  )
}

export default ReqAllocation
