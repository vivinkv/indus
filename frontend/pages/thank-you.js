import React from 'react';
import Image from "next/image";
import Base from "@/components/layout/Base";
import thanks from '../public/thanks.png';
import Link from 'next/link';
import { MenuApi } from '@/Datas/Endpoints/Menu';
import { ResponseApi } from '@/Datas/Endpoints/Response';
import { Params } from '@/Common/params';
import { ImageUrl } from '@/Common/image-url';



export default function Thanks({ data, general, menu }) {

  const Thankyou = data?.data[0]

  return (
    <Base hideFooter={true} general={general} menu={menu} data={Thankyou}>

      <section className="page404 flex items-center justify-center h-[80vh] md:h-[100vh] min-h-[650px]">
        <div className="container text-center">

          <Image src={ImageUrl(Thankyou?.Image?.url)} alt='404' width={617} height={369} className='mx-auto w-[300] ms:w-[617]' />
          <h4> {Thankyou?.Message} </h4>
          <Link href={Thankyou?.Button?.URL || '#'}>{Thankyou?.Button?.Label}</Link>

        </div>
      </section>


    </Base>
  );
}


export async function getStaticProps() {
  try {
    const menu = await MenuApi.menu(Params)
    const general = await MenuApi.general(Params)
    const data = await ResponseApi.response(Params)
    return {
      props: {
        menu: menu?.data?.data,
        general: general?.data?.data,
        data: data?.data
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error ', error);

    return {
      props: {
        header: null, // or handle the error in a way that makes sense for your application
      },
      revalidate: 10,
      Notfound:true
    };
  }
}