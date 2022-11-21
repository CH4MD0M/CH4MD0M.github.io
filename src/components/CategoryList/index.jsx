import React from "react";

// CSS
import * as S from "./style";

const Category = ({ title, selectedCategory, handleSelectCategory }) => {
  return selectedCategory === title ? (
    <S.Active onClick={() => handleSelectCategory(title)}>#{title}</S.Active>
  ) : (
    <S.Disabled onClick={() => handleSelectCategory(title)}>
      #{title}
    </S.Disabled>
  );
};

const CategoryList = ({
  selectedCategory,
  categories,
  handleSelectCategory,
}) => {
  return (
    <S.FlexWrapper>
      <S.CategoryListWrapper>
        <Category
          title="all"
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
        {categories.map((item, idx) => (
          <Category
            key={idx}
            title={item.fieldValue}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
        ))}
      </S.CategoryListWrapper>
    </S.FlexWrapper>
  );
};

export default CategoryList;
