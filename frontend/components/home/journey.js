import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';



import jou1 from '../../public/Jou1.png';
import jou2 from '../../public/Jou2.png';
import jou3 from '../../public/Jou3.png';
import joubg from '../../public/Joubg.png';
import { ImageUrl } from '@/Common/image-url';


const Journey = ({ data }) => {

    return (

        <div className=' '>
            <div className='container'>

                <div className='journey-sec relative overflow-hidden'>

                    <Image src={joubg} alt='' className='absolute right-[0] md:right-[unset] left-[unset] md:left-[-50px] bottom-[-50px] z-[0]' />

                    <h3>{data?.Title}</h3>
                    <h5>{data?.Description}</h5>

                    <div className=' journey-list relative z-[1]'>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-[50px] md:gap-[90px]'>
                            {
                                data?.Journey?.map((obj, index) => (
                                    <div key={index} className='flex md:block items-center '>
                                        <Image width={170} height={110} src={ImageUrl(obj?.Image?.url)} alt='' />
                                        <div>
                                            <h4>{obj?.title}</h4>
                                            <p>{obj?.Description}</p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                    </div>


                </div>







            </div>

        </div>




    );
};

export default Journey;