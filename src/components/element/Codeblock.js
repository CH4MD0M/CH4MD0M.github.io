import React from "react";
import styled from "styled-components";

const Codeblock = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.code`
  margin: 0 0.1rem;
  padding: 0.1rem 0.35rem;
  background-color: ${(props) => props.theme.colors.lightGreen};
  color: rgb(85, 117, 113);
  font-size: 1.7rem;
  line-height: 1.7;
  border-radius: 4px;

  @media screen and (max-width: ${(props) => props.theme.responsive.small}) {
    font-size: 1.4rem;
    line-height: 1.4;
  }
`;

export default Codeblock;
