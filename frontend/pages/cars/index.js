import Base from "@/components/layout/Base";
import Showroom from "@/components/home/showroom";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
import List from "@/components/carlist/list";
import Book from "@/components/carlist/book";
import { MenuApi } from "@/Datas/Endpoints/Menu";
import { getParams, Params } from "@/Common/params";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FilterApi } from "@/Datas/Endpoints/filters";
import { widgetsApi } from "@/Datas/Endpoints/Widgets";
import { ContactApi } from "@/Datas/Endpoints/Contact";
import { HomeApi } from "@/Datas/Endpoints/Home";



export default function CarIndex({ menu, filters, brands, cta, formContent, outlets, content,models }) {

  const [data, setdata] = useState(content)

  const fetch = async () => {
    const location = getParams('location')
    const response = await FilterApi.locationData({ location })
    setdata(response?.data)
  }

  useEffect(() => {
    fetch()
  }, [])


  return (
    <Base menu={menu} meta={data?.data?.SEO} bottomDescription={data?.data?.Bottom_Description}  >
      <List data={data?.data} filters={filters?.data} brands={brands?.data} models={models?.data} />
      <Showroom data={outlets?.data} />

      <Book data={formContent?.data} />
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
    const filters = await FilterApi.filters()
    const brands = await FilterApi.brands()
    const models = await FilterApi.models()
    const cta = await widgetsApi.cta()
    const formContent = await ContactApi.excellenceForm()
    const outlets = await HomeApi.outlets({ location: '', pageSize: 6 })
    const data = await FilterApi.locationData()

    return {
      props: {
        menu: menu?.data?.data,
        filters: filters?.data,
        brands: brands?.data,
        cta: cta?.data,
        formContent: formContent?.data,
        outlets: outlets?.data,
        content: data?.data,
        models:models?.data
      },
      revalidate: 10,
    };
  } catch (error) {

    console.error('Error fetching header data cars:', error);

    return {
      props: {
        header: null, // or handle the error in a way that makes sense for your application
      },
      revalidate: 10,
      notFound: true
    };
  }
}