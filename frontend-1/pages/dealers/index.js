import { Params } from '@/Common/params'
import Dealers from '@/components/Dealers_Page/Dealers'
import Base from '@/components/layout/Base'
import { DealerApi } from '@/Datas/Endpoints/Dealers'
import { HomeApi } from '@/Datas/Endpoints/Home'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import React from 'react'

function Outlet({ menu, data, dealers }) {
    return (
        <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description} >
            <div className='container px-5 '>
                <div className=' pt-[100px] md:pt-[200px] py-10 '>
                    <Dealers data={data?.data} outlets={dealers} locations={menu?.location} />
                </div>
            </div>
        </Base>
    )
}

export default Outlet

export async function getStaticProps() {
    try {
        const menu = await MenuApi.menu(Params)
        const data = await DealerApi.page(Params)
        const dealers = await DealerApi.list({ limit: 50 })

        return {
            props: {
                menu: menu?.data?.data,
                data: data?.data,
                dealers: dealers?.data,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('Error fetching header car dealers:', error);

        return {
            props: {
                header: null, // or handle the error in a way that makes sense for your application
            },
            revalidate: 10,
            notFound: true
        };
    }
}
