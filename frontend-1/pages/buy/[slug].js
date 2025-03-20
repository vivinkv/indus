import Base from "@/components/layout/Base";
import Showroom from "@/components/home/showroom";
import Faq from "@/components/home/faq";
import Cta from "@/components/home/cta";
import List from "@/components/carlist/list";
import Book from "@/components/carlist/book";
import { MenuApi } from "@/Datas/Endpoints/Menu";
import { getParams, Params } from "@/Common/params";
import { useEffect, useState } from "react";
import { FilterApi } from "@/Datas/Endpoints/filters";
import { widgetsApi } from "@/Datas/Endpoints/Widgets";
import { ContactApi } from "@/Datas/Endpoints/Contact";
import { HomeApi } from "@/Datas/Endpoints/Home";
import { CarsApi } from "@/Datas/Endpoints/Cars";



export default function CombinationCars({ menu, filters, brands, cta, formContent, outlets, carList, carData,models }) {

    const slug = carData?.Slug
    const cleanSlug = slug?.startsWith("used-") ? slug.replace("used-", "") : slug;
    const parts = cleanSlug?.split("-");

    const combinationBrand = parts?.length > 0 && parts[0]?.toUpperCase();
    const combinationLocation = parts?.slice(1)?.join(" ");

    const [data, setdata] = useState(carData)

    return (
        <Base menu={menu} meta={carData?.SEO} bottomDescription={data?.data?.Bottom_Description}  >
            <List data={data} filters={filters?.data} brands={brands?.data} carList={carList} isCombination={true} combinationBrand={carData?.Brand?.Name} models={models?.data} />
            <Showroom data={outlets?.data} />

            <Book data={formContent?.data} />
            {
                data?.FAQ?.Questions?.length > 0 &&
                <Faq data={data?.FAQ} />
            }
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
        const menu = await MenuApi.menu(Params)
        const filters = await FilterApi.filters(Params)
        const brands = await FilterApi.brands()
        const models = await FilterApi.models()
        const cta = await widgetsApi.cta()
        const formContent = await ContactApi.excellenceForm()
        const outlets = await HomeApi.outlets({ location: '', pageSize: 6 })
        const data = await FilterApi.locationData()
        const carData = await CarsApi.combinationData(params?.slug)
        const carList = await CarsApi.combinationList(params?.slug)

        return {
            props: {
                menu: menu?.data?.data,
                filters: filters?.data,
                brands: brands?.data,
                cta: cta?.data,
                formContent: formContent?.data,
                outlets: outlets?.data,
                content: data?.data,
                carData: carData?.data,
                carList: carList?.data,
                models:models?.data
            },
            revalidate: 10,
        };
    } catch (error) {

        console.error('Error fetching header data buy:', error);

        return {
            props: {
                header: null, // or handle the error in a way that makes sense for your application
            },
            revalidate: 10,
            notFound: true
        };
    }
}