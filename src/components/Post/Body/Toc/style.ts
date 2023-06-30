import styled, { css } from 'styled-components';

interface TocItemProps {
  ml: string;
  active: boolean;
}

export const StickyWrapper = styled.div`
  position: sticky;
  top: 120px;
  margin-left: 13rem;
  height: 100%;
  min-width: 25rem;
`;

export const TocWrapper = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;
  max-height: 70rem;
  font-size: 1.4rem;
  line-height: 1.5;
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

export const TocItem = styled.div<TocItemProps>`
  display: block;
  margin-top: 0.4rem;
  padding: 0.2rem 0;
  padding-left: ${props => props.ml};
  font-weight: 300;
  color: var(--tocTextColor);
  border-left: 3px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.125s ease-in;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      background: var(--activeTocBgColor);
      border-left: 3px solid var(--activeTocBdColor);
      color: var(--hoveredTocTextColor);
    `}

  &:hover {
    color: var(--hoveredTocTextColor);
  }
`;
