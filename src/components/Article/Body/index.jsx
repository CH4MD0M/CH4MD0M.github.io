import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Toc from "./Toc";
import PostMarkdown from "./PostMarkdown";

const Body = ({ body }) => {
  return (
    <BodyWrapper>
      <Toc />
      <PostMarkdown body={body} />
    </BodyWrapper>
  );
};

const BodyWrapper = styled.div`
  position: relative;
  border-radius: 1rem;
`;

export default Body;
