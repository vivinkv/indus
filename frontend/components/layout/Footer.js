import React, { useState } from 'react';
import Image from 'next/image';

import logo from '../../public/logo.svg';
import { AddressarrowIcon, AddressIcon, CallIcon, FaceIcon, InstaIcon, TwittIcon, WhatsIcon, YouIcon } from '../Common/svgicons';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';
import { HTMLParse } from '@/Common/htmlParser';



const Footer = ({ general, hideFooter, bottomDescription }) => {

   const [isExpanded, setIsExpanded] = useState(false);

   const handleReadMore = () => {
      setIsExpanded(!isExpanded);
   };

   const socialLinks = general?.Social_Links

   const footerContent = HTMLParse(bottomDescription)



   return (
      <footer>


         {!hideFooter && (

            <>

               <div className='foot1  border-b border-[#D6D0BF]'>

                  <div className='container  '>


                     <div className="md:flex items-center ">
                        <div className="md:w-3/12 mb-[30px] md:mb-[0] mt-[36px] md:mt-[0px] px-[20px] md:flex items-center justify-center">
                           <Image src={ImageUrl(general?.Logo?.url)} width={200} height={52} alt='' />
                        </div>


                        <div className="md:w-6/12 pt-[40px] pb-[40px] px-[20px]  border-b md:border-b-0 border-t md:border-t-0  md:border-l md:border-r border-[#D6D0BF]">


                           <Link target='_blank' href={general?.Link || '#'} className='flex items-center justify-between mb-[50px] md:mb-[70px]'>
                              <div className='flex items-center gap-[5px]'>
                                 <AddressIcon />
                                 <p className='max-w-[334px]'>
                                    {general?.Contact?.Address1}
                                 </p>
                              </div>
                              <span className='hidden md:block'><AddressarrowIcon /> </span>
                           </Link>


                           <div className='flex items-center justify-between'>
                              <div className='md:flex items-center gap-[15px]'>

                                 <h5 className='flex items-center gap-[5px] mb-[35px] md:mb-[0]'> <WhatsIcon /> <a target='_blank' href={`https://wa.me/${general?.Contact?.WhatsApp_Number}`}>{general?.Contact?.WhatsApp_Number}</a></h5>

                                 <h5 className='flex items-center gap-[5px]'> <CallIcon />
                                    {general?.Contact?.Phone_Number?.split(",").map((number, index) => (
                                       <React.Fragment key={index}>
                                          <a href={`tel:${number.trim()}`}>
                                             {number.trim()}
                                          </a>
                                          {index !== general?.Contact?.Phone_Number?.split(",").length - 1 && " | "}
                                       </React.Fragment>
                                    ))}
                                 </h5>
                              </div>

                           </div>


                        </div>


                        <div className="md:w-3/12 py-[32px] md:py-[0]  px-[20px] md:flex items-center justify-center">

                           <div>
                              <h4>CONNECT WITH US</h4>
                              <div className='flex items-center md:justify-center gap-[15px]'>
                                 {
                                    socialLinks?.Facebook_URL &&
                                    <Link href={socialLinks?.Facebook_URL || '#'}><FaceIcon /></Link>
                                 }
                                 {
                                    socialLinks?.Instagram_URL &&
                                    <Link href={socialLinks?.Instagram_URL || '#'}><InstaIcon /></Link>
                                 }
                                 {
                                    socialLinks?.Twitter_URL &&
                                    <Link href={socialLinks?.Twitter_URL || '#'}><TwittIcon /></Link>
                                 }
                                 {
                                    socialLinks?.Youtube_URL &&
                                    <Link href={socialLinks?.Youtube_URL || '#'}><YouIcon /></Link>
                                 }
                              </div>
                           </div>


                        </div>
                     </div>

                  </div>

               </div>




               <div className='foot2 pt-[30px] pb-[30px] border-b border-[#D6D0BF]'>

                  <div className='container  '>
                     {
                        general?.Footer?.Page?.map((obj, index) => (
                           <div key={index} className='show-add'>
                              <span>{obj?.Type}</span>
                              {
                                 obj?.Links?.map((link, linkIndex) => (
                                    <React.Fragment key={linkIndex}>
                                       <Link href={link?.URL}>{' ' + link?.Label}</Link>
                                       {obj?.Link?.length != linkIndex + 1 && ' | '}
                                    </React.Fragment>
                                 ))
                              }
                              {/* <a>Alappuzha</a> | <a>Ernakulam</a> | <a>Kollam</a> | <a>Alappuzha</a> | <a>Ernakulam</a> | <a>Kollam</a> | <a>Alappuzha</a> | <a>Ernakulam</a> | <a>Kollam</a> */}
                           </div>
                        ))
                     }

                     <div className={`foot-cnt ${isExpanded ? 'expanded' : ''}`}>
                        {
                           footerContent
                        }

                        {/* <h5>Used Cars in Kerala</h5>
                        <p>Indus Used Cars is your one-stop solution for buying and selling used cars in Kerala. From the large fleet of used cars, choose the best car that suits your requirements. Be it pre-owned Maruti or non-Maruti cars, you can pick the right car for you at an affordable rate. Compare and buy the best cars that are available in both petrol and diesel variants. Whatever be you requirement Indus Used Cars is your best bet.</p>


                        <h5>Used Cars in Kerala</h5>
                        <p>Indus Used Cars is your one-stop solution for buying and selling used cars in Kerala. From the large fleet of used cars, choose the best car that suits your requirements. Be it pre-owned Maruti or non-Maruti cars, you can pick the right car for you at an affordable rate. Compare and buy the best cars that are available in both petrol and diesel variants. Whatever be you requirement Indus Used Cars is your best bet.</p>



                        <h5>Used Cars in Kerala</h5>
                        <p>Indus Used Cars is your one-stop solution for buying and selling used cars in Kerala. From the large fleet of used cars, choose the best car that suits your requirements. Be it pre-owned Maruti or non-Maruti cars, you can pick the right car for you at an affordable rate. Compare and buy the best cars that are available in both petrol and diesel variants. Whatever be you requirement Indus Used Cars is your best bet.</p>


                        <h5>Used Cars in Kerala</h5>
                        <p>Indus Used Cars is your one-stop solution for buying and selling used cars in Kerala. From the large fleet of used cars, choose the best car that suits your requirements. Be it pre-owned Maruti or non-Maruti cars, you can pick the right car for you at an affordable rate. Compare and buy the best cars that are available in both petrol and diesel variants. Whatever be you requirement Indus Used Cars is your best bet.</p>


                        <h5>Used Cars in Kerala</h5>
                        <p>Indus Used Cars is your one-stop solution for buying and selling used cars in Kerala. From the large fleet of used cars, choose the best car that suits your requirements. Be it pre-owned Maruti or non-Maruti cars, you can pick the right car for you at an affordable rate. Compare and buy the best cars that are available in both petrol and diesel variants. Whatever be you requirement Indus Used Cars is your best bet.</p>


                        <h5>Used Cars in Kerala</h5>
                        <p>Indus Used Cars is your one-stop solution for buying and selling used cars in Kerala. From the large fleet of used cars, choose the best car that suits your requirements. Be it pre-owned Maruti or non-Maruti cars, you can pick the right car for you at an affordable rate. Compare and buy the best cars that are available in both petrol and diesel variants. Whatever be you requirement Indus Used Cars is your best bet.</p> */}


                     </div>

                     <div className='block md:hidden read-more'>
                        <a onClick={handleReadMore}>
                           {isExpanded ? 'READ LESS' : 'READ MORE'}
                        </a>
                     </div>

                  </div>





               </div>

            </>

         )}




         <div className='foot-3 pt-[25px] pb-[25px] '>
            <div className='container block sm:flex items-center justify-between '>
               <p>Copyright © 2024.Indus Motors </p>
               <h5>  Designed & Developed by Spiderworks </h5>
            </div>
         </div>



      </footer>
   );
};
export default Footer;