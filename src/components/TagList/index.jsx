import React from "react";

// CSS
import * as S from "./style";
import { FlexWrapper, Active, Disabled } from "../CategoryList/style";

const Tag = ({ title, selectedTag, handleSelectTag }) => {
  return selectedTag === title ? (
    <Active onClick={() => handleSelectTag(title)}>{title}</Active>
  ) : (
    <Disabled onClick={() => handleSelectTag(title)}>{title}</Disabled>
  );
};

const TagList = ({ selectedTag, tags, handleSelectTag }) => {
  return (
    <FlexWrapper>
      <S.TagListWrapper>
        {tags.map((item, idx) => (
          <Tag
            key={idx}
            title={item.fieldValue}
            selectedTag={selectedTag}
            handleSelectTag={handleSelectTag}
          />
        ))}
      </S.TagListWrapper>
    </FlexWrapper>
  );
};

export default TagList;
