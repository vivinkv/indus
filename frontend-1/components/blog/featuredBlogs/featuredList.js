import Image from 'next/image'
import React from 'react'
import testImage from  "@/public/banner.png"
function FeaturedList({ data, onBlogClick, blog }) {
    const handleIndex = (index) => {
        onBlogClick(index)
    }
  return (
    <div className="w-[50%] flex flex-col gap-[20px]  mt-[30px]">
        {
            data && data.map((data, index) => (
        <div key={index} onClick={() => handleIndex(index)} className={`cursor-pointer flex w-full justify-between border-[1px] border-stone-200 p-[20px] rounded-[10px] ${blog === index ? "shadow-lg translate-x-2"  : "shadow-sm"} transition-transform ease-in-out duration-300`}>
            <div  className="flex  gap-[20px]">

            <Image src={data?.image} alt="" width={300} height={300} className="w-[220px] h-[150px]  object-cover rounded-[6px]"/>
            <div>
                <p className="text-[14px] text-stone-400">October 23, 2023</p>
                <h4 className="mt-[10px] text-[28px] text-black font-semibold">{data?.title}</h4>
            </div>
            </div>
            {
                blog === index &&
                <>
                <div className="h-[15px] w-[15px] flex items-center justify-center rounded-full border border-orange-400"> 
                    <div className="w-[10px] h-[10px] bg-orange-500 rounded-full"></div>
                </div>
                </>
            }
        </div>
            ))
        }
      
    </div>
  )
}

export default FeaturedList
