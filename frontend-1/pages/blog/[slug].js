import { Params } from '@/Common/params'
import Base from '@/components/layout/Base'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import React from 'react'
import testImage from "@/public/banner.png"
import car1 from "@/public/cardet1.png"
import car2 from "@/public/car3.png"
import Cta from '@/components/home/cta'
import { widgetsApi } from '@/Datas/Endpoints/Widgets'
import { HomeApi } from '@/Datas/Endpoints/Home'
import BlogDetail from '@/components/blogDetail/blogDetail'
import { BlogApi } from '@/Datas/Endpoints/blog'

function BlogDetailPage({ data, menu, cta }) {
    
    return (

        <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description}  >
            <section className="list-sec mt-[100px] md:mt-[180px] pb-[35px]">
                <div className="container relative flex flex-col gap-[20px] items-center ">
                    <BlogDetail detail={data?.data} />
                    {/* <OtherBlogs data={otherBlogs} sectionHeading={"Related Blogs"}/> */}
                    {/* <Brands data={widget?.data?.Brands} /> */}
                </div>
            </section>
            <Cta data={cta?.data?.CTA} />
        </Base>

    )
}

export default BlogDetailPage

export async function getStaticPaths() {
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
export const getStaticProps = async ({ params }) => {
    try {
        const data = await BlogApi.getBlogBySlug({ slug: params.slug })
        const menu = await MenuApi.menu(Params)
        const cta = await widgetsApi.cta()
       
        return {
            props: {
                data: data?.data,
                menu: menu?.data?.data,
                cta: cta?.data,
            },
            revalidate: 10,

        }
    } catch (error) {
        console.error("Error fetching header blog detail:", error);

        return {
            props: {
                data: null,
            },
            revalidate: 10,
            notFound: true,
        };
    }
}