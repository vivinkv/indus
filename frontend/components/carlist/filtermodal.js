

import Image from 'next/image';
import { ClosemodalIcon, InrIcon, ModalbackIcon, PriceIcon, PricetagIcon, SearchIcon } from "../Common/svgicons";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import debounce from 'lodash.debounce';


import React, { useState, useEffect, useCallback } from 'react';


import { Range, Direction, getTrackBackground } from 'react-range';
import { FilterApi } from '@/Datas/Endpoints/filters';


const FilterModal = ({
  setmobileFilterKey,
  open,
  handleModalClose,
  filterSecEnable,
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
  clearAllFilters,
  models
}) => {

  const [selectedTab, setSelectedTab] = useState(0);

  const Price = filters?.Price
  const Year = filters?.Year
  const Kilometers = filters?.Kilometers
  const Fuel_Type = filters?.Fuel_Type
  const Transmission = filters?.Transmission

  const RSMIN = parseInt(Price?.Minimum);
  const RSMAX = parseInt(Price?.Maximum);

  // const [values, setValues] = useState([2010, 2018]); // Initial values within the range
  const MIN = parseInt(Year?.Minimum);
  const MAX = parseInt(Year?.Maximum);


  // const [kmvalues, setkmValues] = useState([10000, 50000]); // Initial values within the range
  const KMMIN = parseInt(Kilometers?.Minimum);
  const KMMAX = parseInt(Kilometers?.Maximum);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    handleModalClose()
  }

  const handleFilterApply = () => {
    setmobileFilterKey(prev => !prev)
    closeModal()
  }

  const handleClearFilter = () => {
    clearAllFilters()
    // closeModal()
    setTimeout(() => {
      setmobileFilterKey(prev => !prev)
    }, 500);
  }

  useEffect(() => {
    if (open) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
    if (filterSecEnable) {
      setSelectedTab(filterSecEnable == 'brand' ? 1 : 0)
    }
  }, [open])

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


  // model


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
      {/* <button className="open-modal-btn" onClick={openModal}>
        Open Modal
      </button> */}

      {isOpen && (
        <div onClick={closeModal} className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-content filter-modal">


            <div className="flex items-center justify-between filter-modal-head">
              <h4 onClick={closeModal} className="flex items-center gap-[5px]"> <ModalbackIcon /> Filter</h4>
              <a onClick={handleClearFilter} className="clear-btn">Clear all</a>
            </div>

            <hr />


            <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)} className={'flex  filter-modal-tab'}>
              <TabList className={' react-tabs__tab-list'} >
                <Tab> <div className='flex items-center'>  Price Range </div></Tab>
                <Tab> <div className='flex items-center'>  Brands & Model </div></Tab>
                <Tab> <div className='flex items-center'>   Model Year </div></Tab>
                <Tab> <div className='flex items-center'> Km Driven </div></Tab>
                <Tab> <div className='flex items-center'> Fuel Type </div></Tab>
                <Tab> <div className='flex items-center'> Transmission </div></Tab>
                {/* <Tab> <div className='flex items-center'> Body Type </div></Tab> */}
              </TabList>

              <div className='w-[67%]'>

                <TabPanel>

                  <div className=" relative mob-filter">



                    <h4 className='flex items-center gap-[8px] mb-[25px]'> <PricetagIcon /> Price range</h4>
                    <div className='flex items-center justify-between mob-price-range'>
                      <div className='flex items-center'> <PriceIcon /> {RSMIN}</div>
                      <div> - </div>
                      <div className='flex items-center'> <PriceIcon /> {RSMAX}</div>
                    </div>

                    <div className='relative'>

                      <div className='minmax'>
                        <span>Maximum</span>
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <span>Minimum</span>
                      </div>




                      <div className='pt-[15px]'>
                        <div className='h-[300px] w-[30px] relative mx-auto '>
                          <Range
                            step={5000}
                            min={RSMIN}
                            max={RSMAX}
                            direction={Direction.Down}
                            values={rsvalues}
                            onChange={(rsvalues) => setrsValues(rsvalues)}
                            renderTrack={({ props, children }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  position: 'absolute',
                                  width: '10px', // Width of the vertical track
                                  height: '100%', // Full height of the parent container
                                  background: getTrackBackground({
                                    values: rsvalues, // Ensure 'values' is used if required
                                    colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                                    min: RSMIN,
                                    max: RSMAX,
                                    direction: Direction.Down,
                                  }),

                                  borderRadius: '5px',
                                  top: '0',
                                  left: '50%',
                                  transform: 'translateX(-50%)', // Center the track horizontally
                                }}
                              >
                                {children}
                              </div>
                            )}


                            renderThumb={({ props, isDragged, index }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  position: 'absolute',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: "5px solid #D7001D",
                                  backgroundColor: isDragged ? '#fff' : '#fff',
                                  transform: 'translate(-50%, -50%)', // Center the thumb
                                }}
                              >
                                {/* Tooltip */}
                                <div className='flex items-center gap-[2px]'
                                  style={{
                                    position: "absolute",
                                    right: "-130px",
                                    top: "-5px", // Adjust position to place tooltip above thumb
                                    backgroundColor: "#DA2129",
                                    color: "#fff",
                                    fontFamily: "Inter",
                                    fontSize: "10px",
                                    padding: "5px 10px",
                                    borderRadius: "5px 5px 5px 0",
                                    whiteSpace: "nowrap",
                                    transform: "translateX(-50%)",
                                  }}
                                > <InrIcon />
                                  {rsvalues[index].toLocaleString()} {/* Tooltip content */}
                                </div>
                              </div>
                            )}
                          />


                        </div>
                      </div>
                    </div>


                  </div>



                </TabPanel>





                <TabPanel>
                  <div className='mob-filter'>
                    <h4>Brand</h4>
                    <div className='mob-fil-search'>
                      <input onChange={handleSearch} type='text' placeholder='Search ' />
                      <button>
                        <SearchIcon />
                      </button>
                    </div>
                    {
                      brandLoading ?
                        'loading'
                        :
                        brandsFilter?.map((obj, index) => (
                          <div className='checkbox'>
                            <label className='flex items-center gap-[10px]'>
                              <input
                                type="checkbox"
                                name={obj?.Slug + '-mob'}
                                value={obj?.id}
                                onChange={handleBrandCheck}
                                checked={selectedBrands.includes(obj?.id?.toString())}
                              />
                              {obj?.Name}
                            </label>
                          </div>
                        ))
                    }
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className='mob-filter'>
                    <h4>Model</h4>
                    <div className='mob-fil-search'>
                      <input onChange={handleSearch} type='text' placeholder='Search ' />
                      <button>
                        <SearchIcon />
                      </button>
                    </div>
                    {
                      modelLoading ?
                        'loading'
                        :
                        modeldFilter?.map((obj, index) => (
                          <div className='checkbox'>
                            <label className='flex items-center gap-[10px]'>
                              <input
                                type="checkbox"
                                name={obj?.Slug + '-mob'}
                                value={obj?.id}
                                onChange={handleModelCheck}
                                checked={selectedModels.includes(obj?.id?.toString())}
                              />
                              {obj?.Name}
                            </label>
                          </div>
                        ))
                    }
                  </div>
                </TabPanel>









                <TabPanel>
                  <div className=" relative mob-filter">



                    <h4 className='flex items-center gap-[8px] mb-[25px]'>     Model Year  </h4>
                    <div className='flex items-center justify-between mob-price-range'>
                      <div className='flex items-center'>  {MIN}</div>
                      <div> - </div>
                      <div className='flex items-center'>  {MAX}</div>
                    </div>

                    <div className='relative'>

                      <div className='minmax'>
                        <span>Maximum</span>
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <span>Minimum</span>
                      </div>




                      <div className='pt-[15px]'>
                        <div className='h-[300px] w-[30px] relative mx-auto '>
                          <Range
                            step={1}
                            min={MIN}
                            max={MAX}
                            direction={Direction.Down}
                            values={values}
                            onChange={(values) => setValues(values)}
                            renderTrack={({ props, children }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  position: 'absolute',
                                  width: '10px', // Width of the vertical track
                                  height: '100%', // Full height of the parent container
                                  background: getTrackBackground({
                                    values, // Ensure 'values' is used if required
                                    colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                                    min: MIN,
                                    max: MAX,
                                    direction: Direction.Down,
                                  }),

                                  borderRadius: '5px',
                                  top: '0',
                                  left: '50%',
                                  transform: 'translateX(-50%)', // Center the track horizontally
                                }}
                              >
                                {children}
                              </div>
                            )}


                            renderThumb={({ props, isDragged, index }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  position: 'absolute',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: "5px solid #D7001D",
                                  backgroundColor: isDragged ? '#fff' : '#fff',
                                  transform: 'translate(-50%, -50%)', // Center the thumb
                                }}
                              >
                                {/* Tooltip */}
                                <div className='flex items-center gap-[2px]'
                                  style={{
                                    position: "absolute",
                                    right: "-130px",
                                    top: "-5px", // Adjust position to place tooltip above thumb
                                    backgroundColor: "#DA2129",
                                    color: "#fff",
                                    fontFamily: "Inter",
                                    fontSize: "10px",
                                    padding: "5px 10px",
                                    borderRadius: "5px 5px 5px 0",
                                    whiteSpace: "nowrap",
                                    transform: "translateX(-50%)",
                                  }}
                                >
                                  {values[index]} {/* Tooltip content */}
                                </div>
                              </div>
                            )}
                          />


                        </div>
                      </div>
                    </div>


                  </div>
                </TabPanel>

                <TabPanel>
                  <div className=" relative mob-filter">



                    <h4 className='flex items-center gap-[8px] mb-[25px]'>   Kilometers Driven </h4>
                    <div className='flex items-center justify-between mob-price-range'>
                      <div className='flex items-center'> {kmvalues[0]}</div>
                      <div> - </div>
                      <div className='flex items-center'>  {kmvalues[1]}</div>
                    </div>

                    <div className='relative'>

                      <div className='minmax'>
                        <span>Maximum</span>
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                        <span>Minimum</span>
                      </div>




                      <div className='pt-[15px]'>
                        <div className='h-[300px] w-[30px] relative mx-auto '>
                          <Range
                            step={1000}
                            min={KMMIN}
                            max={KMMAX}
                            direction={Direction.Down}
                            values={kmvalues}
                            onChange={(kmvalues) => setkmValues(kmvalues)}
                            renderTrack={({ props, children }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  position: 'absolute',
                                  width: '10px', // Width of the vertical track
                                  height: '100%', // Full height of the parent container
                                  background: getTrackBackground({
                                    values: kmvalues, // Ensure 'values' is used if required
                                    colors: ['#F2F2F2', '#D7001D', '#F2F2F2'],
                                    min: KMMIN,
                                    max: KMMAX,
                                    direction: Direction.Down,
                                  }),

                                  borderRadius: '5px',
                                  top: '0',
                                  left: '50%',
                                  transform: 'translateX(-50%)', // Center the track horizontally
                                }}
                              >
                                {children}
                              </div>
                            )}


                            renderThumb={({ props, isDragged, index }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  position: 'absolute',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  border: "5px solid #D7001D",
                                  backgroundColor: isDragged ? '#fff' : '#fff',
                                  transform: 'translate(-50%, -50%)', // Center the thumb
                                }}
                              >
                                {/* Tooltip */}
                                <div className='flex items-center gap-[2px]'
                                  style={{
                                    position: "absolute",
                                    right: "-130px",
                                    top: "-5px", // Adjust position to place tooltip above thumb
                                    backgroundColor: "#DA2129",
                                    color: "#fff",
                                    fontFamily: "Inter",
                                    fontSize: "10px",
                                    padding: "5px 10px",
                                    borderRadius: "5px 5px 5px 0",
                                    whiteSpace: "nowrap",
                                    transform: "translateX(-50%)",
                                  }}
                                >
                                  {kmvalues[index].toLocaleString()} {/* Tooltip content */}
                                </div>
                              </div>
                            )}
                          />


                        </div>
                      </div>
                    </div>


                  </div>
                </TabPanel>


                <TabPanel>
                  <div className='mob-filter'>
                    <h4>Fuel Type </h4>

                    {
                      Fuel_Type?.map((obj, index) => (
                        <div key={index} className='checkbox'>
                          <label>
                            <input
                              type="checkbox"
                              name={obj?.Slug + '-mob'}
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
                </TabPanel>


                <TabPanel>

                  <div className='mob-filter'>
                    <h4>Transmission</h4>

                    {
                      Transmission?.map((obj, index) => (
                        <div key={index} className='checkbox'>
                          <label>
                            <input
                              type="checkbox"
                              name={obj?.name + '-mob'}
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

                </TabPanel>

              </div>
            </Tabs>

            <div className="flex items-center justify-center">
              <a onClick={handleFilterApply} className="apply-btn"> APPLY </a>
            </div>












          </div >
        </div >
      )}
    </>
  );
};

export default FilterModal;
