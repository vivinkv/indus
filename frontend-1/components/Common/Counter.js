
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


import Contbg from '../../public/countbg.png';
import Cont2bg from '../../public/countbg2.png';
import Cont3bg from '../../public/countbg3.png';


import { MeterIcon, PriceIcon, PumbIcon, RightUparrow2Icon, TransitionIcon, ViewarrowIcon } from '../Common/svgicons';
import Link from 'next/link';
import { ImageUrl } from '@/Common/image-url';

const Counter = ({ data }) => {



    return (

        <div className='pt-[50px] md:pt-[65px] pb-[50px] md:pb-[65px] count-cnr_main'>
            <div className='container'>

                <div className='count-cnr'>



                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[0px] md:gap-[40px] lg:gap-[100px]'>

                        <div className='relative count-left'>
                            <Image src={Contbg} alt='' width={746} height={675} className='hidden md:block h-full' />
                            <Image src={Cont2bg} alt='' width={746} height={675} className='block md:hidden' />
                            <div className='absolute left-[0] md:left-[1%] lg:left-[10%] top-0 w-full max-w-[490px] h-full z-[1] flex flex-col justify-center p-[25px] md:p-[25px]'>
                                <h3>{data?.Heading}</h3>
                                <p>{data?.Content}</p>
                                <Link href={data?.Button?.URL || '#'} className='btn hidden md:flex items-center '> <span> {data?.Button?.Label} </span> <RightUparrow2Icon /> </Link>
                            </div>
                        </div>



                        <div className='pt-[0px] md:pt-[100px] lg:pr-[50px] xl:pr-[100px]'>
                            <div className='grid grid-cols-2 '>
                                <div>
                                    <div className='counter-list'>
                                        <Image src={ImageUrl(data?.Features[0]?.Image?.url)} alt='' width={746} height={675} />
                                        <h4>{data?.Features[0]?.Count}</h4>
                                        <h5>{data?.Features[0]?.Content}</h5>
                                    </div>
                                </div>

                                <div className='flex justify-end'>
                                    <div className='counter-list'>
                                        <Image src={ImageUrl(data?.Features[1]?.Image?.url)} alt='' width={746} height={675} />
                                        <h4>{data?.Features[1]?.Count}</h4>
                                        <h5> {data?.Features[1]?.Content}</h5>
                                    </div>
                                </div>

                            </div>

                            <div className='flex  justify-center  mt-[25px] md:mt-[0]'>
                                <div className='counter-list'>
                                    <Image src={ImageUrl(data?.Features[2]?.Image?.url)} alt='' width={746} height={675} />
                                    <h4>{data?.Features[2]?.Count}</h4>
                                    <p>{data?.Features[2]?.Content}</p>
                                </div>
                            </div>
                        </div>

                        <div className='relative count-left block md:hidden pt-[100px]'>
                            <Image src={Cont3bg} alt='' width={746} height={675} className='' />
                            <div className='absolute left-[0]   bottom-0 w-full  p-[25px] md:p-[25px]'>
                                <Link href={data?.Button?.URL || '#'} className='btn  flex items-center '> <span> {data?.Button?.Label} </span> <RightUparrow2Icon /> </Link>
                            </div>
                        </div>



                    </div>



                </div>






            </div>
        </div>




    );
};

export default Counter;