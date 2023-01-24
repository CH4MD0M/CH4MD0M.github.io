import React, { useCallback, useState } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Seo from "../components/Seo";
import Divider from "../components/Divider";
import PostList from "../components/PostList";
import Layout from "../layout";
import PageTitle from "../components/PageTitle";

const SearchPage = ({ data }) => {
  const posts = data.allMdx.nodes;
  const [query, setQuery] = useState("");

  const filteredPosts = useCallback(
    posts.filter((post) => {
      const { excerpt, frontmatter } = post;
      const { title, tags } = frontmatter;
      const lowerQuery = query.toLocaleLowerCase();

      return (
        excerpt?.toLocaleLowerCase().includes(lowerQuery) ||
        title?.toLocaleLowerCase().includes(lowerQuery) ||
        tags?.includes(lowerQuery)
      );
    }),
    [query]
  );

  const handleInputChange = (e) => setQuery(e.target.value);

  return (
    <Layout>
      <Seo title="Search" />
      <PageTitle>Search.</PageTitle>
      <Input onChange={handleInputChange} placeholder="search" />
      <Divider mt="6rem" mb="3rem" />
      <PostList postList={filteredPosts} />
    </Layout>
  );
};

const Input = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: 1rem 1.6rem;
  border-radius: 9px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
`;

export const pageQuery = graphql`
  {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        excerpt(pruneLength: 200, truncate: true)
        fields {
          slug
        }
        frontmatter {
          title
          category
          date(formatString: "YYYY년 M월 D일")
          tags
        }
      }
    }
  }
`;
export default SearchPage;
