import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import {
  Headings,
  Codeblock,
  Blockquote,
  PrismSetup,
} from "../components/Element";
import Layout from "../layout";
import Bio from "../components/Bio";
import Divider from "../components/Divider";
import CategoryLabel from "../components/CategoryLabel";
import Seo from "../components/Seo";
import Comments from "../components/Comments";

// CSS
import "katex/dist/katex.min.css";

const components = {
  h1: Headings.myH1,
  h2: Headings.myH2,
  h3: Headings.myH3,
  inlineCode: Codeblock,
  blockquote: Blockquote,
  pre: PrismSetup,
};

const PostTemplate = ({ data, pageContext, location }) => {
  const { siteUrl, description } = data.site.siteMetadata;
  const {
    mdx: {
      frontmatter: { author, title, category, date },
      body,
      excerpt,
    },
  } = data;

  return (
    <Layout>
      <Seo title={title} description={description || excerpt} />
      <Helmet>
        <link rel="canonical" href={`${siteUrl}${location.pathname}`} />
      </Helmet>
      <Wrapper>
        <div className="post-info">
          <CategoryLabel category={category} isLink="true" />
          <h2>{title}</h2>
          <Information>
            <Author> @{author} </Author>
            <Date>· {date} </Date>
          </Information>
          <Divider />
        </div>

        <div className="post-contents">
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
        <Bio path="post" />
        <Comments />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 6rem auto 4rem auto;
  color: var(--contentTextColor);
  /* info */
  .post-info {
    padding: 4rem 0 1rem;
    h2 {
      margin: 1.5rem 0;
      font-weight: 700;
      font-size: 5.5rem;
      color: var(--textColor);
    }
    @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
      margin-left: 1rem;
      h2 {
        font-size: 3.5rem;
      }
    }
  }

  /* post contents */
  .post-contents {
    background-color: var(--contentBgColor);
    padding: 2rem ${(props) => props.theme.sideSpace.contentLarge};
    border-radius: 1rem;
    a {
      color: var(--textColor);
      text-decoration: underline;
    }
    /* table */
    table {
      margin: 5rem auto;
      font-size: 1.7rem;
      font-weight: var(--regularFontWeight);
      border-collapse: collapse;
    }
    th {
      padding: 1rem;
      background-color: ${(props) => props.theme.colors.primary5};
      border: 0.5px solid var(--textColor);
    }
    td {
      padding: 1rem 1.8rem;
      border: 0.5px solid var(--textColor);
    }
    td:first-child {
      text-align: center;
    }
    th:first-child,
    td:first-child {
      border-left: none;
    }
    th:last-child,
    td:last-child {
      border-right: none;
    }

    /* list */
    ul {
      list-style-type: circle;
    }
    ul,
    ol {
      margin: 1.2rem 0 2rem;
      padding: 0 4rem;
      font-size: 1.7rem;
      line-height: 1.7;
      font-weight: 300;
    }

    /* paragraph */
    p {
      font-size: 1.7rem;
      line-height: 1.7;
      font-weight: var(--regularFontWeight);
      margin: 1.2rem 0;

      a {
        color: rgb(32, 168, 234);
        font-weight: var(--boldFontWeight);
      }
    }

    em {
      background-color: ${(props) => props.theme.colors.lightOrange};
      padding: 0.1rem 0.3rem;
      border-radius: 2px;
      color: rgb(125, 107, 113);
    }

    /* 반응형 */
    @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
      padding: 2rem ${(props) => props.theme.sideSpace.contentSmall};

      p {
        font-size: 1.4rem;
        line-height: 1.4;
      }
      ul,
      ol {
        margin: 1rem 0 2rem;
        padding: 0 2rem;
        font-size: 1.4rem;
        line-height: 1.4;
      }
    }
  }
`;

const Information = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
`;

const Author = styled.span`
  font-weight: 700;
  color: var(--textColor);
`;

const Date = styled.span`
  font-weight: 300;
  color: var(--textColor);
`;

export const query = graphql`
  query GetSinglePost($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        description
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        author
        title
        category
        date(formatString: "MMMM Do, YYYY")
        slug
      }
      body
    }
  }
`;

export default PostTemplate;
