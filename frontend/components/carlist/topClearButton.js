import React from 'react'

function TopClearButton({handleIsFilterClear}) {
    return (
        <div>
            <button onClick={handleIsFilterClear} className='text-black'>
                {' '}
                Clear
            </button>
        </div>
    )
}

export default TopClearButton