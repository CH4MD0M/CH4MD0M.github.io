import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import PostPreview from "../PostPreview";
import { variants } from "../../utils/framer";

const PostList = ({ category = "all", postList }) => {
  const [count, setCount] = useState(10);
  const [setTarget] = useInfiniteScroll(loadPosts);

  function loadPosts() {
    setCount((prev) => {
      if (prev + 4 <= postList.length) return prev + 4;
      else return postList.length;
    });
  }

  const filteredPosts = postList
    .filter(
      (post) => category === "all" || post.frontmatter.category === category
    )
    .slice(0, count);

  useEffect(() => {
    setCount(10);
  }, [postList]);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        key={category}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {filteredPosts.map((post) => {
          return <PostPreview key={post.id} post={post} />;
        })}
        <div ref={setTarget} />
      </motion.div>
    </AnimatePresence>
  );
};

export default PostList;
