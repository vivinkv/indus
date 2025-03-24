import React, { useEffect, useState } from 'react'

import Select from 'react-select';
import { Contact_Call_Icon_Red, Contact_Mail_Icon_Red } from '../Common/svgicons';
import Dealer_Item from './Dealer_Item';
import { HomeApi } from '@/Datas/Endpoints/Home';
import LoadingSpinner from '../Common/loading-spinner';
import { DealerApi } from '@/Datas/Endpoints/Dealers';
import noDealers from '../../public/no_result_found.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DealerLoading from '../Common/dealerLoading';


const customStyles = {
    control: (provided, state) => ({
        ...provided,
        height: '50px',
        border: '1px solid #7070703d',
        borderRadius: '3px',
        borderWidth: '0px 0px 1px 0px',
        boxShadow: '0px 0px 0px 0px',
        outline: 'none',
        '&:hover': {
            borderBottom: '1px solid #707070',
            boxShadow: '0px 0px 0px 0px',
        },
    }),
    indicatorSeparator: () => ({
        width: '0px', // Removes the separator line between the input and the dropdown arrow
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'black', // Change the color of the dropdown indicator (arrow)
        svg: {
            path: {
                fill: 'black',
            },
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#ffffff', // Set background color for the dropdown menu
        borderRadius: '5px',        // Remove border radius for the dropdown
        marginTop: '5px',           // Remove top margin
        border: '1px solid #707070', // Add border around the menu
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#e30b12d9' : '#fff', // Change background for selected option
        color: state.isSelected ? '#fff' : '#333', // Change text color for selected and unselected options
        '&:hover': {
            backgroundColor: '#e9ecef', // Background color when hovering over an option
        },
    }),
};

const Dealers = ({ data, outlets, locations }) => {

    const router = useRouter()

    const queryString = router.asPath.split('?')[1]
    const params = new URLSearchParams(queryString)

    const [dealers, setDealers] = useState(outlets)

    const location = params.get('location');

    const options = locations?.map((obj) => ({
        label: obj?.Place,
        value: obj?.Slug
    }));

    const [tableLoading, settableLoading] = useState(false)
    const handleLocationChange = (item) => {
        if (item) {
            setSelectedOption(item)
        } else {
            setlocationCancelLoading(true)
            const url = new URL(window.location.href)
            url.searchParams.delete('location')
            router.replace(url.pathname + url.search, undefined, { shallow: true })
        }
    }


    const [selectedOption, setSelectedOption] = useState(null);

    const [buttonLoading, setButtonLoading] = useState(false)
    const handleLocate = () => {
        setButtonLoading(true)

        const url = new URL(window.location.href)

        if (selectedOption) {
            url.searchParams.set('location', selectedOption?.value)
        } else {
            url.searchParams.delete('location')
        }
        router.replace(url.pathname + url.search, undefined, { shallow: true })
    }

    const [locationCancelLoading, setlocationCancelLoading] = useState(false)
    const fetchDealers = async (value) => {
        let location_value = ''
        if (value != "no_location") {
            location_value = value || selectedOption?.value
        }
        const response = await DealerApi.list({ limit: 50, location: location_value })
        setDealers(response?.data)
        setButtonLoading(false)
        setlocationCancelLoading(false)
    }

    useEffect(() => {
        if (location) {
            const findLocation = options?.find((pre => pre?.value == location))
            fetchDealers(location)
            setSelectedOption(findLocation)
        } else {

            fetchDealers('no_location')
        }
    }, [location])


    return (
        <>

            <div className=' flex flex-col items-center '>

                <h2 className=" text-[#000000] text-[28px] font-medium leading-[33.131px] text-center">
                    {data?.Title}
                </h2>
                <p className=" mt-5 sm:w-[85%] lg:w-[60%] text-[#050b20] text-[16px] font-normal leading-[20.131px] text-center font-inter">
                    {/* Buy or Sell used cars in Kerala with Indus Used Cars. Locate your nearest used car showroom in Kerala and find the desired model car at the best price. We help you grab the best used car deal that suits your budget and requirement. */}
                    {data?.Description}
                </p>


                <div className=' mt-7 w-full flex flex-col items-center '>

                    <div className='  gap-2 flex flex-col md:flex-row items-center '>
                        <h3 className=' text-[#000] '>
                            {data?.Short_Title}
                        </h3>
                        <span className=' text-[#f04045d9] '>
                            ({dealers?.data?.length} Dealers Found)
                        </span>
                    </div>

                    <div className='mt-5 w-full md:w-[50%] lg:w-[32%] gap-3 flex flex-col items-center'>
                        <div className=' w-full '>
                            <Select
                                key={selectedOption || location}
                                className='w-full text-black'
                                styles={customStyles}
                                isClearable
                                defaultValue={selectedOption}
                                onChange={handleLocationChange}
                                options={options}
                            />
                        </div>

                        <button disabled={buttonLoading} onClick={handleLocate} className=' py-2 px-10 w-[200px] font-semibold rounded-sm bg-[#ed1c24] hover:bg-[#882529]'>
                            {
                                buttonLoading ?
                                    <LoadingSpinner heigth={'24px'} width={'24px'} color={'white'} />
                                    :
                                    'LOCATE NOW'
                            }

                        </button>

                    </div>
                </div>
            </div>

            <div className='py-10 gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {locationCancelLoading ? (
                    Array.from({ length: 8 }).map((_, index) => <DealerLoading key={index} />)
                ) : (
                    dealers?.data?.length > 0 && (
                        dealers?.data?.map((obj, index) => <Dealer_Item key={index} data={obj} />)
                    )
                )}
            </div>
            {
                dealers?.data?.length == 0 &&
                <div className='flex items-center justify-center flex-col'>
                    <p className='text-center text-[#ed1c24] font-bold'> No delears found for your location!</p>
                    <Image width={614} height={302} src={noDealers} />
                </div>
            }


        </>
    )
}

export default Dealers
