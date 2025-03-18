import { Params } from '@/Common/params'
import Contact_Form from '@/components/Contact/Contact_Form'
import ContactDetails from '@/components/Contact/ContactDetails'
import Base from '@/components/layout/Base'
import { ContactApi } from '@/Datas/Endpoints/Contact'
import { HomeApi } from '@/Datas/Endpoints/Home'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import React from 'react'

function Contact({ menu, data }) {
    return (
        <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description} >
            <div className='container px-5 '>
                <div className=' pt-[100px] md:pt-[200px] py-10 gap-5 flex flex-col md:flex-row'>
                    <ContactDetails general={menu} data={data?.data} />
                    <Contact_Form />
                </div>
            </div>
        </Base>
    )
}

export default Contact

export async function getStaticProps() {
    try {
        const menu = await MenuApi.menu(Params)
        const data = await ContactApi.page(Params)

        return {
            props: {
                menu: menu?.data?.data,
                data: data?.data,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('Error fetching contact:', error);

        return {
            props: {
                header: null, // or handle the error in a way that makes sense for your application
            },
            revalidate: 10,
            notFound: true
        };
    }
}
