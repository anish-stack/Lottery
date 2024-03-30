import React from 'react'
import { Helmet } from "react-helmet";
const Metatag = ({ title, keywords, descriptions }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={descriptions} />
            <meta name="keywords" content={keywords} />

        </Helmet>
    )
}

export default Metatag