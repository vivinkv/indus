import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'
import parse from 'html-react-parser';
import { ImageUrl } from '@/Common/image-url';


function SEO({ data, settings, meta }) {
    const router = useRouter();
    const domain = process.env.NEXT_PUBLIC_DOMAIN

    const canonicalPathname = router?.asPath.split('?')[0];

    const headScripts = parse(typeof settings?.GTM_Manager?.Head === 'string'
        ? settings?.GTM_Manager?.Head
        : '');

    const otherScripts = parse(typeof settings?.GTM_Manager?.Other === 'string'
        ? settings?.GTM_Manager?.Other
        : '');

    const cleanScripts = (scripts) => {
        if (!scripts) {
            return null
        }
        return React.Children.toArray(scripts).filter((script) => typeof script !== 'string' || script.trim() !== '');
    }

    return (
        <Head>
            {headScripts && (
                cleanScripts(headScripts)
                // headScripts
            )}

            {otherScripts && (
                otherScripts
            )}
            <link rel="canonical" href={`${domain}${canonicalPathname == '/index' ? '' : canonicalPathname == '/' ? '' : canonicalPathname}`} />
            <link rel="icon" href={ImageUrl(settings?.Favicon?.url)} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />


            <>
                <title>{meta?.Meta_Title}</title>
                <meta name="keywords" content={meta?.Keywords} />
                <meta name="description" content={meta?.Meta_Description} />

                {/* Open Graph Meta Tags for Social Sharing */}
                <meta property="og:title" content={meta?.OG_Title || meta?.Meta_Title} />
                <meta property="og:description" content={meta?.OG_Title || meta?.Meta_Description} />
                <meta property="og:image" content={ImageUrl(meta?.Meta_Image?.url) || data?.banner_image?.file_path} />
                <meta property="og:image:alt" content={data?.og_image?.alt_text || 'Alt Text for Image'} />

                <meta name="twitter:card" content={'summary_large_image'} />
                <meta name="twitter:image:alt" content={data?.og_image?.alt_text || data?.banner_image?.alt_text || 'Alt Text for Image'} />
                <meta name="twitter:title" content={data?.og_title ? data?.og_title : data?.browser_title} />
                <meta name="twitter:description" content={data?.og_description ? data?.og_description : data?.meta_description} />
                <meta name="twitter:image" content={data?.og_image?.file_path || data?.banner_image?.file_path}></meta>
            </>

        </Head>
    )
}

export default SEO
