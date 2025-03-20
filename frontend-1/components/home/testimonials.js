
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import Slider from "react-slick";

import sh1 from '../../public/sh1.png';
import sh2 from '../../public/sh2.png';
import sh3 from '../../public/sh3.png';
import sh4 from '../../public/sh4.png';


import { RedDotIcon, SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';
import Testimonialslist from '../Common/testimonilallist';



const Testimonials = ({ data }) => {


    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SliderarrowIcon />, // Custom next arrow
        prevArrow: <SliderarrowIcon />, // Custom previous arrow
        responsive: [

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true, // Enable center mode
                    centerPadding: "40px",
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true, // Enable center mode
                    centerPadding: "40px",
                }
            }
        ]
    };


    return (

        <div className='  testimonials-sec pt-[20px] md:pt-[60px] pb-[20px] md:pb-[60px]'>
            <div className='container '>

                <div className="hidden md:grid  grid-cols-3 gap-[20px]">
                    {
                        data?.map((obj, index) => (

                            <div key={index}>
                                <Testimonialslist data={obj} />
                            </div>
                        ))
                    }

                </div>

                <div className="md:hidden">
                    <Slider {...settings}>
                        {
                            data?.map((obj, index) => (

                                <div key={index}>
                                    <Testimonialslist data={obj} />
                                </div>
                            ))
                        }
                    </Slider>

                </div>



            </div>
        </div>




    );
};

export default Testimonials;