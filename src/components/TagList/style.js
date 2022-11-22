import styled from "styled-components";

export const Active = styled.li`
  color: var(--categoryTextColor);
  border: 1px solid var(--categoryTextColor);
`;

export const Disabled = styled.li`
  border: 1px solid transparent;

  cursor: pointer;
`;

export const TagListWrapper = styled.div`
  padding: 2rem 0;
  list-style: none;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  text-transform: capitalize;
  z-index: 200;
  transition: top 0.5s;

  ${Active}, ${Disabled} {
    display: inline-block;
    border-radius: 10px;
    margin: 0 0.5rem;
    margin-bottom: 1.2rem;
    padding: 0.5rem 1.2rem;
  }

  ${Disabled} {
    background: var(--tagBgColor);
  }
`;
