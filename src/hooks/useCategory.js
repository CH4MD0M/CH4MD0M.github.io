import { useCallback, useEffect, useState } from "react";
import qs from "query-string";

const useCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
    window.history.pushState(
      { category },
      "",
      `${window.location.pathname}?${qs.stringify({ category })}`
    );
  }, []);

  const changeCategory = useCallback(() => {
    const { category } = qs.parse(window.location.search);
    const target = !category ? "all" : category;
    setSelectedCategory(target);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", changeCategory);
    return () => {
      window.addEventListener("popstate", changeCategory);
    };
  }, []);

  useEffect(() => {
    changeCategory();
  }, []);

  return [selectedCategory, handleSelectCategory];
};

export default useCategory;
