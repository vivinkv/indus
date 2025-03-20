import React from 'react'

function SelectedChip({ children }) {
    return (
        <div
            className='px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium flex items-center'
        >
            {children}
        </div>
    )
}

export default SelectedChip