import React from 'react'
import { Contact_Call_Icon_Red, Contact_Mail_Icon_Red } from '../Common/svgicons'
import Link from 'next/link'

const Dealer_Item = ({ data }) => {
    return (
        <>

            <div className=' p-7 py-5 gap-2 flex flex-col border shadow-md hover:scale-105 transform transition-all duration-300 ease-in-out  '>
                <Link href={`/dealers/${data?.Slug}`}
                    className=' text-[#333] text-[18px] font-semibold hover:text-[#d84040]  '>
                    {
                        data?.Dealer_Detail?.Name
                    }

                </Link>
                <p className=' text-[#717171] text-[15px] '>
                    {
                        data?.Dealer_Detail?.Address
                    }

                </p>

                {
                    data?.Dealer_Detail?.Landline &&

                    <Link href={`tel:${data?.Dealer_Detail?.Landline}`} className=' mt-4 text-[#717171] text-[15px] gap-2 flex items-center '>
                        <Contact_Call_Icon_Red /> {data?.Landline}
                    </Link>
                }
                {
                    data?.Dealer_Detail?.Email &&
                    <Link href={`mailto:${data?.Dealer_Detail?.Email}`} className=' mt-4 text-[#717171] text-[15px] gap-2 flex items-center '>
                        <Contact_Mail_Icon_Red /> {data?.Dealer_Detail?.Email}
                    </Link>
                }

            </div>

        </>
    )
}

export default Dealer_Item