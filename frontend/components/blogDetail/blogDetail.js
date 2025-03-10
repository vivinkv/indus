import Image from "next/image";
import React from "react";
import testImage from "@/public/banner.png";
import moment from "moment";
import { ImageUrl } from "@/Common/image-url";
function BlogDetail({ detail }) {
  
  return (

    <div className="lg:mx-[162px] lg:px-[15px]">
      <p className="text-[14px] text-stone-400 text-end mb-[10px]">{moment(detail?.createdAt).format("DD MMMM YYYY")}</p>

      <Image
        src={ImageUrl(detail?.Banner_Image?.url)}
        alt=""
        width={1420}
        height={550}
        className="w-full object-cover h-[450px] lg:h-[450px] rounded-[8px]"
      />
      <h2 className=" text-[28px] lg:text-[2.5rem] text-[#212529] ">
        {detail?.Title}
      </h2>
      <div className="mt-[50px]">
        <div className="lg:text-[16px] font-opSans leading-[35px]  text-[14px] text-[#717171] detail-block-text" dangerouslySetInnerHTML={{ __html: detail?.Content }} />
      </div>
    </div>

  );
}

export default BlogDetail;
