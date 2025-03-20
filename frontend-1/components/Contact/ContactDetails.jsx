import React from 'react'
import { Contact_Call_Icon } from '../Common/svgicons'
import Link from 'next/link'

const ContactDetails = ({ general,data }) => {
    return (
        <>
            <div className=' w-full md:w-[40%] gap-3 flex flex-col '>

                <h1 className=' text-[20px] sm:text-[25px] text-[#050b20] font-medium '>
                    Contact Indus Used Cars
                </h1>
                <p className=' text-[15px] sm:text-[16px] text-[#050b20]  '>
                    {data?.Description}
                </p>

                <div className=' mt-3 md:mt-10 gap-2 flex flex-col  '>
                    <span className=' text-[#050b20] font-semibold '>Phone:</span>
                    {
                        general?.Contact?.Phone_Number?.split(',')?.map((obj, index) => (
                            <Link href={`tel:${obj}`} key={index} className=' text-[#050b20] gap-2 flex items-center '><Contact_Call_Icon /> {obj}</Link>
                        ))
                    }
                </div>
            </div>

        </>
    )
}

export default ContactDetails
