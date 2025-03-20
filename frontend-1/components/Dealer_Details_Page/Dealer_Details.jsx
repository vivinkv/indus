import React from 'react'
import { Contact_Call_Icon_Red, Contact_Mail_Icon_Red, Location_Icon_Red } from '../Common/svgicons'
import Link from 'next/link'
import { HTMLParse } from '@/Common/htmlParser'
import RemoveStyleAttributes from '@/Common/removeStyleAttribute'

const Dealer_Details = ({ data }) => {

    const Top_Description = HTMLParse(RemoveStyleAttributes(data?.Top_Description))

    return (
        <>
            <div className=' flex flex-col items-center '>

                <h2 className="  text-[#000000] text-[28px] font-medium leading-[33.131px] text-center">
                    {data?.Page_Heading}
                </h2>

                <div className='dealer-top-des'>
                    {Top_Description}
                </div>
            </div>

            <div className='mt-8 w-full gap-2 flex flex-col'>
                <h3 className=' text-[#000000] text-[20px] sm:text-[25px] font-medium leading-[33.131px]  '>
                    {data?.Dealer_Detail?.Name}
                </h3>
                {
                    data?.Outlet?.Name &&
                    <p className=' gap-3 flex items-center text-[#050b20] text-[18px] font-normal leading-[27.131px] font-inter '>
                        <Location_Icon_Red />  {data?.Outlet?.Name}
                    </p>
                }
            </div>



            <div className=' mt-3 w-full flex flex-col md:flex-row justify-between '>

                <div className='dealer-map-div md:w-[50%] '>
                    <div dangerouslySetInnerHTML={{ __html: data?.Dealer_Detail?.Location_Map }}></div>
                </div>

                <div className=' md:w-[50%] '>
                    <div className=' md:p-10 lg:p-16 py-5 gap-2 flex flex-col    '>

                        {
                            data?.Dealer_Detail?.Address &&
                            <>
                                <h3
                                    className=' text-[#333] text-[18px] font-semibold   '>
                                    Address
                                </h3>

                                <p className=' text-[#717171] text-[15px] '>
                                    {
                                        data?.Dealer_Detail?.Address
                                    }
                                </p>
                            </>
                        }


                        {
                            (data?.Dealer_Detail?.Landline || data?.Dealer_Detail?.Email) &&
                            <h3
                                className='mt-4 text-[#333] text-[18px] font-semibold   '>
                                Contact
                            </h3>

                        }
                        {
                            data?.Dealer_Detail?.Landline &&
                            <Link href={`mailto:${data?.Dealer_Detail?.Landline}`} className='text-[#717171] text-[15px] gap-2 flex items-center '>
                                <Contact_Call_Icon_Red />  {data?.Dealer_Detail?.Landline}
                            </Link>
                        }
                        {
                            data?.Dealer_Detail?.Email &&
                            <Link href={`mailto:${data?.Dealer_Detail?.Email}`} className=' text-[#717171] text-[15px]  gap-2 flex items-center'>
                                <Contact_Mail_Icon_Red />  {data?.Dealer_Detail?.Email}
                            </Link>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dealer_Details
