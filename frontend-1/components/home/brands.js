
import Image from 'next/image';
import { RedDotIcon, SliderarrowIcon, ViewarrowIcon } from '../Common/svgicons';
import { HTMLParse } from '@/Common/htmlParser';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';

const Brands = ({ data }) => {

    return (

        <div className='  brands-sec  '>
            <div className='container md:flex items-center justify-between'>

                <div className='brand-left'>
                    <span className='flex items-center'> <RedDotIcon /> {data?.Title}</span>
                    <h3>
                        {
                            HTMLParse(data?.Description)
                        }
                        {/* <b>120+</b> Multibrand Used Cars */}
                    </h3>
                    <Link href={'/cars'}>View all Cars</Link>
                </div>


                <div className='brand-right'>
                    <ul className='grid grid-cols-3 md:grid-cols-4'>
                        {
                            data?.Brands?.map((obj, index) => (
                                <li key={index}>
                                    <Image src={ImageUrl(obj?.Image?.url)} width={500} height={100} alt='' /> </li>
                            ))
                        }
                    </ul>
                </div>







            </div>
        </div>




    );
};

export default Brands;