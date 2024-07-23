import React, { useEffect } from "react";
import CategoriesTableTemp from "../../../../Components/Admin/CategoriesPage/CategoriesTableTemp";
import PageTitle from "../../../../Components/Admin/PageTitle";
import { Route, Routes } from "react-router-dom";
import SubCategories from "./SubCategories";
import SubCategories2 from "./SubCategories2";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAdmin,
  deleteCategoryAdmin,
  editCategoryAdmin,
  getAllCategoriesAdmin,
} from "./categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categoriesWithSubcategories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAllCategoriesAdmin());
  }, [dispatch]);

  return (
    <div className='flex flex-col w-full'>
      <PageTitle>Kategoriyalar</PageTitle>
      <Routes>
        <Route path='/:sub' element={<SubCategories />} />
        <Route path='/:sub/:sub2' element={<SubCategories2 />} />
        <Route
          path='/'
          element={
            categoriesWithSubcategories && (
              <CategoriesTableTemp
                type='main'
                actions={{
                  createCategory: (body) => {
                    dispatch(createCategoryAdmin(body));
                  },
                  deleteCategory: (body) => {
                    dispatch(deleteCategoryAdmin(body));
                  },
                  editCategory: (body) => {
                    dispatch(editCategoryAdmin(body));
                  },
                }}
                data={categoriesWithSubcategories}
                name='Kategoriya'
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default Categories;
