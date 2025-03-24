import Image from "next/image";
import Base from "@/components/layout/Base";
import Moment from "@/components/home/moment";
import Cta from "@/components/home/cta";
import Details from "@/components/cardetails/details";
import { MenuApi } from "@/Datas/Endpoints/Menu";
import { Params } from "@/Common/params";
import { CarsApi } from "@/Datas/Endpoints/Cars";
import { HomeApi } from "@/Datas/Endpoints/Home";
import { widgetsApi } from "@/Datas/Endpoints/Widgets";


export default function Car({ menu, data, detail, cta, moments }) {

  // console.log(detail)

  return (
    <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description} >


      <div className="pt-[100px] md:pt-[140px]">
        <Details detail={detail} />
      </div>

      <div className="mb-[80px]">
        <Moment data={moments?.data?.Moments} />
      </div>

      <Cta data={cta?.data?.CTA} />

    </Base>
  );
}


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
export async function getStaticProps({ params }) {
  try {
    const detail = await CarsApi.detail(params.slug)
    const menu = await MenuApi.menu(Params)
    const data = await HomeApi.index()
    const cta = await widgetsApi.cta()
    const moments = await widgetsApi.moments()

    return {
      props: {
        menu: menu?.data?.data,
        detail: detail?.data?.data,
        data: data?.data,
        cta: cta?.data,
        moments: moments?.data
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
