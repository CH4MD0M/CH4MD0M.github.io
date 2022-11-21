import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import sortBy from "lodash/sortBy";

import useCategory from "../hooks/useCategory";
import Layout from "../layout";
import Seo from "../components/Seo";
import PageTitle from "../components/PageTitle";
import CategoryList from "../components/CategoryList";
import Divider from "../components/Divider";
import PostList from "../components/PostList";

const CategoryPage = () => {
  const data = useStaticQuery(pageQuery);
  const { nodes, group } = data.allMdx;

  const [selectedCategory, handleSelectCategory] = useCategory();
  const categories = sortBy(group, ["fieldValue"]);

  const filteredPosts = nodes.filter(
    (post) =>
      selectedCategory === "all" ||
      post.frontmatter.category === selectedCategory
  );

  return (
    <Layout>
      <Seo title="Categories" />
      <PageTitle>Categories.</PageTitle>
      <CategoryList
        selectedCategory={selectedCategory}
        categories={categories}
        handleSelectCategory={handleSelectCategory}
      />
      <Divider mt="0" />
      <PostList motionKey={selectedCategory} postList={filteredPosts} />
    </Layout>
  );
};

const pageQuery = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      nodes {
        fields {
          slug
        }
        id
        frontmatter {
          title
          category
          date(formatString: "YYYY년 M월 D일")
          tags
        }
        excerpt(pruneLength: 300, truncate: true)
      }
    }
  }
`;

export default CategoryPage;
