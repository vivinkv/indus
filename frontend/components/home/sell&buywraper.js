 
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import Swiper navigation styles
import { Navigation } from 'swiper/modules';


import SellBuy from "@/components/home/sell&buy";
const SellBuyWraper = () => { 
    return ( 
        <div>
        <div className="container">

          <div className=" hidden md:grid grid-cols-1 md:grid-cols-2 gap-[60px]">

            <div>
              <SellBuy/>
            </div>

            <div>
              <SellBuy/>
            </div> 
          </div> 


          <div>
          <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000 }}
      navigation={false} // Enable navigation
      modules={[Navigation]} // Include Navigation module
   
    >
      <SwiperSlide> 
        <SellBuy/>
      </SwiperSlide>

      <SwiperSlide> 
        <SellBuy/>
      </SwiperSlide>

      

    </Swiper>
          </div>

          
        </div> 
      </div>
    );
};

export default SellBuyWraper;