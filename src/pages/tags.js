import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";

import useTag from "../hooks/useTag";
import Layout from "../layout";
import Seo from "../components/Seo";
import PageTitle from "../components/PageTitle";
import Divider from "../components/Divider";
import PostList from "../components/PostList";
import TagList from "../components/TagList";

const TagsPage = () => {
  const data = useStaticQuery(pageQuery);
  const { nodes, group } = data.allMdx;

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, handleSelectTag] = useTag();
  const tags = orderBy(group, ["totalCount"], ["desc"]);

  useEffect(() => {
    if (!selectedTag) {
      setFilteredPosts(nodes);
      return;
    }
    setFilteredPosts(
      filter(nodes, (post) => post.frontmatter.tags.indexOf(selectedTag) !== -1)
    );
  }, [selectedTag]);

  return (
    <Layout>
      <Seo title="Tags" />
      <PageTitle>Tags.</PageTitle>
      <TagList
        selectedTag={selectedTag}
        tags={tags}
        handleSelectTag={handleSelectTag}
      />
      <Divider mt="0" />
      <PostList motionKey={selectedTag} postList={filteredPosts} />
    </Layout>
  );
};

const pageQuery = graphql`
  {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      nodes {
        id
        excerpt(pruneLength: 300, truncate: true)
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

export default TagsPage;
