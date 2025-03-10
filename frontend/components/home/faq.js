
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
import { HTMLParse } from '@/Common/htmlParser';
import Link from 'next/link';


const Faq = ({ data }) => {

    return (

        <div className='  faq-sec pt-[45px]  '>
            <div className='container  '>

                <div className='faq-cntr'>

                    <div className='grid grid-cols-1 md:grid-cols-2 '>

                        <div className='relative flex items-center'>
                            <div className='absolute right-0 top-0 w-[1px] h-full bg_divider_grad hidden md:block'></div>
                            <h4>{data?.Title}</h4>
                        </div>

                        <div className='pl-[0px] md:pl-[27px] pt-[50px] pb-[0px] md:pb-[50px]'>
                            <Accordion>
                                {
                                    data?.Questions?.map((obj, index) => (
                                        <AccordionItem key={index} uuid={obj?.id}>

                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    Q. {obj?.Question}

                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                {
                                                    HTMLParse(obj?.Answer)
                                                }
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    ))
                                }

                            </Accordion>

                            <Link href={data?.Button?.URL || '#'} className='btn'>{data?.Button?.Label}</Link>
                        </div>

                    </div>





                </div>



            </div>
        </div>




    );
};

export default Faq;