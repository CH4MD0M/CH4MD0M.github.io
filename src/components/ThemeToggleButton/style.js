import styled from "styled-components";
import { motion } from "framer-motion";

export const ToggleWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem;
  right: 35px;
  bottom: 30px;
  background: var(--themeToggleBtnBgColor);
  box-shadow: var(--themeToggleBtnShadow);
  border-radius: 999px;
  cursor: pointer;

  & > span {
    font-size: 1.6rem;
  }
  & > div {
    width: 2rem;
    height: 2rem;

    transition: fill 0.3s;
  }
  svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  svg path {
    fill: var(--iconColor);
    transition: fill 0.3s;
  }
  svg:hover path {
    fill: var(--textColor);
  }

  @media screen and (max-width: ${(props) => props.theme.responsive.sm}) {
    right: 20px;
    bottom: 20px;

    & > span {
      display: none;
    }
  }
`;
