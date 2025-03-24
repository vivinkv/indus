import Base from "@/components/layout/Base";
import Banner from "@/components/home/banner";
import LocationFilter from "@/components/home/location_filter";
import Featured from "@/components/home/featured";
import Journey from "@/components/home/journey";
import Recommended from "@/components/home/recommended";
import SellBuy from "@/components/home/sell&buy";
import Counter from "@/components/Common/Counter";
import Choose from "@/components/home/choose";
import Showroom from "@/components/home/showroom";
import Moment from "@/components/home/moment";
import Testimonials from "@/components/home/testimonials";
import Brands from "@/components/home/brands";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
import { MenuApi } from "@/Datas/Endpoints/Menu";
import { Params } from "@/Common/params";
import { HomeApi } from "@/Datas/Endpoints/Home";
import { widgetsApi } from "@/Datas/Endpoints/Widgets";



export default function Home({ menu, data, moments, cta, outlets }) {

  return (
    <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description} >
      <Banner data={data?.data?.Banner_Section} />

      <LocationFilter
        locations={data?.data?.related_sections?.locations}
        brands={data?.data?.related_sections?.brands}
        fuel={data?.data?.related_sections?.fuel_types}
        price={data?.data?.Price}
      />
      <div className="pt-[200px] pb-[60px] feature-cntr">
        <Featured data={data?.data?.related_sections?.featured} />
      </div>
      <Journey data={data?.data?.Journey} />
      <Recommended data={data?.data?.related_sections?.recommended} newlyAdded={data?.data?.related_sections?.newlyadded} />
      <div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
            {
              data?.data?.Buy_Sell?.map((obj, index) => (
                <div key={index}>
                  <SellBuy data={obj} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Counter data={data?.data?.Insight} />
      <div className="  pb-[40px] md:pb-[60px]">
        <Choose data={data?.data?.related_sections?.choose_next} />
      </div>

      <Showroom data={outlets?.data} />

      <Moment data={moments?.data?.Moments} />

      <Testimonials data={data?.data?.Testimonials} />

      <Brands data={data?.data?.Brands} />

      {
        data?.data?.FAQ?.Questions?.length > 0 &&
        <Faq data={data?.data?.FAQ} />
      }

      <Cta data={cta?.data?.CTA} />
    </Base>
  );
}


export async function getStaticProps() {
  try {
    const menu = await MenuApi.menu(Params)
    const data = await HomeApi.index()
    const moments = await widgetsApi.moments()
    const cta = await widgetsApi.cta()
    const outlets = await HomeApi.featuredOutlets({pageSize:6})
    return {
      props: {
        menu: menu?.data?.data,
        data: data?.data,
        moments: moments?.data,
        cta: cta?.data,
        outlets: outlets?.data
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching header data index:', error);

    return {
      notFound:true,
      revalidate: 10,
      props: {
        header: null, // or handle the error in a way that makes sense for your application
      },
    };
  }
}
