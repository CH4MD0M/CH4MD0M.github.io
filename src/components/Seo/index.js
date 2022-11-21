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
      <meta property="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:image"
        content={`${site.siteMetadata.siteUrl}/og-image.png`}
      />
      <meta
        name="google-site-verification"
        content="Td2FVAr2l6Zwnul0s2sHek3QuYryO1uejM59c8zFcNk"
      />
      <meta
        name="naver-site-verification"
        content="7572a32ecf306d2bf923a1352adb83e6608e2ae7"
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
        description
      }
    }
  }
`;
