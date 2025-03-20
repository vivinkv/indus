
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


import NoCar from '../../public/NOIMAGE.jpg';
import Car2 from '../../public/car2.png';
import Car3 from '../../public/car3.png';
import Carbadg from '../../public/logo_tag.png';


import { MeterIcon, PriceIcon, PumbIcon, TransitionIcon, ViewarrowIcon } from '../Common/svgicons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Productlist = ({ data }) => {

    const router = useRouter();

    const imageReturn = (src) => {
        if (src?.endsWith('/')) {
            return NoCar
        }
        return src
    }

    useEffect(() => {
        router.prefetch(`/cars/${data?.Slug}`);
    }, [data?.Slug, router]);

    return (
        <div className='product_list items-center '>
             <Image src={Carbadg} alt='' className='tag' />
            <div className='relative min-w-[140px] sm:min-w-[auto] w-[140px] sm:w-[40%] md:w-full overflow-hidden simlar_img_cntr  '>
           
            <Image src={imageReturn(data?.Image_URL?.Front_Image)} width={500} height={100} alt='' className='carimg' />
            </div>
          
            <div className='py-[15px] xl:py-[17px] px-[15px] xl:px-[30px]    w-full'>
                <div className='flex items-center justify-between mb-[5px] md:mb-[15px] w-full relative md:pr-[70px]'>
                   <h3> <a href={`/cars/${data?.Slug}`} className='no-border '> {data?.Name}</a></h3>
                    <span className='absolute top-[-10px] md:top-[unset] left-[-74px] md:left-[unset] md:right-0 '>{data?.Brand?.Name}</span>
                </div>
                <p>{data?.Description || data?.Name}</p>
                <hr />
                <div className='grid grid-cols-3 gap-[5px] md:gap-[15px] xl:gap-[25px] car-count-cntr'>

                    <div>
                        <div className='flex flex-col items-center'>
                            <MeterIcon />
                            <h5>{data?.Kilometers} km</h5>
                        </div>
                    </div>

                    <div>
                        <div className='flex flex-col items-center'>
                            <PumbIcon />
                            <h5>{data?.Fuel_Type?.Name}</h5>
                        </div>
                    </div>

                    <div>
                        <div className='flex flex-col items-center prd-lis-rate'>
                            <TransitionIcon />
                            <h5>{data?.Transmission_Type}</h5>
                        </div>
                    </div>

                </div>
                <hr />
                <div className='flex items-center justify-between car-price-cntr'>
                    <div className='flex items-center '>
                        <PriceIcon />
                        <h4 > {parseInt(data?.PSP, 10)}</h4>
                    </div>
                    <a className='link' href={`/cars/${data?.Slug}`}>View</a>
                </div>

            </div>
        </div>
    );
};

export default Productlist;