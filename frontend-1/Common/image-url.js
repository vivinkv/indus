export const ImageUrl=(url)=>{
    const domain=process.env.NEXT_PUBLIC_DOMAIN
    if (!url) return domain;
    
    if (url.startsWith("http")) return url;

    const full_url=domain+url
    
    return full_url
}