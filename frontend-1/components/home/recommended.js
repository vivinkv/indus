import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Slider from "react-slick";
import nofound from '../../public/nofound.png'
import { SliderarrowIcon } from '../Common/svgicons';
import Productlist from '../Common/productlist';
import Link from 'next/link';
import { useState } from 'react';

const Recommended = ({ data, newlyAdded }) => {

  const [selectedTab, setSelectedTab] = useState(0);

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

    <div className='relative pt-[40px] md:pt-[80px] pb-[40px] md:pb-[60px] recommended-sec'>
      <div className='container'>

        <div className='recommended-title  '>
          <h4>  Recommended Cars For You </h4>
        </div>

        <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
          <TabList className={'flex items-center justify-center react-tabs__tab-list'} >
            <Tab> <div className='flex items-center'>  Best Deals for You </div></Tab>
            <Tab> <div className='flex items-center'>   Newly Added </div></Tab>
          </TabList>

          <TabPanel>
            <div className='featured-slider  '>
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
              {
                newlyAdded?.length > 0 &&
                <Slider {...settings}>
                  {
                    newlyAdded?.map((obj, index) => (
                      <div key={index} >
                        <Productlist data={obj} />
                      </div>

                    ))
                  }
                </Slider>


              }

            </div>

            {
              newlyAdded?.length == 0 &&
              <div className='w-full'>
                <div className='no_car_found flex flex-col items-center w-full'>
                  <Image src={nofound} width={500} height={400} />

                  <p>No cars found </p>

                </div>
              </div>
            }
          </TabPanel>

        </Tabs>

        {
          selectedTab == 0 && data?.length > 0 &&
          <Link href={'/cars'} className=' btn'>View All  </Link>
        }
        {
          selectedTab == 1 && newlyAdded?.length > 0 &&
          <Link href={'/cars'} className=' btn'>View All  </Link>
        }


      </div>

    </div>




  );
};

export default Recommended;