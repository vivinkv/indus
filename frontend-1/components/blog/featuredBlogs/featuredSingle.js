import Image from "next/image";
import React from "react";
import testImage from "@/public/banner.png";
function FeaturedSingle({ blog }) {
  return (
    <div className="w-[40%]">
      <h4 className="text-[28px] font-semibold text-black">Popular Articles</h4>
      <div className="mt-[25px] w-full">
        <Image
          src={blog?.image}
          width={300}
          height={300}
          alt=""
          className="w-full object-cover h-[400px] rounded-[8px]"
        />
      </div>
      <p className="mt-[20px] text-[14px] text-stone-400">October 23, 2023</p>
      <h4 className="text-[28px]  text-black mt-[10px]">{blog?.title}</h4>
      <p className="mt-[10px] text-[18px] text-stone-400 leading-[30px]">
    {blog?.description}
      </p>
    </div>
  );
}

export default FeaturedSingle;
