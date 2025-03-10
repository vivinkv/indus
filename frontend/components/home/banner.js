import React from 'react';
import Image from 'next/image'; 
import banner from '../../public/banner.png';  
import { ImageUrl } from '@/Common/image-url';

const Banner = ({data}) => { 
    console.log(data)
    return (
       <section className='banner-sec'>
            <div className='container relative'>
                <Image src={ImageUrl(data?.Cover_Image?.url)} alt='' width={1420} height={550} />
                <div className='banner_cap flex justify-center items-center'>
                    <h1>{data?.Title}</h1> 
                </div> 
            </div>
       </section> 

    );
};

export default Banner;