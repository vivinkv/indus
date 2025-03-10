import React, { useCallback, useEffect, useState } from "react";

import Image from 'next/image';
import { AddressarrowIcon, Call2Icon, CallIcon, ClosemodalIcon, Location2Icon, SearcharrowIcon, SearchIcon, UserIcon } from "./svgicons";

import debounce from 'lodash.debounce';
import { MenuApi } from "@/Datas/Endpoints/Menu";
import Link from "next/link";

const SearchModal = ({ open, setOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [open])

    const [keyword, setkeyword] = useState()
    const handleSearch = useCallback(
        debounce((e) => {
            const value = e.target.value
            setkeyword(value);
        }, 500),
        []
    );

    const [loading, setloading] = useState(true)
    const [data, setdata] = useState()
    const fetchData = async () => {
        setloading(true)
        const response = await MenuApi.search({ query: keyword })
        setdata(response?.data?.data)
        // console.log(response);
        setloading(false)

    }

    useEffect(() => {
        if (open) {
            fetchData()
        }
    }, [open, keyword])



    return (
        <>
            {/* <button className="open-modal-btn" onClick={openModal}>
        Open Modal
      </button> */}

            {isOpen && (
                <div onClick={closeModal} className="modal-overlay">
                    <div onClick={(e) => e.stopPropagation()} className="modal-content search-modal">

                        <span className="close-modal-btn" onClick={closeModal}> <ClosemodalIcon /> </span>


                        <div className="search-cntr">
                            <input onChange={handleSearch} type="text" placeholder="Search" />
                            <button><SearchIcon /></button>
                        </div>

                        {
                            loading ?
                                'loading'
                                :
                                data?.length > 0 ?
                                    <ul>
                                        {
                                            data?.map((obj, index) => (
                                                <Link href={`/cars/${obj?.Slug}`}> <li key={index} className="flex items-center justify-between"> {obj?.Name} {`${obj?.Outlet ? ' ,' + obj?.Outlet?.Name : ''}`} <SearcharrowIcon /></li></Link>
                                            ))
                                        }
                                    </ul>
                                    :

                                    <div className="py-[50px] h-[400px] items-center flex justify-center">
                                        <h4>No Result Found</h4>

                                    </div>
                        }






















                    </div>
                </div>
            )}
        </>
    );
};

export default SearchModal;
