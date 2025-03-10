import React from 'react'

function Skeleton({width,height}) {
  return (
    <div style={{width:width || '100px',height:height || '100px'}} className='skeleton'> 

    </div>
  )
}

export default Skeleton