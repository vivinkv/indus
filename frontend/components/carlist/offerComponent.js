import Image from 'next/image'
import React from 'react'

function OfferComponent({data,imageclass,divClass}) {
    return (
        <div className={divClass}>
            <Image className={imageclass} src={data} alt='' width={315} height={235} />
        </div>
    )
}

export default OfferComponent