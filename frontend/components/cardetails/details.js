import React, { useRef, useState } from "react";
import Image from "next/image";
import car1 from "../../public/cardet1.png";
import car2 from "../../public/cardet2.png";
import car3 from "../../public/cardet3.png";
import light from "../../public/light.gif";
import {
  BreadarrowIcon,
  DividerIcon,
  DotIcon,
  Find7Icon,
  HomeIcon,
  Inspect7Icon,
  Location3Icon,
  MeterIcon,
  Price2Icon,
  PumbIcon,
  SliderarrowIcon,
  TransitionIcon,
  User2Icon,
  ViewarrowIcon,
} from "../Common/svgicons";
import moment from "moment";
import Slider from "react-slick";
import Productlist from "../Common/productlist";
import EnquiryModal from "../Common/modal";
import Link from "next/link";

const Details = ({ detail }) => {


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const mainSlider = useRef(null);

  // Main slider settings
  const mainSettings = {
    arrows: false,
    dots: false,
    infinite: detail?.similarCars.length >= 4 ? true : false,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    swipe: false,
  };

  // Thumbnail slider settings
  const thumbSettings = {
    slidesToShow: 4, // Number of visible thumbnails
    slidesToScroll: 1,
    focusOnSelect: true, // Focus on thumbnail when clicked
    infinite: detail?.similarCars.length >= 4 ? true : false,
    arrows: false,
    swipeToSlide: true, // Allow swipe navigation for thumbnails
    centerMode: false, // Set to true for center-aligned thumbnails
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "50px",
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      imgSrc: detail?.Image_URL?.Back_Image,
      thumbSrc: detail?.Image_URL?.Back_Image,
    },
    {
      id: 2,
      imgSrc: detail?.Image_URL?.Front_Image,
      thumbSrc: detail?.Image_URL?.Front_Image,
    },
    {
      id: 3,
      imgSrc: detail?.Image_URL?.LeftSide_Image,
      thumbSrc: detail?.Image_URL?.LeftSide_Image,
    },
    {
      id: 4,
      imgSrc: detail?.Image_URL?.RightSide_Image,
      thumbSrc: detail?.Image_URL?.RightSide_Image,
    },
  ];

  // Function to navigate the main slider to a selected slide
  const goToSlide = (index) => {
    mainSlider.current.slickGoTo(index);
  };

  const settings = {
    dots: false,
    arrows: detail?.similarCars.length >= 3 ? true : false,
    infinite: detail?.similarCars.length >= 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "100px",
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Enable center mode
          centerPadding: "30px",
        },
      },
    ],
  };
  return (
    <>
      <EnquiryModal open={open} setOpen={setOpen} documentId={detail?.documentId}  />

      <section className="detail-sec">
        <div className="container">
          <ul className="breadcrumb mb-[16px]">
            <li>Home</li>
            <li>
              <BreadarrowIcon />
            </li>
            {
              detail?.Outlet &&
              <li>Used cars in {detail?.Outlet?.Name}</li>
            }
            <li>
              <BreadarrowIcon />
            </li>
            <li>{detail?.Brand?.Name} Cars</li>
            <li>
              <BreadarrowIcon />
            </li>
            <li> Used {detail?.Name} </li>
          </ul>

          <div className="md:flex gap-[25px]">
            <div className="w-full  md:w-7/12 lg:w-8/12">
              <div className="car_slider mb-[45px]">
                <div className=" md:hidden">
                  <h3>Discover Every Detail Before You Decide!</h3>
                </div>

                <Slider
                  {...mainSettings}
                  ref={mainSlider}
                  className="large-slider"
                >
                  {slides.map((slide) => (
                    <div key={slide.id}>
                      <Image
                        width={750}
                        height={375}
                        src={slide.imgSrc}
                        alt={`Slide ${slide.id}`}
                      />
                    </div>
                  ))}
                </Slider>

                <Slider {...thumbSettings} className="thumbnail-slider">
                  {slides.map((slide, index) => (
                    <div key={slide.id} onClick={() => goToSlide(index)}>
                      <div className="pl-[12px] pr-[12px]">
                        <Image
                          width={130}
                          height={90}
                          src={slide.thumbSrc}
                          alt={`Thumbnail ${slide.id}`}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="block  md:hidden car_details mb-[45px]  ">
                {detail?.Brand?.Name && <span>{detail?.Brand?.Name}</span>}
                <h3>{detail?.Name}</h3>
                <ul className="flex items-center gap-[10px]">
                  {detail?.Kilometers && (
                    <li className="flex items-center gap-[10px]">
                      <MeterIcon /> {detail?.Kilometers} km
                    </li>
                  )}{" "}
                  <li className="flex items-center gap-[10px]">
                    <DotIcon /> <PumbIcon /> {detail?.Fuel_Type?.Name}
                  </li>
                  {detail?.Transmission_Type && (
                    <li className="flex items-center gap-[10px]">
                      <DotIcon /> <TransitionIcon /> {detail?.Transmission_Type}
                    </li>
                  )}{" "}
                </ul>
                {detail?.Location?.Outlets && detail?.Location?.Outlets.length > 0 && <div className="flex items-center gap-[10px] mt-[10px]">
                  <p className="flex items-center gap-[8px]">
                    <Location3Icon /> {detail?.Location?.Place},
                  </p>
                  {
                    detail?.Location?.Outlets.map((data, index) => (
                      <p key={index}>
                        {data?.Name}
                        {index !== detail?.Location?.Outlets.length - 1 && ","}
                      </p>
                    ))}
                </div>}
                <p className="flex items-center gap-[8px]">
                  <User2Icon />
                  {detail?.Owner_Type}
                </p>

                {
                  detail?.Home_Test_Drive &&
                  <p className="flex items-center gap-[8px]">
                    <HomeIcon /> Home Test Drive:{detail?.Home_Test_Drive}
                  </p>
                }

                {detail?.PSP && (
                  <h4 className="flex items-center gap-[5px]">
                    <Price2Icon />
                    {detail?.PSP >= 100000
                      ? `${(detail?.PSP / 100000).toFixed(2)} Lakh`
                      : `${detail?.PSP}`
                      // : `${(detail?.PSP / 1000).toFixed(2)} Thousand`
                    }
                  </h4>
                )}
                <h5>Fixed on road price : {detail?.PSP}</h5>

                {detail?.content?.Section?.Content && (
                  <div className="flex items-center car_details-info ">
                    {" "}
                    <Image src={light} alt="" width={28} height={28} />
                    {detail?.content?.Section?.Content}
                  </div>
                )}
              </div>

              <div className="cat_det_data">
                <h4>Car Overview</h4>
                <div className="cat_det_data_cntr  ">
                  <div className="grid grid-cols-2 md:grid-cols-3 md:mt-[26px] md:mb-[26px]  gap-y-[15px] md:gap-[26px] ">
                    {detail?.Year_Of_Month && (
                      <div className="w-full md:max-w-[130px]">
                        <span>Make Year</span>
                        <h5>{detail?.Year_Of_Month}</h5>
                        <hr />
                      </div>
                    )}

                    {detail?.Registration_Year && (
                      <div className=" w-full md:max-w-[130px]">
                        <span> Registration Year </span>
                        <h5>
                          {moment(detail?.Registration_Year).format("MMM-YYYY")}
                        </h5>
                        <hr />
                      </div>
                    )}

                    {detail?.Fuel_Type && (
                      <div className="w-full md:max-w-[130px]">
                        <span> Fuel Type</span>
                        <h5> {detail?.Fuel_Type?.Name} </h5>
                        <hr />
                      </div>
                    )}

                    {detail?.Kilometers && (
                      <div className="w-full md:max-w-[130px]">
                        <span>Km driven </span>
                        <h5> {detail?.Kilometers} km</h5>
                        <hr />
                      </div>
                    )}

                    {detail?.Transmission_Type && (
                      <div className="w-full md:max-w-[130px]">
                        <span>Transmission </span>
                        <h5>{detail?.Transmission_Type} </h5>
                        <hr />
                      </div>
                    )}

                    {detail?.Owner_Type && (
                      <div className="w-full md:max-w-[130px]">
                        <span>No. of Owner </span>
                        <h5>{detail?.Owner_Type} </h5>
                        <hr />
                      </div>
                    )}

                    <div className="w-full md:max-w-[130px]">
                      <span> Insurance Validity </span>
                      <h5>
                        {detail?.Insurance_Validity ? moment(detail?.Insurance_Validity).format("MMM-YYYY") : 'NA'}
                      </h5>
                      <hr />
                    </div>

                    {detail?.Insurance_Type && (
                      <div className="w-full md:max-w-[130px]">
                        <span>Insurance Type </span>
                        <h5>{detail?.Insurance_Type} </h5>
                        <hr />
                      </div>
                    )}

                    {detail?.Outlet?.Name && <div className="w-full md:max-w-[130px]">
                      <span>Car Location </span>
                      <h5>{detail?.Outlet?.Name} </h5>
                      <hr />
                    </div>}
                  </div>
                </div>
              </div>

              {detail?.Inspection_Report.length > 0 && <div className="cat_det_data">
                <h4>Inspection Report </h4>
                <div className="cat_det_data_cntr2 ">
                  <div className="grid md:grid-cols-2 ">
                    <div className="border-r border-[#F6F6F6] py-[10px] md:py-[0px]">
                      <div className="px-[20px]   md:py-[30px]">
                        {

                          detail?.Inspection_Report.slice(0, 3).map(
                            (data, index) => (
                              <ul key={index}>
                                { }
                                <li className="flex items-center justify-between">
                                  <div className="flex items-center gap-[15px]">
                                    <span className="flex items-center justify-center">
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.Icon?.url}`}
                                        width={300}
                                        height={300}
                                        alt=""
                                        className="w-[18px] h-[18px]"
                                      />
                                    </span>
                                    <p>{data?.Title}</p>
                                  </div>
                                  {data?.Report_Status === "Pass" ? (
                                    <Inspect7Icon />
                                  ) : (
                                    <p className="text-red-600 text-[21px] font-bold">
                                      X
                                    </p>
                                  )}
                                </li>
                                {/* 
                                            <li className='flex items-center justify-between'>
                                                <div className='flex items-center gap-[15px]'>
                                                <span className='flex items-center justify-center'><Inspect2Icon/></span>
                                                <p>Engine & Peripherals</p>
                                                </div>
                                                <Inspect7Icon/>
                                            </li>

                                            <li className='flex items-center justify-between'>
                                                <div className='flex items-center gap-[15px]'>
                                                <span className='flex items-center justify-center'><Inspect3Icon/></span>
                                                <p>Engine & Peripherals</p>
                                                </div>
                                                <Inspect7Icon/>
                                            </li> */}
                              </ul>
                            )
                          )}
                      </div>
                    </div>

                    <div>
                      <div className="px-[20px] md:py-[30px]">
                        {detail?.Inspection_Report &&
                          detail?.Inspection_Report.length > 0 &&
                          detail?.Inspection_Report.slice(3, 6).map(
                            (data, index) => (
                              <ul key={index}>
                                <li className="flex items-center justify-between">
                                  <div className="flex items-center gap-[15px]">
                                    <span className="flex items-center justify-center">
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.Icon?.url}`}
                                        width={300}
                                        height={300}
                                        alt=""
                                        className="w-[18px] h-[18px]"
                                      />
                                    </span>
                                    <p>{data?.Title}</p>
                                  </div>
                                  {data?.Report_Status === "Pass" ? (
                                    <Inspect7Icon />
                                  ) : (
                                    <p className="text-red-600 text-[21px] font-bold">
                                      X
                                    </p>
                                  )}
                                </li>
                                {/* 
                                            <li className='flex items-center justify-between'>
                                                <div className='flex items-center gap-[15px]'>
                                                <span className='flex items-center justify-center'><Inspect2Icon/></span>
                                                <p>Engine & Peripherals</p>
                                                </div>
                                                <Inspect7Icon/>
                                            </li>

                                            <li className='flex items-center justify-between'>
                                                <div className='flex items-center gap-[15px]'>
                                                <span className='flex items-center justify-center'><Inspect3Icon/></span>
                                                <p>Engine & Peripherals</p>
                                                </div>
                                                <Inspect7Icon/>
                                            </li> */}
                              </ul>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

              <div className="block  md:hidden car_details sticky bottom-0 ">
                <a className="btn cursor-pointer" onClick={handleOpen}>
                  {detail?.content?.Button?.Label}
                </a>
              </div>
            </div>

            <div className="w-full md:w-5/12 lg:w-4/12">
              <div className=" hidden md:block car_details sticky top-[150px]">
                <span>{detail?.Brand?.Name}</span>
                <h3>{detail?.Name}</h3>
                <ul className="flex items-center gap-[10px]">
                  {detail?.Kilometers && <li className="flex items-center gap-[10px]">
                    <MeterIcon /> {detail?.Kilometers} km
                  </li>}
                  {detail?.Fuel_Type?.Name && <li className="flex items-center gap-[10px]">
                    <DotIcon /> <PumbIcon /> {detail?.Fuel_Type?.Name}
                  </li>}
                  {detail?.Transmission_Type && <li className="flex items-center gap-[10px]">
                    <DotIcon /> <TransitionIcon /> {detail?.Transmission_Type}
                  </li>}
                </ul>
                {detail?.Location?.Outlets && detail?.Location?.Outlets.length > 0 && <div className="flex items-center gap-[10px] mt-[10px]">
                  <p className="flex items-center gap-[8px]">
                    <Location3Icon /> {detail?.Location?.Place},
                  </p>
                  {
                    detail?.Location?.Outlets.map((data, index) => (
                      <p key={index}>
                        {data?.Name}
                        {index !== detail?.Location?.Outlets.length - 1 && ","}
                      </p>
                    ))}
                </div>}
                {
                  detail?.Owner_Type &&
                  <p className="flex items-center gap-[8px]">
                    <User2Icon />
                    {detail?.Owner_Type}
                  </p>
                }

                {
                  detail?.Home_Test_Drive &&
                  <p className="flex items-center gap-[8px]">
                    <HomeIcon /> Home Test Drive: {detail?.Home_Test_Drive}
                  </p>
                }

                {detail?.PSP && (
                  <h4 className="flex items-center gap-[5px]">
                    <Price2Icon /> {detail?.PSP >= 100000
                      ? `${(detail?.PSP / 100000).toFixed(2)} Lakh`
                      : `${detail?.PSP}`
                      // : `${(detail?.PSP / 1000).toFixed(2)} Thousand`
                    }
                  </h4>
                )}
                <h5>Fixed on road price</h5>
                <a className="btn cursor-pointer" onClick={handleOpen}>
                  {detail?.content?.Button?.Label}
                </a>

                {detail?.content?.Section?.Content && (
                  <div className="flex items-center car_details-info ">
                    <Image src={light} alt="" width={28} height={28} />
                    {detail?.content?.Section?.Content}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="my-[20px] md:my-[50px]">
            <DividerIcon />
          </div>

          {detail?.similarCars && detail?.similarCars.length > 0 && <div className="my-[30px] md:my-[50px] similar-cars">
            <div className="similar-title flex items-center justify-between mb-[30px]">
              <h4> Similar cars </h4>
              <Link href="/cars" className="flex items-center">
                View All <ViewarrowIcon />{" "}
              </Link>
            </div>

            <div className="featured-slider">
              <Slider {...settings}>
                {
                  detail?.similarCars.map((data, index) => (
                    <div key={index}>

                      <Productlist
                        data={data}
                      />
                    </div>
                  ))
                }

              </Slider>
            </div>
          </div>}

          {detail?.Find_More && detail.Find_More.length > 0 && <div className="my-[50px] ">
            <div className="similar-title flex items-center justify-between mb-[30px]">
              <h4> Find More </h4>
            </div>

            <div className="md:flex items-center justify-between md:mb-[45px]">
              {
                detail?.Find_More?.map((data, index) => (
                  <Link key={index} href={`/buy/${data?.Combination?.Slug}`} className="flex items-center gap-[15px] justify-between find-list w-full md:max-w-[332px]">

                    <div className="flex items-center gap-[15px]">
                      <span className="flex items-center justify-center">
                        <Image src={`${process.env.NEXT_PUBLIC_DOMAIN}${data?.Icon?.url}`} width={300} height={300} alt="" className="w-[18px] h-[18px]" />

                      </span>
                      <div>
                        <h4>{data?.Title}</h4>
                        <h5>{data?.Content}</h5>
                      </div>
                    </div>
                    <Find7Icon />
                  </Link>
                ))
              }

              {/* <div className="flex items-center gap-[15px] justify-between find-list w-full md:max-w-[332px]">
                <div className="flex items-center gap-[15px]">
                  <span>
                    <Find1Icon />{" "}
                  </span>
                  <div>
                    <h4>By Brand</h4>
                    <h5>Used Mauthi Cars In Kochi</h5>
                  </div>
                </div>
                <Find7Icon />
              </div>

              <div className="flex items-center gap-[15px] justify-between find-list w-full md:max-w-[332px]">
                <div className="flex items-center gap-[15px]">
                  <span>
                    <Find1Icon />{" "}
                  </span>
                  <div>
                    <h4>By Brand</h4>
                    <h5>Used Mauthi Cars In Kochi</h5>
                  </div>
                </div>
                <Find7Icon />
              </div> */}
            </div>
          </div>}
        </div>
      </section>
    </>
  );
};

export default Details;
