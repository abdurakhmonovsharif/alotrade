import { map } from "lodash";
import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";
import { getAllCategories } from "../../Category/categorySlice";
import CategoryCard from "./CategoryCard";

const CategoryCarousels = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { categoriesWithSubcategories: categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (width < 720) {
    return (
      <div className='py-2 md:py-6 flex gap-2 overflow-x-scroll'>
        {categories &&
          categories.length > 0 &&
          categories.map((category, ind) => (
            <CategoryCard ind={ind} category={category} />
          ))}
      </div>
    );
  }
  return (
    <div className='py-2 md:py-10'>
      {categories && categories.length > 0 && (
        <>
          <div className='flex flex-row flex-wrap justify-center gap-4 items-center mb-4'>
            {map([...categories], (category, ind) => (
              <CategoryCard ind={ind} category={category} />
            ))}
            {map([...categories], (category, ind) => (
              <CategoryCard ind={ind} category={category} />
            ))}
            {map([...categories], (category, ind) => (
              <CategoryCard ind={ind} category={category} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryCarousels;
