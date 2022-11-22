import React from "react";
import { Link } from "gatsby";

import TagLabel from "../../TagLabel";
import Divider from "../../Divider";

// CSS
import * as S from "./style";

const Header = ({ category, title, author, date, tags }) => {
  return (
    <S.HeaderWrapper>
      <S.CategoryLabel>
        <Link to={`/categories?category=${category}`}>{category}</Link>
      </S.CategoryLabel>
      <S.Title>{title}</S.Title>
      <S.Information>
        <S.Author> {author} </S.Author>
        <S.Date>· {date} </S.Date>
      </S.Information>
      <TagLabel tagList={tags} />
      <Divider />
    </S.HeaderWrapper>
  );
};

export default Header;
