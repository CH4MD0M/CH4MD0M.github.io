import styled, { css } from "styled-components";

export const TocWrapper = styled.div`
  position: sticky;
  top: 100px;
  right: 0;
  min-width: 24rem;
  height: fit-content;
  padding: 0.3rem 1.6rem;
  max-height: 70rem;
  margin-left: 10rem;
  font-size: 1.4rem;
  line-height: 1.5;
  border-left: 1.5px solid var(--scrollBdColor);
  overflow: hidden auto;
  opacity: 1;

  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--scrollThumb);
  }
  ::-webkit-scrollbar-track {
    background: var(--scrollTrack);
  }

  @media screen and (max-width: ${({ theme }) => theme.responsive.lg}) {
    display: none;
  }
`;

export const TocItem = styled.div`
  display: block;
  margin-top: 0.4rem;
  margin-left: ${(props) => props.ml};
  font-weight: 300;
  color: var(--tocTextColor);
  word-break: break-all;
  transition: all 0.125s ease-in;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      color: var(--hoveredTocTextColor);
      transform: scale(1.05);
    `}

  &:hover {
    color: var(--hoveredTocTextColor);
  }
`;
