
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import Swiper navigation styles
import { Navigation } from 'swiper/modules';

import { BrandIcon, FuelIcon, InrIcon, LocationIcon, PriceIcon, Serch2Icon } from '../Common/svgicons';

import locaslide1 from '../../public/loca1.png';
import locaslide2 from '../../public/loca2.png';
import locaslide3 from '../../public/loca3.png';
import locaslide4 from '../../public/loca4.png';
import locaslide5 from '../../public/loca5.png';
import locaslide6 from '../../public/loca6.png';

import Brand1 from '../../public/br1.png';
import Brand2 from '../../public/br2.png';
import Brand3 from '../../public/br3.png';
import Brand4 from '../../public/br4.png';
import Brand5 from '../../public/br5.png';

import Fuel1 from '../../public/fuel1.png';
import Fuel2 from '../../public/fuel2.png';
import { getTrackBackground, Range } from 'react-range';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LocationFilter = ({ locations, brands, fuel, price }) => {

  const router = useRouter()

  const parsedMinPrice = parseInt(price?.Minimum)
  const parsedMaxPrice = parseInt(price?.Maximum)

  const [rsvalues, setrsValues] = useState([200000, 600000]); // Initial values within the range
  const RSMIN = parsedMinPrice;
  const RSMAX = parsedMaxPrice;

  const handlePriceNavigate = () => {
    router.push(`/cars/?price=[${rsvalues.join(',')}]`)
  }


  return (

    <div className='relative '>
      <div className='location_filter'>

        <Tabs>
          <TabList className={'flex items-center justify-between react-tabs__tab-list'} >
            <Tab> <div className='flex items-center'> <LocationIcon /> Location </div></Tab>
            <Tab> <div className='flex items-center'> <BrandIcon /> Brands </div></Tab>
            <Tab> <div className='flex items-center'> <FuelIcon /> Fuel type </div></Tab>
            <Tab> <div className='flex items-center'> <PriceIcon /> Price Range </div></Tab>
          </TabList>

          <TabPanel>
            <Swiper
              spaceBetween={20}
              slidesPerView={6}
              loop={true}
              autoplay={{ delay: 3000 }}
              navigation={false} // Enable navigation
              modules={[Navigation]} // Include Navigation module
              breakpoints={{
                // When the viewport is >= 640px
                360: {
                  slidesPerView: 3.5,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3.5,
                  spaceBetween: 20,
                },
                // When the viewport is >= 768px
                768: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                // When the viewport is >= 1024px
                992: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
            >
              {
                locations?.map((obj, index) => (
                  <SwiperSlide key={index}>
                    <Link href={`/cars?location=${obj?.Slug}`}>
                      <div className='relative loca-fil-img-cntr'>
                        <Image src={ImageUrl(obj?.Image?.url)} width={200} height={108} alt='' className='w-[108px] has-[113px]: object-cover rounded-[9.768px] ' />
                        <h4>{obj?.Place}</h4>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </TabPanel>


          <TabPanel>

            <div className='max-w-[700px] mx-auto brand-tabs-slider'>

              <Swiper
                spaceBetween={33}
                slidesPerView={5}
                loop={true}
                autoplay={{ delay: 3000 }}
                navigation={true} // Enable navigation
                modules={[Navigation]} // Include Navigation module
                breakpoints={{
                  // When the viewport is >= 640px
                  360: {
                    slidesPerView: 3.3,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 3.3,
                    spaceBetween: 20,
                  },
                  // When the viewport is >= 768px
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  // When the viewport is >= 1024px
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
              >

                {
                  brands?.map((obj, index) => (
                    <SwiperSlide key={index}>
                      <Link href={`/cars?brand=${obj?.Name}`}>
                        <div className='loca-list-item flex items-center justify-between'>
                          <Image width={100} height={100} src={ImageUrl(obj?.Image?.url)} alt='' />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                }

              </Swiper>

            </div>


          </TabPanel>




          <TabPanel>
            <div className='grid grid-cols-3 gap-[16px]'>
              {
                fuel?.map((obj, index) => (
                  <Link key={index} href={`/cars?fuel=${obj?.Name}`}>
                    <div >
                      <div className='fuel-list-item flex flex-col md:flex-row items-center justify-center md:justify-end'>
                      <Image className='block md:hidden' src={ImageUrl(obj?.Image?.url)} width={100} height={100} alt='' />
                        <h5>{obj?.Name}</h5>
                        {/* <Image src={Fuel1} alt='' /> */}
                        <Image className='hidden md:block' src={ImageUrl(obj?.Image?.url)} width={100} height={100} alt='' />
                      </div>
                    </div>
                  </Link>

                ))
              }
            </div>
          </TabPanel>


          <TabPanel>

            <div className='md:flex items-center justify-between'>
              <div className='w-[100%] md:w-[90%]'>

                <div className='rangeslide-price hidden md:flex items-center justify-between'>
                  <h5>{`${rsvalues[0]}`}rs</h5>
                  <h5>{`${rsvalues[1]}`}rs</h5>
                </div>

                <div className="range-slider">

                  <Range
                    values={rsvalues}
                    step={5000}
                    min={RSMIN}
                    max={RSMAX}
                    onChange={(rsvalues) => setrsValues(rsvalues)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          background: getTrackBackground({
                            values: rsvalues, // Ensure 'values' is used if required
                            colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                            min: RSMIN,
                            max: RSMAX,
                          }),
                          borderRadius: '0px',
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div className='ddd'
                        {...props}
                        style={{
                          ...props.style,
                          height: '24px',
                          width: '24px',
                          borderRadius: '12px',
                          backgroundColor: '#fff',
                          border: '5px solid #D7001D'
                        }}
                      />
                    )}
                  />


                </div>


                <div className='rangeslide-price flex md:hidden mt-[35px] items-center justify-between w-[80%] md:w-full'>
                  <h5> ₹ {`${rsvalues[0]}`}</h5>
                  <h5>  ₹ {`${rsvalues[1]}`}</h5>
                </div>



              </div>

              <div>
                <button onClick={handlePriceNavigate} className='search-btn'> <Serch2Icon /> </button>
              </div>

            </div>
          </TabPanel>
        </Tabs>



      </div>
    </div>




  );
};

export default LocationFilter;