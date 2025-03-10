import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import benefits2 from '../../public/bene2.png'
import benefits3 from '../../public/bene3.png'
import nofound from '../../public/nofound.png'

import { BenefitarrowIcon, BenefitIcon, BenefitoffIcon, BredIcon, CloseIcon, DividerIcon, FilterIcon, LoadIcon, PricetagIcon, SliderarrowIcon, SortIcon } from '../Common/svgicons';
import Productlist from '../Common/productlist';
import Filter from './filter';
import FilterModal from './filtermodal';
import OfferComponent from './offerComponent';
import truncate from "html-truncate";
import { getParams, Params } from '@/Common/params';
import { FilterApi } from '@/Datas/Endpoints/filters';
import { HTMLParse } from '@/Common/htmlParser';
import { ImageUrl } from '@/Common/image-url';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ScrollToTop } from '@/Common/scroll';
import Skeleton from '../Common/skeleton';
import { CarsApi } from '@/Datas/Endpoints/Cars';
import EnquiryModal from '../Common/modal';
import RemoveStyleAttributes from '@/Common/removeStyleAttribute';



const List = ({
    filters,
    brands,
    data,
    carList,
    isCombination,
    combinationBrand,
    combinationModel,
    models
}) => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true, // Enable center mode
        centerPadding: '50px',
        nextArrow: (
            <button>
                <SliderarrowIcon />
            </button>
        ), // Custom next arrow
        prevArrow: (
            <button>
                <SliderarrowIcon />
            </button>
        ), // Custom previous arrow
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true, // Enable center mode
                    centerPadding: '50px'
                }
            }
        ]
    }

    const buysettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true, // Enable center mode
        centerPadding: '50px',
        nextArrow: (
            <button>
                <SliderarrowIcon />
            </button>
        ), // Custom next arrow
        prevArrow: (
            <button>
                <SliderarrowIcon />
            </button>
        ), // Custom previous arrow
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true, // Enable center mode
                    centerPadding: '20px'
                }
            }
        ]
    }

    const router = useRouter()

    const queryString = router.asPath.split('?')[1]
    const params = new URLSearchParams(queryString)

    const limit = 12

    const parseFilterDigits = string => {
        if (!string) {
            return null
        }
        const parsedPrice = string.replace(/\[|\]/g, '').split(',').map(Number)
        return parsedPrice
    }

    const parseFilterStrings = string => {
        if (!string) return null

        try {
            // Replace single quotes with double quotes and parse JSON
            return JSON.parse(string.replace(/'/g, '"'));
        } catch (error) {
            // If parsing fails, assume it's a comma-separated string and split it
            return string.includes(",") ? string.split(",") : [string];
        }
    };

    const price = params.get('price');
    const brand = params.get('brand');
    const model = params.get('model');
    const fuel = params.get('fuel');
    const km = params.get('km');
    const year = params.get('year');
    const transmission = params.get('transmission');
    const pagePage = params.get('page');

    const [showFull, setShowFull] = useState(false);

    const description = data?.Description || data?.Top_Description || "";

    const handleShowMore = () => {
        setShowFull(!showFull)
        ScrollToTop()
    }

    const truncatedHTML = truncate(description, 300, { ellipsis: ' ...' });
    //  `<span className="text-[red] cursor-pointer"> ...See More</span>`
    const [open, setOpen] = useState(false)
    const [filterSecEnable, setfilterSecEnable] = useState()
    const handleOpen = (from) => {
        setfilterSecEnable(from)
        setOpen(true)
    }

    const handleModalClose = () => {
        setOpen(false)
        setfilterSecEnable()
    }


    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const handleCallBackModalOpen = () => {
        setEnquiryOpen(true);
    }



    // const [data, setData] = useState()

    const [firstLoading, setfirstLoading] = useState(true)

    const Price = filters?.Price
    const Year = filters?.Year
    const Kilometers = filters?.Kilometers

    // const [rsvalues, setrsValues] = useState([100000, 800000]); // Initial values within the range
    const RSMIN = parseInt(Price?.Minimum);
    const RSMAX = parseInt(Price?.Maximum);

    // const [values, setValues] = useState([2010, 2018]); // Initial values within the range
    const MIN = parseInt(Year?.Minimum);
    const MAX = parseInt(Year?.Maximum);


    // const [kmvalues, setkmValues] = useState([10000, 50000]); // Initial values within the range
    const KMMIN = parseInt(Kilometers?.Minimum);
    const KMMAX = parseInt(Kilometers?.Maximum);

    const [rsvalues, setrsValues] = useState(
        parseFilterDigits(price) || [RSMIN, RSMAX]
    )
    const [values, setValues] = useState(
        parseFilterDigits(year) || [MIN, MAX]
    )
    const [kmvalues, setkmValues] = useState(
        parseFilterDigits(km) || [KMMIN, KMMAX]
    )

    const [selectedFuels, setSelectedFuels] = useState(
        parseFilterStrings(fuel) || []
    )
    const handleFuelCheck = event => {
        const { value, checked } = event.target
        ScrollToTop()

        setSelectedFuels(prev => {
            const updatedFuels = checked
                ? [...prev, value]
                : prev.filter(item => item !== value)

            // url search
            const url = new URL(window.location.href)

            if (updatedFuels.length > 0) {
                url.searchParams.set('fuel', `${updatedFuels.join(',')}`)
            } else {
                url.searchParams.delete('fuel')
            }

            router.replace(url.pathname + url.search, undefined, { shallow: true })

            return updatedFuels
        })
    }
    const [selectedBrands, setSelectedBrands] = useState(
        parseFilterStrings(brand) || (combinationBrand ? [combinationBrand] : [])
    )
    const handleBrandCheck = event => {
        const { value, checked } = event.target
        setSelectedBrands(prev => {
            const updatedFuels = checked
                ? [...prev, value]
                : prev.filter(item => item !== value)

            // url search
            const url = new URL(window.location.href)
            if (updatedFuels.length > 0) {
                url.searchParams.set('brand', `${updatedFuels.join(',')}`)
            } else {
                url.searchParams.delete('brand')
            }

            router.replace(url.pathname + url.search, undefined, { shallow: true })

            return updatedFuels
        })
        ScrollToTop()
    }

    const [selectedModels, setSelectedModels] = useState(
        parseFilterStrings(model) || (combinationModel ? [combinationModel] : [])
    )
    const handleModelCheck = event => {
        const { value, checked } = event.target
        setSelectedModels(prev => {
            const updatedFuels = checked
                ? [...prev, value]
                : prev.filter(item => item !== value)

            // url search
            const url = new URL(window.location.href)
            if (updatedFuels.length > 0) {
                url.searchParams.set('model', `${updatedFuels.join(',')}`)
            } else {
                url.searchParams.delete('model')
            }

            router.replace(url.pathname + url.search, undefined, { shallow: true })

            return updatedFuels
        })
        ScrollToTop()
    }

    const handleBrandDeselect = item => {
        setSelectedBrands(prevBrands => {
            const updatedBrands = prevBrands.filter(brand => brand !== item)
            // Update the URL when removing a brand
            const url = new URL(window.location.href)
            if (updatedBrands.length > 0) {
                url.searchParams.set('brand', `${updatedBrands?.join(',')}`)
            } else {
                url.searchParams.delete('brand') // Remove brand param if empty
            }

            router.replace(url.pathname + url.search, undefined, { shallow: true })

            return updatedBrands
        })
    }

    const [selectedTransmission, setSelectedTransmission] = useState(
        parseFilterStrings(transmission) || []
    )
    const handleTransmissionCheck = event => {
        const { value, checked } = event.target
        setSelectedTransmission(prev => {
            const updatedFuels = checked
                ? [...prev, value]
                : prev.filter(item => item !== value)

            // url search
            const url = new URL(window.location.href)
            if (updatedFuels.length > 0) {
                url.searchParams.set('transmission', `${updatedFuels.join(',')}`)
            } else {
                url.searchParams.delete('transmission')
            }

            router.replace(url.pathname + url.search, undefined, { shallow: true })

            return updatedFuels
        })
        ScrollToTop()
    }

    const handleLoadMore = () => {
        if (loading || loadMoreLoading) {
            return
        }
        setloadMoreLoading(true)
        const toPage = page + 1
        sessionStorage.setItem('page', toPage)
        setpage(toPage)
        fetchCars(toPage, limit, true)
    }

    const [isFilterCleared, setisFilterCleared] = useState(false)
    const handleIsFilterClear = () => {
        clearAllFilters()
        setTimeout(() => {
            setisFilterCleared(true)
        }, 500)
        setTimeout(() => {
            setisFilterCleared(false)
        }, 1000)
    }

    const clearAllFilters = () => {
        const location = getParams('location')
        if (router?.pathname == '/cars') {
            router.replace(
                location ? `/cars?location=${location}` : `/cars`,
                undefined,
                { shallow: true }
            )
        } else if (router?.pathname == '/buy/[slug]') {
            router.replace(
                `/buy/${router?.query?.slug}`,
                undefined,
                { shallow: true }
            )
        }

        setSelectedFuels([])
        setSelectedBrands(combinationBrand ? [combinationBrand] : []);
        setSelectedModels(combinationModel ? [combinationModel] : []);
        setSelectedTransmission([])
        setrsValues([RSMIN, RSMAX])
        setValues([MIN, MAX])
        setkmValues([KMMIN, KMMAX])
    }

    const [loadMoreLoading, setloadMoreLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [page, setpage] = useState(1)
    const [carData, setCarData] = useState(carList?.data)
    const [metaData, setmetaData] = useState(carList?.meta)
    const fetchCars = async (pageNumber, toLimit, loadMore) => {
        if (isCombination && firstLoading) {
            setfirstLoading(false)
            return;
        }
        const loadPage = pageNumber
        setpage(parseInt(pageNumber))
        if (!loadMore) {
            setLoading(true)
        }
        const location = getParams('location')

        let action
        if (isCombination) {
            action = () => CarsApi.combinationList(data?.Slug);
        } else {
            action = FilterApi.locationFilters
        }
        const response = await action({
            location,
            fuel: `[${selectedFuels?.join(',')}]`,
            brand: `[${selectedBrands?.join(',')}]`,
            model: `[${selectedModels?.join(',')}]`,
            transmission: `[${selectedTransmission?.join(',')}]`,
            year: `[${values[0]},${values[1]}]`,
            kilometers: `[${kmvalues[0]},${kmvalues[1]}]`,
            price: `[${rsvalues[0]},${rsvalues[1]}]`,
            page: loadPage,
            pageSize: toLimit || limit
        })
        if (pageNumber > 1) {
            setCarData(prevData =>
                (prevData || []).concat(response?.data?.data || [])
            )
        } else {
            setCarData(response?.data?.data)
        }
        setmetaData(response?.data?.meta)
        setLoading(false)
        setloadMoreLoading(false)
        setfirstLoading(false)
    }

    const apiCall = () => {
        // const sessioPage=parseInt(sessionStorage.getItem('page')) || 1
        // const toLimit = firstLoading ? sessioPage * limit : limit
        fetchCars(1)
    }
    useEffect(() => {
        if (window.innerWidth > 767 && !isFilterCleared) {
            apiCall()
        }
    }, [
        rsvalues,
        selectedBrands,
        values,
        kmvalues,
        selectedFuels,
        selectedTransmission,
        selectedModels
    ])
    useEffect(() => {
        if (window.innerWidth < 768 && isFilterCleared) {
            apiCall()
        }
    }, [isFilterCleared])
    const [mobileFilterKey, setmobileFilterKey] = useState(false)
    useEffect(() => {
        if (window.innerWidth < 768) {
            apiCall()
        }
    }, [mobileFilterKey])

    return (
        <>

            <EnquiryModal open={enquiryOpen} setOpen={setEnquiryOpen} />

            <FilterModal
                setmobileFilterKey={setmobileFilterKey}
                open={open}
                filterSecEnable={filterSecEnable}
                handleModalClose={handleModalClose}
                filters={filters}
                brands={brands}
                selectedFuels={selectedFuels}
                selectedBrands={selectedBrands}
                selectedTransmission={selectedTransmission}
                handleFuelCheck={handleFuelCheck}
                handleBrandCheck={handleBrandCheck}
                handleTransmissionCheck={handleTransmissionCheck}
                rsvalues={rsvalues}
                setrsValues={setrsValues}
                values={values}
                setValues={setValues}
                kmvalues={kmvalues}
                setkmValues={setkmValues}
                clearAllFilters={clearAllFilters}
                handleModelCheck={handleModelCheck}
                selectedModels={selectedModels}
                models={models}
            />

            <section className='list-sec mt-[100px] md:mt-[140px] pb-[35px]'>
                <div className='container relative'>

                    <div className='md:flex justify-between gap-[20px]'>

                        <div className='hidden md:block'>

                            <Filter
                                filters={filters}
                                brands={brands}
                                selectedFuels={selectedFuels}
                                selectedBrands={selectedBrands}
                                selectedTransmission={selectedTransmission}
                                handleFuelCheck={handleFuelCheck}
                                handleBrandCheck={handleBrandCheck}
                                handleTransmissionCheck={handleTransmissionCheck}
                                rsvalues={rsvalues}
                                setrsValues={setrsValues}
                                values={values}
                                setValues={setValues}
                                kmvalues={kmvalues}
                                setkmValues={setkmValues}
                                loading={loading}
                                handleIsFilterClear={handleIsFilterClear}
                                handleModelCheck={handleModelCheck}
                                selectedModels={selectedModels}
                                models={models}
                            />

                        </div>
                        <div className='list-cntr w-full'>

                            <div className='flex flex-col'>

                                <div className='list-cntr-data text-[#000] mb-[40px] order-2 md:order-1'>
                                    {
                                        data?.Title &&
                                        <h4>{data?.Title}</h4>
                                    }
                                    {
                                        description &&
                                            showFull ? HTMLParse(RemoveStyleAttributes(description)) : HTMLParse(RemoveStyleAttributes(truncatedHTML))
                                    }
                                    {
                                        description.length > 300 && (
                                            <a className='cursor-pointer' onClick={handleShowMore}>
                                                {showFull ? "See Less" : "See More"}
                                            </a>
                                        )}
                                </div>


                                <ul className='breadcrumb order-1 md:order-2 mb-[32px] md:mb-[0]'>
                                    <li>Home</li>
                                    <li>
                                        {' '}
                                        <BredIcon />{' '}
                                    </li>
                                    <li>{data?.Page_Heading || 'Used cars'}</li>
                                    {data?.Place && (
                                        <li>
                                            <BredIcon />
                                        </li>
                                    )}
                                    {data?.Place && <li>Used cars In Kochi </li>}
                                </ul>
                            </div>

                            <div className='hidden md:grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[30px] mb-[30px]'>
                                {data?.Offer_Section?.map((obj, index) => (
                                    <OfferComponent
                                        key={index}
                                        data={ImageUrl(obj?.Image?.url)}
                                    />
                                ))}
                            </div>

                            <div className='md:hidden w-full list_ads '>
                                <Slider {...settings}>
                                    {data?.Offer_Section?.map((obj, index) => (
                                        <div key={index}>
                                            <OfferComponent
                                                key={index}
                                                data={ImageUrl(obj?.Image?.url)}
                                                divClass={'mr-[15px]'}
                                                imageclass={'w-[100%]'}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            <ul className='car-filter-btn-cntr  md:hidden'>
                                <li onClick={handleOpen}>
                                    {' '}
                                    <div className='flex items-center gap-[13px]'>
                                        <FilterIcon /> Filter
                                    </div>
                                </li>
                                <li>
                                    {' '}
                                    <div className='flex items-center gap-[13px]'>
                                        {' '}
                                        <SortIcon /> Sort{' '}
                                    </div>{' '}
                                </li>
                                <li onClick={() => handleOpen('price')}>Price Range </li>
                                <li onClick={() => handleOpen('brand')}>Brand </li>
                            </ul>

                            <div className='flex mb-[25px] mt-3 justify-between'>
                                <div className='flex flex-wrap gap-2'>
                                    {selectedBrands?.map((brand, index) => (
                                        <div
                                            key={index}
                                            className='px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium flex items-center'
                                        >
                                            {brand}

                                            <CloseIcon onClick={() => handleBrandDeselect(brand)} />
                                        </div>
                                    ))}
                                </div>

                                {
                                    carData?.length > 0 &&
                                    <div>
                                        <button onClick={handleIsFilterClear} className='text-black'>
                                            {' '}
                                            Clear
                                        </button>
                                    </div>
                                }
                            </div>

                            {loading ? (
                                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[30px]'>
                                    {[...Array(6)].map((_, index) => (
                                        <Skeleton key={index} width={'100%'} height={'300px'} />
                                    ))}
                                </div>
                            ) : (
                                <div className='car-list-cntr'>
                                    <div className='car-list-cntr-title'>
                                        <b>{metaData?.pagination?.total}</b> Used cars
                                        {data?.Place ? ` in ${data.Place}` : ''}
                                    </div>
                                    {carData?.length == 0 && (
                                        <div className='no_car_found flex flex-col items-center'>
                                            <Image src={nofound} width={500} height={400} />

                                            <p>No match found for your search</p>

                                            <a onClick={handleIsFilterClear} className='btn cursor-pointer'>Reset Filter</a>
                                        </div>
                                    )}
                                    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[30px]'>
                                        {carData?.length > 0 &&
                                            carData?.map((data, index) => (
                                                <div key={index}>
                                                    <Productlist data={data} />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {metaData?.pagination?.pageCount > 1 &&
                                metaData?.pagination?.page !=
                                metaData?.pagination?.pageCount && (
                                    <div className='flex items-center justify-center mt-[40px] cursor-pointer'>
                                        <a
                                            onClick={handleLoadMore}
                                            className='loadmore-btn flex items-center justify-center gap-[13px]'
                                        >
                                            {loadMoreLoading ? (
                                                <div className='flex justify-center items-center'>
                                                    <span className='loader'></span>
                                                </div>
                                            ) : (
                                                <>
                                                    {' '}
                                                    <LoadIcon /> Load More
                                                </>
                                            )}
                                        </a>
                                    </div>
                                )}


                            {
                                data?.Exclusive_Section?.map((obj, index) => (
                                    <div className=' mt-[45px] mb-[45px]'>
                                        <Image className='cursor-pointer' onClick={handleCallBackModalOpen} src={ImageUrl(obj?.Image?.url)} alt='' width={976} height={237} />
                                    </div>
                                ))
                            }

                            <div className='hidden md:grid grid-cols-2 gap-[17px] mt-[42px] '>
                                {data?.Assurance_Section && (
                                    <div>
                                        <div className='benefits'>
                                            <Image
                                                src={benefits2}
                                                alt=''
                                                className='absolute right-[-121px] top-[-30px]'
                                            />
                                            <div className='flex items-center justify-between mb-[20px]'>
                                                <h5>{data?.Assurance_Section?.Title}</h5>
                                                <Image
                                                    src={ImageUrl(data?.Assurance_Section?.Icon?.url)}
                                                    alt=''
                                                    width={19}
                                                    height={19}
                                                />
                                            </div>
                                            {data?.Assurance_Section?.Points?.map((obj, index) => (
                                                <p key={index} className='flex items-center gap-[5px]'>
                                                    <BenefitIcon /> {obj?.Title}
                                                </p>
                                            ))}
                                            <div className='flex items-end justify-end z-[500]'>
                                                <Link href={data?.Assurance_Section?.URL || '#'}>
                                                    <BenefitarrowIcon />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {data?.Benefit_Section && (
                                    <div>
                                        <div className='benefits benefits2'>
                                            <Image
                                                src={benefits3}
                                                alt=''
                                                className='absolute right-[0] top-[0]'
                                            />
                                            <div className='flex items-center justify-between mb-[20px]'>
                                                <h5 className='flex items-center gap-[5px]'>
                                                    {' '}
                                                    <BenefitoffIcon /> {data?.Benefit_Section?.Title}
                                                </h5>
                                                <span>Grab the Deals</span>
                                            </div>
                                            {data?.Benefit_Section?.Points?.map((obj, index) => (
                                                <p key={index} className='flex items-center gap-[5px]'>
                                                    <BenefitIcon /> {obj?.Title}
                                                </p>
                                            ))}

                                            <div className='flex items-end justify-end'>
                                                <Link href={data?.Benefit_Section?.URL || '#'}>
                                                    <BenefitarrowIcon />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='md:hidden w-full list_ads  mt-[42px]'>
                                <Slider {...buysettings}>
                                    <div>
                                        <div className='benefits mr-[12px]'>
                                            <Image
                                                src={benefits2}
                                                alt=''
                                                className='absolute right-[-121px] top-[-30px]'
                                            />
                                            <div className='flex items-center justify-between mb-[20px]'>
                                                <h5>{data?.Assurance_Section?.Title}</h5>
                                                <Image
                                                    src={ImageUrl(data?.Assurance_Section?.Icon?.url)}
                                                    alt=''
                                                    width={19}
                                                    height={19}
                                                />
                                            </div>

                                            {
                                                data?.Assurance_Section?.Points?.map((obj, index) => (
                                                    <p key={index} className='flex items-center gap-[5px]'><BenefitIcon /> {obj?.Title}</p>
                                                ))
                                            }

                                            <div className='flex items-end justify-end'>
                                                <Link href={data?.Assurance_Section?.URL || '#'}><BenefitarrowIcon /></Link>
                                            </div>

                                        </div>
                                    </div>

                                    <div>
                                        <div className='benefits benefits2 mr-[12px]'>
                                            <Image
                                                src={benefits3}
                                                alt=''
                                                className='absolute right-[0] top-[0]'
                                            />
                                            <div className='flex items-center justify-between mb-[20px]'>
                                                <h5 className='flex items-center gap-[5px]'>
                                                    {' '}
                                                    <BenefitoffIcon /> {data?.Benefit_Section?.Title}
                                                </h5>
                                                <span>Grab the Deals</span>
                                            </div>
                                            {data?.Benefit_Section?.Points?.map((obj, index) => (
                                                <p key={index} className='flex items-center gap-[5px]'>
                                                    <BenefitIcon /> {obj?.Title}
                                                </p>
                                            ))}

                                            <div className='flex items-end justify-end'>
                                                <Link href={data?.Benefit_Section?.URL || '#'}>
                                                    <BenefitarrowIcon />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='pb-[45px]'>
                <DividerIcon />
            </div>
        </>
    )
}

export default List
