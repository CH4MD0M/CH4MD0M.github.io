import React from "react";
import { Link } from "gatsby";

// CSS
import * as S from "./style";

const TagLabel = ({ tagList }) => {
  return (
    <S.TagListWrapper>
      {tagList.map((tag) => (
        <S.TagItem>
          <Link to={`/tags?tag=${tag}`}>{tag}</Link>
        </S.TagItem>
      ))}
    </S.TagListWrapper>
  );
};

export default TagLabel;
