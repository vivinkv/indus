
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';



import log1 from '../../public/log1.png';


import { RedDotIcon, SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';


const Cta = ({ data }) => {

    return (

        <div style={{
            backgroundImage: `url(${ImageUrl(data?.Cover_Image?.url)})`,
            backgroundSize: 'cover',
        }}
            className='  cta-sec pt-[45px] pb-[45px] mt-[45px]'>
            <div className='container h-full justify-center md:justify-center flex  items-center   '>


                <div>


                    <h4>{data?.Content1} </h4>
                    <h3>{data?.Content2}</h3>
                    <div className='flex items-center justify-center md:justify-start gap-[36px]'>
                        {
                            data?.Button?.map((obj, index) => (
                                <Link href={obj?.URL || '#'} key={index} className={`${index == 0 ? 'btn' : 'btnlink'}`}>{obj?.Label}</Link>
                            ))
                        }
                    </div>

                </div>



            </div>
        </div>




    );
};

export default Cta;