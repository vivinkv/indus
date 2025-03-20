import Image from 'next/image'
import React from 'react'

function ShowroomDiv({data}) {
    return (
        <div>
            <div className='show_list' style={{ backgroundColor: '#F2263F' }}>
                <h5>ALAPPUZHA</h5>
                <Image src={data} alt='' width={138} height={125} />
                <h4>50+ Cars</h4>
            </div>
        </div>
    )
}

export default ShowroomDiv