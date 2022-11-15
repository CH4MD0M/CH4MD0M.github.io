import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ description, title }) => {
  const { site } = useStaticQuery(seoQuery);
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang: "ko" }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:site_title`,
          content: title,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: "og:author",
          content: site.siteMetadata.author,
        },
        {
          property: "og:image",
          content: `${site.siteMetadata.siteUrl}/og-image.png`,
        },

        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: "google-site-verification",
          content: "Td2FVAr2l6Zwnul0s2sHek3QuYryO1uejM59c8zFcNk",
        },
      ]}
    />
  );
};

export default Seo;

const seoQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
      }
    }
  }
`;
