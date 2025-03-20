import { Params } from '@/Common/params'
import Contact_Form from '@/components/Contact/Contact_Form'
import ContactDetails from '@/components/Contact/ContactDetails'
import Dealer_Details from '@/components/Dealer_Details_Page/Dealer_Details'
import Base from '@/components/layout/Base'
import { DealerApi } from '@/Datas/Endpoints/Dealers'
import { HomeApi } from '@/Datas/Endpoints/Home'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import React from 'react'

function Contact({ menu, data }) {

    return (
        <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description} >
            <div className='container px-5 '>
                <div className=' pt-[100px] md:pt-[200px] py-10 '>
                    <Dealer_Details data={data?.data} />
                </div>
            </div>
        </Base>
    )
}

export default Contact

export const getStaticPaths = async () => {
    const list = [
        {
            slug: "slug",
        },
    ];
    const paths =
        list?.map((item) => ({
            params: { slug: item?.slug },
        })) || [];

    return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
    try {
        const menu = await MenuApi.menu(Params)
        const data = await DealerApi.detail({ slug: context?.params?.slug })

        return {
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
