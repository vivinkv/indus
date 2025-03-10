
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import Slider from "react-slick";


import Fuel1 from '../../public/fuel1.png';
import Fuel2 from '../../public/fuel2.png';
import { SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';
import Productlist from '../Common/productlist';
import Link from 'next/link';

const Recommended = ({ data,newlyAdded }) => {

  const settings = {
    dots: false,
    arrows: true,
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
          slidesToShow: 1,
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
          centerPadding: "50px",
        }
      }
    ]
  };


  return (

    <div className='relative pt-[40px] md:pt-[80px] pb-[40px] md:pb-[60px] recommended-sec'>
      <div className='container'>

        <div className='recommended-title  '>
          <h4>  Recommended Cars For You </h4>
        </div>

        <Tabs>
          <TabList className={'flex items-center justify-center react-tabs__tab-list'} >
            <Tab> <div className='flex items-center'>  Best Deals for You </div></Tab>
            <Tab> <div className='flex items-center'>   Newly Added </div></Tab>
          </TabList>

          <TabPanel>
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
          </TabPanel>


          <TabPanel>
            <div className='featured-slider'>
              <Slider {...settings}>
                {
                  newlyAdded?.map((obj, index) => (
                    <div key={index} >
                      <Productlist data={obj} />
                    </div>

                  ))
                }
              </Slider>
            </div>
          </TabPanel>

        </Tabs>

        <Link href={'/cars'} className=' btn'>View All  </Link>


      </div>

    </div>




  );
};

export default Recommended;