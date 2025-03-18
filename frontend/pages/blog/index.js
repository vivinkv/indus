import { Params } from '@/Common/params'
import OtherBlogs from '@/components/blog/otherBlogs/otherBlogs'
import Base from '@/components/layout/Base'
import { FilterApi } from '@/Datas/Endpoints/filters'
import { MenuApi } from '@/Datas/Endpoints/Menu'
import React from 'react'
import Brands from '@/components/home/brands'
import Faq from '@/components/home/faq'
import Cta from '@/components/home/cta'
import { widgetsApi } from '@/Datas/Endpoints/Widgets'
import Banner from '@/components/home/banner'
import { HomeApi } from '@/Datas/Endpoints/Home'
import { BlogApi } from '@/Datas/Endpoints/blog'

function Blog({ menu, data, cta, blog }) {

  return (
    <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description}  >
      <Banner data={data?.data?.Banner_Section} />      <div className='lg:px-[25px] md:px-[15px] px-[10px]'>

        {/* <FeaturedBlog data={testBlogs}/> */}
        <OtherBlogs data={blog} sectionHeading={" Blogs"} />
      </div>

      <Brands data={data?.data?.Brands} />

      <Faq data={data?.data?.FAQ} />

      <Cta data={cta?.data?.CTA} />
    </Base>
  )
}

export default Blog

export async function getStaticProps() {
  try {
    const menu = await MenuApi.menu(Params)
    const filters = await FilterApi.filters(Params)
    const cta = await widgetsApi.cta()
    const data = await HomeApi.index()
    const blog = await BlogApi.getBlogs({start:1, limit: 9 })

    return {
      props: {
        menu: menu?.data?.data,
        filters: filters?.data,
        cta: cta?.data,
        data: data?.data,
        blog: blog?.data
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching header data blog:', error);

    return {
      props: {
        header: null, // or handle the error in a way that makes sense for your application
      },
      revalidate: 10,
      notFound: true
    };
  }
}