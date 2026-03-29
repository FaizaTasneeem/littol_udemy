import React from 'react'

function DashboardMetricsCards({field, value}) {
  return (
    <div className="mt-10 p-4 flex flex-row items-center justify-center border border-gray-300 rounded-xl">
        <div className="mr-2 p-2 border border-gray-300 rounded-xl">DEMO</div>
        <div className="flex flex-col">
            <div className="">{field}</div>
            <div className="">{value}</div>
        </div>
    </div>
  )
}

export default DashboardMetricsCards