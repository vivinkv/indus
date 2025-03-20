import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function FooterMenu({ title, array, mapKey, commonURL, paramKey }) {

    const router = useRouter()

    const handleSamePageNavigate = (slug) => {
        if (router.pathname == '/cars') {
            window.location.href = `${commonURL}${slug}`
        } else{
            router.push(`${commonURL}${slug}`)
        }
    }

    return (
        <div className='show-add'>
            <span>{title}</span>
            {
                array?.map((link, linkIndex) => (
                    <React.Fragment key={linkIndex}>
                        <Link href={`${commonURL}${paramKey ? link[paramKey] : link?.Slug}`} onClick={() => commonURL == '/cars?brand=' && handleSamePageNavigate(link[paramKey])}>{' ' + link[mapKey]}</Link>
                        {array?.length - 1 != linkIndex && ' | '}
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default FooterMenu