import { useEffect, useState } from 'react';
import Image from 'next/image';
import book1 from '../../public/book1.png';
import book2 from '../../public/book3.png';
import book3 from '../../public/book4.png';

import { EmailIcon, FiltCalenderrIcon, FiltCarIcon, FiltKmIcon, Location2Icon, LocationIcon, MobileDividerIcon, PhoneIcon, PricetagIcon, PumbIcon, Search2Icon, SearchIcon, UserIcon } from '../Common/svgicons';

import { useForm } from "react-hook-form"
import { useRouter } from 'next/router';
import { ContactApi } from '@/Datas/Endpoints/Contact';
import LoadingSpinner from '../Common/loading-spinner';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { HTMLParse } from '@/Common/htmlParser';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';



const Book = ({ data }) => {


    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()
    const { executeRecaptcha } = useGoogleReCaptcha();

    const router = useRouter();
    const pageUrl =
        typeof window !== 'undefined'
            ? window.location.origin + router.asPath
            : '';

    const [loading, setLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')

    const onSubmit = async (details) => {
        setLoading(true)
        const token = await executeRecaptcha("book_form_submit");

        if (!token) {
            seterrorMessage("Recaptcha not verified")
            setTimeout(() => {
                seterrorMessage('')
            }, 5000);
            setLoading(false)
            return
        }



        let dataToSubmit = {
            name: details?.name,
            email: details?.email,
            phone_number: details?.phone,
            city: details?.location,
            source_url: pageUrl,
            lead_type: 'Book',
            recaptcha_token: token
        }

        try {
            const response = await ContactApi.save(dataToSubmit)
            router.push('/thank-you')
        } catch (error) {
            console.log(error);
            seterrorMessage(error?.message)
            setTimeout(() => {
                seterrorMessage('')
            }, 5000);

        } finally {
            setLoading(false)
        }
    }

    const handleBuyClick = () => {
        if (router?.pathname == '/cars') {
            window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            router.push('/cars')
        }
    }

    useEffect(() => {
        router.prefetch('/thank-you')
    }, [])

    return (

        <section className='book-sec pt-[50px] md:pt-[0]'>
            <div className='container'>

                <div className='book-sec-cntr'>

                    <div className='md:flex items-center'>

                        <div className='md:w-6/12 lg:w-8/12 relative z-[1]'>
                            <ul className='flex items-center gap-[30px]'>
                                {
                                    data?.Certified_Excellence?.Image_Section?.map((obj, index) => (
                                        <li key={index}><Image src={ImageUrl(obj?.Image?.url)} alt='' width={71} height={71} /></li>
                                    ))
                                }
                            </ul>
                            <h4>{data?.Certified_Excellence?.Title}</h4>
                            <div className='flex items-center justify-center md:hidden mb-[20px]'>
                                <MobileDividerIcon />
                            </div>
                            <h5 className='hidden md:block'>
                                {
                                    data?.Certified_Excellence?.Short_Title
                                }
                            </h5>
                            <p>
                                {
                                    data?.Certified_Excellence?.Short_Description
                                }
                            </p>

                            <div className='hidden md:flex items-center gap-[32px]'>
                                {/* href={data?.Certified_Excellence?.Button[0]?.URL || '#'} */}
                                <a onClick={handleBuyClick} className='btn-fill cursor-pointer'>
                                    {
                                        data?.Certified_Excellence?.Button[0]?.Label
                                    }
                                </a>
                                <Link href={data?.Certified_Excellence?.Button[1]?.URL || '#'} target='_blank' className='btn-link'> {
                                    data?.Certified_Excellence?.Button[1]?.Label
                                }</Link>
                            </div>


                        </div>

                        <div className='md:w-6/12 lg:w-4/12 relative z-[1]'>

                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className='book-form '>
                                    <h3>Book your car</h3>

                                    <div className='frm-group'>
                                        <UserIcon />
                                        <input
                                            type='text'
                                            placeholder='Enter Your Name'
                                            {...register("name", { required: "Name is required" })}
                                        />
                                        {errors.name && <span className="text-red-700">{errors.name.message}</span>}
                                    </div>

                                    <div className='frm-group'>
                                        <PhoneIcon />
                                        <input
                                            type='text'
                                            placeholder='Phone number'
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: { value: /^[0-9]+$/, message: "Invalid phone number" }
                                            })}
                                        />
                                        {errors.phone && <span className="text-red-700">{errors.phone.message}</span>}
                                    </div>

                                    <div className='frm-group'>
                                        <EmailIcon />
                                        <input
                                            type='email'
                                            placeholder='Email Address'
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                                            })}
                                        />
                                        {errors.email && <span className="text-red-700">{errors.email.message}</span>}
                                    </div>

                                    <div className='frm-group'>
                                        <Location2Icon />
                                        <input
                                            type='text'
                                            placeholder='Location'
                                            {...register("location", { required: "Location is required" })}
                                        />
                                        {errors.location && <span className="text-red-700">{errors.location.message}</span>}
                                    </div>

                                    <button className='btn'>
                                        {
                                            loading ?
                                                <LoadingSpinner heigth={'20px'} width={'20px'} color={'white'} />
                                                :
                                                'Submit'
                                        }
                                    </button>

                                    {
                                        errorMessage &&
                                        <div className='frm-group'>
                                            <span className="text-red-700">{errorMessage}</span>
                                        </div>
                                    }

                                </div>
                            </form>

                        </div>

                        <div className='flex md:hidden items-center justify-center gap-[32px] absolute left-0 bottom-[50px] w-full z-[2]'>
                            {/* href={data?.Certified_Excellence?.Button[0]?.URL || '#'} */}
                            <a onClick={handleBuyClick} className='btn-fill'>
                                {
                                    data?.Certified_Excellence?.Button[0]?.Label
                                }
                            </a>
                            <Link href={data?.Certified_Excellence?.Button[1]?.URL || '#'} className='btn-link'>
                                {
                                    data?.Certified_Excellence?.Button[1]?.Label
                                }
                            </Link>
                        </div>

                    </div>

                </div>


            </div>
        </section>
    );
};

export default Book;