
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";


import shPlaceholder from '../../public/showroom-paceholder.webp';
import sh2 from '../../public/sh2.png';
import sh3 from '../../public/sh3.png';
import sh4 from '../../public/sh4.png';


import { SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';


const Showroom = ({ data }) => {

  const keralaShowroom = data?.filter(obj => obj?.Location !== (undefined || null));

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <button><SliderarrowIcon /></button>, // Custom next arrow
    prevArrow: <button><SliderarrowIcon /></button>, // Custom previous arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "65px",
        }
      }
    ]
  };

  const backgroundColor = (index) => {
    if (index % 4 == 0) {
      return '#F2263F'
    } else if (index % 4 == 1) {
      return '#9093F8'
    } else if (index % 4 == 2) {
      return '#2E054E'
    } else if (index % 4 == 3) {
      return '#4EAD8A'
    }
  }


  return (

    <div className='relative showroom-sec pb-[60px]'>
      <div className='container'>

        <div className='showroom-title flex items-center justify-between'>
          <h4>  Showrooms Across Kerala </h4>
        </div>


        <div className='showroom-slider'>
          <Slider {...settings}>
            {
              data?.map((obj, index) => (
                <Link href={`/dealers/${obj?.Slug}`}>
                  <div key={index}>
                    <div className='show_list' style={{ backgroundColor: backgroundColor(index) }}>
                      <h5>{obj?.Name}</h5>
                      <Image src={obj?.Image?.url ? ImageUrl(obj?.Image?.url) : shPlaceholder} alt='' width={138} height={125} />
                      <h4>{Math.floor(obj?.carCount / 10) * 10}+ Cars</h4>
                    </div>
                  </div>
                </Link>
              ))
            }



          </Slider>
        </div>


        <Link href='/dealers' className='btn'> View All </Link>

      </div>

    </div>




  );
};

export default Showroom;