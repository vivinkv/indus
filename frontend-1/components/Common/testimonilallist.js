
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


import tes1 from '../../public/Аватарка.png';

import { MeterIcon, PriceIcon, PumbIcon, StarIcon, TransitionIcon, ViewarrowIcon } from '../Common/svgicons';
import { HTMLParse } from '@/Common/htmlParser';
import { ImageUrl } from '@/Common/image-url';

const Testimonialslist = ({ data }) => {

    return (

        <>

            <div className='test_list'>
                <div className='flex items-center justify-between mb-[23px]'>
                    <div className='flex items-center'>
                        <Image src={ImageUrl(data?.Author?.Profile?.url)} width={200} height={45} alt='' />
                        <h3>
                            {
                                data?.Author?.Name
                            }
                        </h3>
                    </div>
                    <StarIcon count={data?.Author?.Rating} />
                </div>

                <h4>{data?.Title}</h4>

                {HTMLParse(data?.Content)}

            </div>


        </>




    );
};

export default Testimonialslist;