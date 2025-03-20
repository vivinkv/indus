import { Params } from '@/Common/params'
import Contact_Form from '@/components/Contact/Contact_Form'
import ContactDetails from '@/components/Contact/ContactDetails'
import Base from '@/components/layout/Base'
import { HomeApi } from '@/Datas/Endpoints/Home'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import { StaticPageApi } from '@/Datas/Endpoints/staticPage'
import React from 'react'
import parse from 'html-react-parser';

function Contact({ menu, data }) {

    const parsedContent = parse(typeof data?.Content === 'string'
        ? data?.Content
        : '');

    return (
        <Base menu={menu} meta={data?.SEO} bottomDescription={data?.Bottom_Description} >
            <section className='container px-5'>
                <section className=' pt-[100px] md:pt-[140px] pb-[35px]'>
                    <h2 className='text-[26px] text-[#000]  '>
                        {data?.Page_Heading}
                    </h2>
                    <div className=' mt-5 '>
                        {parsedContent}
                    </div>
                </section>
            </section>
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
        const data = await StaticPageApi.page({ slug: context?.params?.slug })

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
