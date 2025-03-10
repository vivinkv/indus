
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";


import sh1 from '../../public/sh1.png';
import sh2 from '../../public/sh2.png';
import sh3 from '../../public/sh3.png';
import sh4 from '../../public/sh4.png';


import { RedDotIcon, SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';
import Storiesvideo from '../Common/instavideo';


const Moment = ({ data }) => {
    

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SliderarrowIcon />, // Custom next arrow
        prevArrow: <SliderarrowIcon /> // Custom previous arrow
    };


    return (

        <div className='  moment-sec'>
            <div className='container '>


                <div className='  md:flex items-center justify-between'>



                    <div className=''>
                        <h3> {data?.Heading}  </h3>
                        <h5>{data?.Content} </h5>

                        <p className='flex md:hidden items-center mb-[48px]'>  <RedDotIcon />  {data?.Company_Name}</p>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-4 gap-[27px]'>
                        {
                            data?.Shorts?.map((obj, index) => (
                                <div key={index}>
                                    <Storiesvideo data={obj} />
                                </div>
                            ))
                        }
                    </div>


                </div>

                <p className='hidden md:flex items-center'>  <RedDotIcon />  {data?.Company_Name}</p>


            </div>

        </div>




    );
};

export default Moment;