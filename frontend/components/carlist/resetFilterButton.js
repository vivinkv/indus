import React from 'react'

function ResetFilterButton({handleIsFilterClear}) {
  return (
    <a onClick={handleIsFilterClear} className='btn cursor-pointer'>Reset Filter</a>
  )
}

export default ResetFilterButton