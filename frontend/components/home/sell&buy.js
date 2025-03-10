
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { RightUparrowIcon } from '../Common/svgicons';
import buy from '../../public/buy.png';
import EnquiryModal from '../Common/modal';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const SellBuy = ({ data }) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }


    return (
        <>

            <EnquiryModal open={open} setOpen={setOpen} title={data?.id == 5 ? 'Sell your car' : data?.id == 6 ? 'Book your car' : ''} book={data?.id == 6 ? true : false} />


            <div className='buy-sec'>
                <div className='absolute right-[20px] top-[20px] z-[2] rounded-[50%] bg-white md:bg-transparent'>
                    <a onClick={handleOpen} className='cursor-pointer'> <RightUparrowIcon /> </a>
                </div>
                <Image src={ImageUrl(data?.Image?.url)} width={1000} height={100} alt='' />
                <div className='buy-sec-cap absolute left-[30px] md:left-0 top-0 w-full h-full p-[25px] flex flex-col justify-center'>
                    <h4>{data?.Title}</h4>
                    <div className='block md:hidden'>
                        <p >We are committed to providing our customers with exceptional service.</p>
                        <Link href={data?.Button?.URL || '#'} className='btn'>{data?.Button?.Label || 'Contact Us'}</Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SellBuy;