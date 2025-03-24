import React from 'react'

function DealerLoading() {
    return (
        <div className="p-5 gap-3 flex flex-col border shadow-md animate-pulse">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            {/* <div className="h-10 w-2/3 bg-gray-300 rounded mt-4"></div> */}
        </div>

    )
}

export default DealerLoading