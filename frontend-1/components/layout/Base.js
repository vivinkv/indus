import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from './SEO';
import parse from 'html-react-parser';


const Base = ({ children, menu, hideFooter, meta, bottomDescription }) => {

    const otherScripts = parse(typeof menu?.GTM_Manager?.Body === 'string'
        ? menu?.GTM_Manager?.Body
        : '');

    return (
        <>
            <SEO settings={menu} meta={meta} />
            {
                otherScripts &&
                otherScripts
            }
            <div>
                <Header data={menu?.Header} general={menu} />
                {children}
                <Footer general={menu} hideFooter={hideFooter} bottomDescription={bottomDescription} />
            </div>
        </>
    );
};

export default Base;