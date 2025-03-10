import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';


import logoIcon from '../../public/logo.svg';
import { CloseIcon, MobileMenu2Icon, MobileMenuarrowIcon, MobileMenuIcon, SearchIcon, SelectArrow } from '../Common/svgicons';
import { useRouter } from 'next/router';

import carimg from '../../public/menucar.png';
import SearchModal from '../Common/searchmodal';
import Link from 'next/link';
import { ImageUrl } from '@/Common/image-url';

const Header = ({ data, general }) => {


    const [isExpanded, setIsExpanded] = useState(false);

    const handleIconClick = () => {
        setIsExpanded(!isExpanded);
    };

    const [inner, setInner] = useState(false);

    const router = useRouter()


    useEffect(() => {
        if (router.asPath == '/car' || router.asPath == '/car/details' || router.asPath == '/404' || router.asPath == '/thank-you') {
            setInner(true)
        } else {
            setInner(false)
        }
    }, [])



    const [menuClass, setMenuClass] = useState('');
    let scrollTimeout;

    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 150) {
                    setMenuClass('scrolled');
                } else {
                    setMenuClass('');
                }
            }, 200); // Delay of 200ms before class change
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, []);

    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        }

        // Add event listener for clicks outside the component
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const [isNavFixed, setIsNavFixed] = useState(false);

    const handleMenuClick = () => {
        setIsNavFixed(!isNavFixed);
        setIsFixed(!isFixed);
    };


    const [isFixed, setIsFixed] = useState(false);

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <>

            <SearchModal open={open} setOpen={setOpen} />
            <header className={`main-header ${menuClass} ${inner ? 'balck_headr' : ''}`}>
                <div className='container flex items-center justify-between'>

                    <div className='flex items-center  '>


                        <Link href={'/'}><Image src={ImageUrl(general?.Logo?.url)} width={100} height={100} alt='' className='w-[100px] xl:w-[127px] ' /></Link>

                        <div ref={containerRef} className='loaction_search flex items-center justify-center ml-[10px] lg:ml-[34px] mr-[10px] lg:mr-[20px]'>
                            <h5 className='flex items-center justify-between cursor-pointer' onClick={toggleVisibility}> Location <SelectArrow /> </h5>
                            {isVisible && (
                                <ul>
                                    {
                                        general?.location?.map((obj, index) => (
                                            <li key={index}><a href={`/cars?location=${obj?.Slug}`}>{obj?.Place}</a></li>
                                        ))
                                    }
                                </ul>
                            )}
                        </div>

                        <div className='menu'>
                            <ul className='flex items-center'>
                                {
                                    data?.map((obj, index) => (
                                        <li key={index} className={`${router?.pathname == obj?.Link ? 'active' : ''}`} > <Link href={obj?.Link || '#'}>{obj?.Label}</Link></li>
                                    ))
                                }
                            </ul>
                        </div>


                    </div>


                    <div className='flex items-center justify-end'>

                        {/* <div className={`hidden md:block Top_search search-container ${isExpanded ? 'open' : ''}`}>
                    <input
                        type="text"
                        className={`search-input ${isExpanded ? 'expanded' : ''}`}
                        placeholder="Search..."
                    />
                    <button className="search-icon" onClick={handleIconClick}>
                        {isExpanded ? <CloseIcon /> : <SearchIcon />}  

                    </button> 
                </div> */}

                        <div className='  Top_search search-container'>
                            <button className="search-icon" onClick={handleOpen} >
                                <SearchIcon />
                            </button>
                        </div>




                        <a className='mobile_menu flex items-center justify-center md:hidden' onClick={handleMenuClick}>
                            {isFixed ? <MobileMenu2Icon /> : <MobileMenuIcon />} {/* Toggle between icons */}

                        </a>
                    </div>
                </div>
            </header >

            <div className={isNavFixed ? 'fixed-nav open' : 'fixed-nav'}>

                <div className='flex items-center justify-between pt-[45px] px-[20px] pb-[25px]'>

                    <a><Image src={logoIcon} alt='' className='w-[98px] xl:w-[98px] ' /></a>

                    <a className='mobile_menu flex items-center justify-center md:hidden' onClick={handleMenuClick}>
                        {isFixed ? <MobileMenu2Icon /> : <MobileMenu2Icon />} {/* Toggle between icons */}

                    </a>
                </div>

                <ul>

                    {
                        data?.map((obj, index) => (
                            <li key={index}> <Link className='flex items-center justify-between' href={obj?.Link || '#'}>{obj?.Label} <MobileMenuarrowIcon /></Link></li>
                        ))
                    }
                </ul>


                <Image src={carimg} alt='' className='max-w-[393px]  block mx-[auto] ' />

            </div>
        </>
    );
};

export default Header;