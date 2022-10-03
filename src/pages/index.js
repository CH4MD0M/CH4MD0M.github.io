import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { siteUrl } from "../../blogConfig";

import useCategory from "../hooks/useCategory";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

import Layout from "../layout";
import Seo from "../components/Seo";
import Categories from "../components/Categories";
import Posts from "../components/Posts";
import Bio from "../components/Bio";
import Divider from "../components/Divider";

const IndexPage = () => {
  const {
    site: { siteMetadata },
    allMdx: { nodes: posts },
  } = useStaticQuery(query);

  const [category, selectCategory] = useCategory();
  const [count, setCount] = useState(10);
  const [setTarget] = useInfiniteScroll(loadPosts);

  function loadPosts() {
    setCount((prev) => {
      if (prev + 4 <= posts.length) return prev + 4;
      else return posts.length;
    });
  }

  return (
    <Layout>
      <Seo title="Home" />
      <Helmet>
        <link rel="canonical" href={siteUrl} />
      </Helmet>

      <Wrapper>
        <Categories
          category={category}
          categories={siteMetadata.categories}
          selectCategory={selectCategory}
        />
        <MainContet>
          <Bio path="main" />
          <Divider mt="0" mb="5rem" />
          <Posts category={category} posts={posts} count={count} />
          <div ref={setTarget} />
        </MainContet>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 85vh;
  align-items: flex-start;
  flex-direction: row-reverse;

  @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
    display: block;
    margin-top: 0;
  }
  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    margin-top: 0;
  }
`;
const MainContet = styled.div`
  width: calc(100% - 230px - 7rem);
  margin-right: 7rem;

  @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
    width: 100%;
    margin-top: 2em;
  }
`;

const query = graphql`
  {
    site {
      siteMetadata {
        title
        categories {
          name
          slug
        }
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          category
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

export default IndexPage;
