
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";


import Fuel1 from '../../public/fuel1.png';
import Fuel2 from '../../public/fuel2.png';
import { SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';
import Productlist from '../Common/productlist';
import Link from 'next/link';

const Choose = ({ data }) => {

  const settings = {
    dots: false,
    arrows: data?.length > 3 ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "100px",
    nextArrow: <button><SliderarrowIcon /></button>, // Custom next arrow
    prevArrow: <button><SliderarrowIcon /></button>, // Custom previous arrow
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          centerPadding: "100px",
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "50px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "50px",
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "20px",
        }
      }
    ]
  };


  return (

    <div className='relative '>
      <div className='container'>

        <div className='featured-title flex items-center justify-between'>
          <h4>   Choose Your Next Car </h4>
          <Link href={'/cars'} className='hidden md:flex items-center '>View All <ViewarrowIcon /> </Link>
        </div>


        <div className='featured-slider'>
          <Slider {...settings}>
            {
              data?.map((obj, index) => (
                <div key={index} >
                  <Productlist data={obj} />
                </div>

              ))
            }
          </Slider>
        </div>

      </div>

    </div>




  );
};

export default Choose;