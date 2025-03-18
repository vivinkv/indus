import { Params } from '@/Common/params'
import Base from '@/components/layout/Base'
import { HomeApi } from '@/Datas/Endpoints/Home'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import React from 'react'

function About({menu, data}) {
    return (
        <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description} >
            About
        </Base>
    )
}

export default About

export async function getStaticProps() {
    try {
        const menu = await MenuApi.menu(Params)
        const data = await HomeApi.index()

        return {
            notFound: true,
            props: {
                menu: menu?.data?.data,
                data: data?.data,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('Error fetching header car detail:', error);

        return {
            props: {
                header: null, // or handle the error in a way that makes sense for your application
            },
            revalidate: 10,
            notFound: true
        };
    }
}
