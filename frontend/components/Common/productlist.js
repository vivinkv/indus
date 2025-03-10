
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';


import Car1 from '../../public/car1.png';
import Car2 from '../../public/car2.png';
import Car3 from '../../public/car3.png';
import Carbadg from '../../public/logo_tag.png';


import { MeterIcon, PriceIcon, PumbIcon, TransitionIcon, ViewarrowIcon } from '../Common/svgicons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Productlist = ({ data }) => {

    const router = useRouter();

    useEffect(() => {
        router.prefetch(`/cars/${data?.Slug}`);
    }, [data?.Slug, router]);

    return (
        <div className='product_list'>
            <Image src={Carbadg} alt='' className='tag' />
            <Image src={data?.Image_URL?.Front_Image} width={500} height={100} alt='' className='carimg' />
            <div className='py-[10px] xl:py-[17px] px-[15px] xl:px-[30px]'>
                <div className='flex items-center justify-between mb-[15px]'>
                    <h3>{data?.Name}</h3>
                    <span>{data?.Brand?.Name}</span>
                </div>
                <p>{data?.Description || data?.Name}</p>
                <hr />
                <div className='grid grid-cols-3 gap-[15px] xl:gap-[25px] car-count-cntr'>

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
                        <div className='flex flex-col items-center'>
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
                    <a href={`/cars/${data?.Slug}`}>View</a>
                </div>

            </div>
        </div>
    );
};

export default Productlist;