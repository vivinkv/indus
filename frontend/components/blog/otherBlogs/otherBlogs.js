import Image from "next/image";
import React, { useEffect, useState } from "react";
import testImage from "@/public/banner.png";
import moment from "moment";
import Link from "next/link";
import { ImageUrl } from "@/Common/image-url";
import { BlogApi } from "@/Datas/Endpoints/blog";
function OtherBlogs({ data, sectionHeading }) {

  const [first, setfirst] = useState(true)
  const [blogs, setBlogs] = useState(data?.data)
  const [meta, setMeta] = useState(data?.meta)
  const [loading, setloading] = useState(false)

  const [page, setPage] = useState(1)
  const handleLoadMore = async () => {
    setPage(page + 1)
  }
  const fetchBlogs = async () => {
    setloading(true)
    const response = await BlogApi.getBlogs({ start: page, limit: 9 })
    setBlogs(prev => prev.concat(response?.data?.data || []));
    setMeta(response?.data?.meta)
    setloading(false)
  }

  useEffect(() => {
    if (first) {
      setfirst(false)
      return
    }
    fetchBlogs()
  }, [page])


  return (
    <div className="w-full my-[40px]  lg:my-[100px] ">
      <h4 className="text-[28px] font-semibold text-black">{sectionHeading}</h4>
      <div className="mt-[25px] w-full grid grid-cols-1 md:grid-cols-2 gap-y-[50px] gap-x-[30px] lg:grid-cols-3">
        {
          blogs?.map((data, index) => (
            <Link href={`/blog/${data?.Slug}`} key={index} className=" flex flex-col ">
              <Image
                src={ImageUrl(data?.Featured_Image?.url)}
                width={300}
                height={300}
                alt=""
                className="w-full object-cover h-[150px] md:h-[200px] lg:h-[300px]  rounded-[8px]"
              />
              <p className="text-[14px] mt-[5px] text-stone-400">{moment(data?.publishedAt).format("DD MMMM YYYY")}</p>
              <h4 className="text-[24px]  text-black mt-[10px] leading-[28px]">
                {data?.Title}
              </h4>

              <p className=" text-[18px] leading-[35px] text-stone-400 mt-[10px]">
                {data?.Short_Description}
              </p>

            </Link>
          ))}
      </div>
      {
        meta?.pagination?.lastPage != meta?.pagination?.current_page &&
        <div className='flex items-center justify-center mt-[40px] cursor-pointer'>
          <a
            onClick={handleLoadMore}
            className='loadmore-btn flex items-center justify-center gap-[13px]'
          >
            {loading ? (
              <div className='flex justify-center items-center'>
                <span className='loader'></span>
              </div>
            ) : (
              <>
                {' '}
                Load More
              </>
            )}
          </a>
        </div>
      }
    </div>
  );
}

export default OtherBlogs;
