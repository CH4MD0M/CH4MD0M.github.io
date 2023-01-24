import React from "react";
import { Link } from "gatsby";
import { AnimatePresence, useCycle } from "framer-motion";

import ToggleMenu from "../ToggleMenu";

// CSS
import * as S from "./style";
import { FaBars } from "react-icons/fa";

const Header = ({ title }) => {
  const [frontTitle, backTitle] = title.split(".");
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <>
      <S.FixedWrapper>
        <S.HeaderWrapper>
          <S.NavTitle>
            <Link to="/">
              {frontTitle}.<span>{backTitle}</span>
            </Link>
          </S.NavTitle>

          <S.Menu>
            <S.LinksWrapper>
              <Link to="/categories">categories</Link>
              <Link to="/tags">tags</Link>
            </S.LinksWrapper>
            <S.MenuIcon onClick={toggleOpen}>
              <FaBars />
            </S.MenuIcon>
          </S.Menu>
        </S.HeaderWrapper>
      </S.FixedWrapper>
      <AnimatePresence>{isOpen && <ToggleMenu />}</AnimatePresence>
      {isOpen && <S.Background onClick={toggleOpen} />}
    </>
  );
};

export default Header;
