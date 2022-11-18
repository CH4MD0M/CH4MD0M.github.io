import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, url }) => {
  const { site } = useStaticQuery(seoQuery);
  const metaDescription = description || site.siteMetadata.description;
  const metaUrl = url || site.siteMetadata.siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={`${site.siteMetadata.siteUrl}/og-image.png`}
      />
      <meta
        name="google-site-verification"
        content="Td2FVAr2l6Zwnul0s2sHek3QuYryO1uejM59c8zFcNk"
      />
    </Helmet>
  );
};

export default Seo;

const seoQuery = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
