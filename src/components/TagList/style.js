import styled from "styled-components";
import { Active, Disabled } from "../CategoryList/style";

export const TagListWrapper = styled.div`
  gap: 0.3rem;
  padding: 2rem 0;
  list-style: none;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  z-index: 200;
  transition: top 0.5s;
  text-transform: capitalize;

  ${Active}, ${Disabled} {
    display: inline-block;
    border-radius: 20px;
    margin: 0 0.5rem;
    margin-bottom: 1.2rem;
  }

  ${Disabled} {
    background: var(--tagBgColor);
  }
`;
