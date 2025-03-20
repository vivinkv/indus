import Image from 'next/image'
import React from 'react'

function LocationFilterComponent({data}) {
  return (
    <div className='relative loca-fil-img-cntr'>
      <Image src={Brand1} alt='' className='w-[108px] has-[113px]: object-cover rounded-[9.768px] ' />
      <h4>KOCHI</h4>
    </div>
  )
}

export default LocationFilterComponent