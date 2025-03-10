
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import debounce from 'lodash.debounce';

import { FiltCalenderrIcon, FiltCarIcon, FiltKmIcon, PriceIcon, PricetagIcon, PumbIcon, Search2Icon, SearchIcon } from '../Common/svgicons';


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { FilterApi } from '@/Datas/Endpoints/filters';
import { useDebounce } from '@/Common/debouncer';
import { useRouter } from 'next/router';
import { ScrollToTop } from '@/Common/scroll';

const Filter = ({
    loading,
    rsvalues,
    setrsValues,
    values,
    setValues,
    kmvalues,
    setkmValues,
    filters,
    brands,
    selectedFuels,
    handleFuelCheck,
    selectedBrands,
    handleBrandCheck,
    selectedModels,
    handleModelCheck,
    selectedTransmission,
    handleTransmissionCheck,
    handleIsFilterClear,
    models
}) => {

    const router = useRouter()

    const Price = filters?.Price
    const Year = filters?.Year
    const Kilometers = filters?.Kilometers
    const Fuel_Type = filters?.Fuel_Type
    const Transmission = filters?.Transmission


    // const [rsvalues, setrsValues] = useState([100000, 800000]); // Initial values within the range
    const RSMIN = parseInt(Price?.Minimum);
    const RSMAX = parseInt(Price?.Maximum);

    // const [values, setValues] = useState([2010, 2018]); // Initial values within the range
    const MIN = parseInt(Year?.Minimum);
    const MAX = parseInt(Year?.Maximum);


    // const [kmvalues, setkmValues] = useState([10000, 50000]); // Initial values within the range
    const KMMIN = parseInt(Kilometers?.Minimum);
    const KMMAX = parseInt(Kilometers?.Maximum);


    const [activeItem, setActiveItem] = useState(null);

    const handleAccordionClick = (uuid) => {
        setActiveItem((prev) => (prev === uuid ? null : uuid));
    };

    const [rsvalues1, setrsvalues1] = useState(rsvalues)
    const handlePrice = (newValue) => {
        setrsvalues1(newValue)
    }

    useEffect(() => {
        setrsvalues1(rsvalues)
    }, [rsvalues])


    const [values1, setValues1] = useState(values)
    const handleYear = (newValue) => {
        setValues1(newValue)
    }
    useEffect(() => {
        setValues1(values)
    }, [values])

    const [kmvalues1, setkmValues1] = useState(kmvalues)
    const handleKM = (newValue) => {
        setkmValues1(newValue)
    }
    useEffect(() => {
        setkmValues1(kmvalues)
    }, [kmvalues])

    const onFinalPriceChange = (newValue) => {

        // url search
        const url = new URL(window.location.href);
        const priceParam = `[${newValue.join(',')}]`;
        url.searchParams.set('price', priceParam);

        router.replace(url.pathname + url.search, undefined, { shallow: true });

        setrsValues(newValue)
        ScrollToTop()
    }

    const onFinalKMChange = (newValue) => {

        // url search
        const url = new URL(window.location.href);
        const priceParam = `[${newValue.join(',')}]`;
        url.searchParams.set('km', priceParam);

        router.replace(url.pathname + url.search, undefined, { shallow: true });

        setkmValues(newValue)
        ScrollToTop()
    }
    const onFinalYearChange = (newValue) => {

        // url search
        const url = new URL(window.location.href);
        const priceParam = `[${newValue.join(',')}]`;
        url.searchParams.set('year', priceParam);

        router.replace(url.pathname + url.search, undefined, { shallow: true });

        setValues(newValue)
        ScrollToTop()
    }


    const [searchBrand, setsearchBrand] = useState()
    const [brandLoading, setbrandLoading] = useState(false)
    const handleSearch = useCallback(
        // console.log(e);

        debounce((e) => {
            setbrandLoading(true)
            const value = e.target.value
            setsearchBrand(value);
        }, 300), // Adjust delay as needed
        []
    );

    const [brandsFilter, setbrandsFilter] = useState(brands)

    const fetchBrands = async (e) => {
        const response = await FilterApi.brands({ search: searchBrand })
        console.log(response);
        setbrandsFilter(response?.data?.data)
        setbrandLoading(false)
    }

    const [first, setfirst] = useState(true)
    useEffect(() => {
        if (!first) {
            fetchBrands()
        } else {
            setfirst(false)
        }
    }, [searchBrand])


    const [searchModel, setsearchModel] = useState()
    const [modelLoading, setModelLoading] = useState(false)
    const handleModelSearch = useCallback(
        // console.log(e);

        debounce((e) => {
            setModelLoading(true)
            const value = e.target.value
            setsearchModel(value);
        }, 300), // Adjust delay as needed
        []
    );

    const [modeldFilter, setModelFilter] = useState(models)

    const fetchModels = async (e) => {
        const response = await FilterApi.models({ search: searchModel })
        console.log(response);
        setModelFilter(response?.data?.data)
        setModelLoading(false)
    }

    const [modelfirst, setmodelfirst] = useState(true)
    useEffect(() => {
        if (!modelfirst) {
            fetchModels()
        } else {
            setmodelfirst(false)
        }
    }, [searchModel])



    return (

        <>

            <div className='sticky top-[100px]'>

                <div className='list-filter'>


                    <div>
                        <h4 className='flex items-center gap-[8px] mb-[25px] text-[#050B20]'> <PricetagIcon /> Price range</h4>


                        <div className='model-filter'>

                            <div style={{}}>
                                {/* Labels above the slider */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                                    <div className='flex items-center text-[#050B20]' style={{ fontWeight: 'bold' }}><PriceIcon />{`${rsvalues1[0]}`}</div>
                                    <div className='flex items-center text-[#050B20]' style={{ fontWeight: 'bold' }}><PriceIcon />{`${rsvalues1[1]}`}</div>
                                </div>

                                <Range
                                    values={rsvalues1}
                                    step={5000}
                                    min={RSMIN}
                                    max={RSMAX}
                                    onChange={handlePrice}
                                    onFinalChange={onFinalPriceChange}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '6px',
                                                width: '100%',
                                                background: getTrackBackground({
                                                    values: rsvalues1, // Ensure 'values' is used if required
                                                    colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                                                    min: RSMIN,
                                                    max: RSMAX,
                                                }),
                                                borderRadius: '0px',
                                            }}
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div className='ddd'
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '24px',
                                                width: '24px',
                                                borderRadius: '12px',
                                                backgroundColor: '#fff',
                                                border: '5px solid #D7001D'
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            <div className='flex items-center justify-between mt-[25px]'>
                                <span>Minimum</span>
                                <span>Maximum</span>
                            </div>


                        </div>




                    </div>


                    <hr />


                    <Accordion allowZeroExpanded preExpanded={[activeItem]}>
                        <AccordionItem uuid="a">

                            <AccordionItemHeading>
                                <AccordionItemButton onClick={() => handleAccordionClick("a")}>
                                    <div className='flex items-center gap-[8px]'>
                                        <FiltCarIcon />  Brands
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='model-filter'>


                                    <div className='relative filter-search'>
                                        <input onChange={handleSearch} type='text ' placeholder='Search ' />
                                        <button> <Search2Icon /> </button>
                                    </div>

                                    <span>All Brands</span>

                                    {
                                        brandLoading ?
                                            <div className='flex justify-center items-center'><span style={{ fontSize: '5px' }} className="loader"></span></div>
                                            :
                                            brandsFilter?.map((obj, index) => (
                                                <div key={index} className='checkbox'>
                                                    <label>
                                                        <input
                                                            disabled={loading}
                                                            type="checkbox"
                                                            name={obj?.Slug}
                                                            value={obj?.Name}
                                                            onChange={handleBrandCheck}
                                                            checked={selectedBrands.includes(obj?.Name?.toString())}
                                                        />
                                                        {obj?.Name}
                                                    </label>
                                                </div>
                                            ))
                                    }
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem uuid="f">

                            <AccordionItemHeading>
                                <AccordionItemButton onClick={() => handleAccordionClick("a")}>
                                    <div className='flex items-center gap-[8px]'>
                                        <FiltCarIcon />  Models
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='model-filter'>


                                    <div className='relative filter-search'>
                                        <input onChange={handleModelSearch} type='text ' placeholder='Search ' />
                                        <button> <Search2Icon /> </button>
                                    </div>

                                    <span>All Models</span>

                                    {
                                        modelLoading ?
                                            <div className='flex justify-center items-center'><span style={{ fontSize: '5px' }} className="loader"></span></div>
                                            :
                                            modeldFilter?.map((obj, index) => (
                                                <div key={index} className='checkbox'>
                                                    <label>
                                                        <input
                                                            disabled={loading}
                                                            type="checkbox"
                                                            name={obj?.Slug}
                                                            value={obj?.Name}
                                                            onChange={handleModelCheck}
                                                            checked={selectedModels.includes(obj?.Name?.toString())}
                                                        />
                                                        {obj?.Name}
                                                    </label>
                                                </div>
                                            ))
                                    }
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>


                        <AccordionItem uuid="b">
                            <AccordionItemHeading>
                                <AccordionItemButton onClick={() => handleAccordionClick("b")}>

                                    <div className='flex items-center gap-[8px]'>
                                        <FiltCalenderrIcon /> Model Year
                                    </div>

                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='model-filter'>

                                    <div style={{}}>
                                        {/* Labels above the slider */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                                            <div style={{ fontWeight: 'bold' }}>{` ${values1[0]}`}</div>
                                            <div style={{ fontWeight: 'bold' }}>{` ${values1[1]}`}</div>
                                        </div>

                                        <Range
                                            values={values1}
                                            step={1}
                                            min={MIN}
                                            max={MAX}
                                            onChange={handleYear}
                                            onFinalChange={onFinalYearChange}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '6px',
                                                        width: '100%',
                                                        background: getTrackBackground({
                                                            values: values1,
                                                            colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                                                            min: MIN,
                                                            max: MAX,
                                                        }),
                                                        borderRadius: '0px',
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div className='ddd'
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '24px',
                                                        width: '24px',
                                                        borderRadius: '12px',
                                                        backgroundColor: '#fff',
                                                        border: '5px solid #D7001D'
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className='flex items-center justify-between mt-[25px]'>
                                        <span>Minimum</span>
                                        <span>Maximum</span>
                                    </div>


                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem uuid="c">
                            <AccordionItemHeading>
                                <AccordionItemButton onClick={() => handleAccordionClick("c")}>
                                    <div className='flex items-center gap-[8px]'>
                                        <FiltKmIcon /> Kilometers Driven
                                    </div>

                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='model-filter'>

                                    <div style={{}}>
                                        {/* Labels above the slider */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                                            <div style={{ fontWeight: 'bold' }}>{` ${kmvalues1[0].toLocaleString()}`}</div>
                                            <div style={{ fontWeight: 'bold' }}>{` ${kmvalues1[1].toLocaleString()}`}</div>
                                        </div>

                                        <Range
                                            values={kmvalues1}
                                            step={1}
                                            min={KMMIN}
                                            max={KMMAX}
                                            onChange={handleKM}
                                            onFinalChange={onFinalKMChange}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '6px',
                                                        width: '100%',
                                                        background: getTrackBackground({
                                                            values: kmvalues1, // Ensure 'values' is used if required
                                                            colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                                                            min: KMMIN,
                                                            max: KMMAX,
                                                        }),
                                                        borderRadius: '0px',
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div className='ddd'
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '24px',
                                                        width: '24px',
                                                        borderRadius: '12px',
                                                        backgroundColor: '#fff',
                                                        border: '5px solid #D7001D'
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className='flex items-center justify-between mt-[25px]'>
                                        <span>Minimum</span>
                                        <span>Maximum</span>
                                    </div>


                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>


                        <AccordionItem uuid="d">
                            <AccordionItemHeading onClick={() => handleAccordionClick("d")}>
                                <AccordionItemButton>
                                    <div className='flex items-center gap-[8px]'>
                                        <PumbIcon />  Fuel Type
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='model-filter'>
                                    {
                                        Fuel_Type?.map((obj, index) => (
                                            <div key={index} className='checkbox'>
                                                <label>
                                                    <input
                                                        disabled={loading}
                                                        type="checkbox"
                                                        name={obj?.Slug}
                                                        value={obj?.Name}
                                                        onChange={handleFuelCheck}
                                                        checked={selectedFuels.includes(obj?.Name?.toString())}
                                                    />
                                                    {obj?.Name}
                                                </label>
                                            </div>
                                        ))
                                    }

                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem uuid="e">
                            <AccordionItemHeading onClick={() => handleAccordionClick("d")}>
                                <AccordionItemButton>
                                    <div className='flex items-center gap-[8px]'>
                                        <FiltCalenderrIcon /> Transmission
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <div className='model-filter'>
                                    {
                                        Transmission?.map((obj, index) => (
                                            <div key={index} className='checkbox'>
                                                <label>
                                                    <input
                                                        disabled={loading}
                                                        type="checkbox"
                                                        name={obj?.name}
                                                        value={obj?.name}
                                                        onChange={handleTransmissionCheck}
                                                        checked={selectedTransmission.includes(obj?.name)}
                                                    />
                                                    {obj?.name}
                                                </label>
                                            </div>
                                        ))
                                    }

                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>


                    </Accordion>









                </div>

            </div>

        </>


    );
};

export default Filter;