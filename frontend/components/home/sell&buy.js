
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { RightUparrowIcon } from '../Common/svgicons';
import buy from '../../public/buy.png';
import EnquiryModal from '../Common/modal';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';

const SellBuy = ({ data }) => {

    const router=useRouter()

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }


    const handleClick = () => {
        if (data?.Navigation_Link?.startsWith('http')) {
            window.open(data?.Navigation_Link, '_blank');
        } else {
            router.push(data?.Navigation_Link)
        }
    }



    return (
        <>

            <EnquiryModal open={open} setOpen={setOpen} title={data?.id == 5 ? 'Sell your car' : data?.id == 6 ? 'Book your car' : ''} book={data?.id == 6 ? true : false} />
  

            <div style={{ cursor: 'pointer' }} onClick={handleClick}>
                <div className='buy-sec'>
                    <div className='absolute right-[20px] top-[20px] z-[2] rounded-[50%] bg-white md:bg-transparent'>
                        {data?.Navigation_Link?.startsWith('http') ? (
                            <Link target='_blank' href={data?.Navigation_Link} className='cursor-pointer link'>
                                <RightUparrowIcon />
                            </Link>
                        ) : (
                            <Link href={data?.Navigation_Link} className='cursor-pointer link'>
                                <RightUparrowIcon />
                            </Link>
                        )}
                    </div>

                    <Image src={ImageUrl(data?.Image?.url)} width={1000} height={100} alt='' />

                    <div className='buy-sec-cap absolute left-[30px] md:left-0 top-0 w-full h-full p-[25px] flex flex-col justify-center'>
                        <h4>{data?.Title}</h4>
                        <div className='block md:hidden'>
                            <p>{data?.Content}</p>
                            <Link onClick={(e) => e.stopPropagation()} href={data?.Button?.URL || '#'} className='btn'>
                                {data?.Button?.Label}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SellBuy;