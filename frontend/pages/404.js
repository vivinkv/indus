import React from 'react';
import Image from "next/image";
import Base from "@/components/layout/Base";
import page404 from '../public/404.png';
import Link from 'next/link';
import { Params } from '@/Common/params';
import { MenuApi } from '@/Datas/Endpoints/Menu';
import { ResponseApi } from '@/Datas/Endpoints/Response';
import { ImageUrl } from '@/Common/image-url';



export default function Page404({ general, menu, data }) {

  const Notfound = data?.data[1]

  return (
    <Base hideFooter={true} general={general} menu={menu} data={Notfound} >

      <section className="page404 flex items-center justify-center h-[80vh] md:h-[100vh] min-h-[650px]">
        <div className="container text-center">

          <Image src={ImageUrl(Notfound?.Image?.url)} alt='404' width={451} height={277} className='mx-auto w-[300] ms:w-[617]' />
          <p>{Notfound?.Message}</p>
          <Link href={Notfound?.Button?.URL || '#'}>{Notfound?.Button?.Label}</Link>

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
        data: null, // or handle the error in a way that makes sense for your application
      },
      revalidate: 10,
      Notfound:true
    };
  }
}
