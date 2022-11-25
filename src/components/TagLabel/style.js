import styled from "styled-components";

export const TagListWrapper = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
`;

export const TagItem = styled.li`
  padding: 0.5rem 1.2rem;
  background: var(--tagBgColor);
  font-weight: 400;
  border-radius: 15px;
  list-style: none;
  color: var(--linkColor);
  transition: background 0.25s;
  &:hover {
    background: var(--hoveredTagBgColor);
  }
  a {
    color: inherit;
  }
`;
