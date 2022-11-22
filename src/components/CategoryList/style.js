import styled from "styled-components";

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Active = styled.li`
  color: var(--categoryTextColor);
  border: 1px solid var(--categoryTextColor);
  border-radius: 6px;
`;

export const Disabled = styled.li`
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
`;

export const CategoryListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
  padding: 2rem 0;
  list-style: none;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 200;
  transition: top 0.5s;
  text-transform: capitalize;

  &::-webkit-scrollbar {
    display: none !important;
  }

  ${Active}, ${Disabled} {
    flex: 0 0 auto;
    padding: 1rem 1.5rem;
    background: transparent;
  }
`;
