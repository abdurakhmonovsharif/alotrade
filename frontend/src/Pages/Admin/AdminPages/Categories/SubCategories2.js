import React, { useEffect } from "react";
import CategoriesTableTemp from "../../../../Components/Admin/CategoriesPage/CategoriesTableTemp";
import { categories } from "../makaData";
import { Breadcrumbs, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAdmin,
  createSub2CategoryAdmin,
  removeSub2CategoryAdmin,
  updateSub2CategoryAdmin,
  getAllCategoriesAdmin,
  setCurrentCategory,
} from "./categorySlice";

const SubCategories2 = () => {
  const { sub, sub2 } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categoriesWithSubcategories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(setCurrentCategory(sub));
    dispatch(getAllCategoriesAdmin());
  }, [dispatch]);
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumbs aria-label='breadcrumb'>
        <span
          onClick={() => navigate("/admin/categories")}
          className=' cursor-pointer'
          //   relative='path'
        >
          Kategoriyalar
        </span>
        <span
          onClick={() => navigate(`/admin/categories/${sub}`)}
          className=' cursor-pointer'
          //   relative='path'
        >
          {sub}
        </span>
        <Typography color='text.primary'>{sub2}</Typography>
      </Breadcrumbs>
      {categoriesWithSubcategories ? (
        categoriesWithSubcategories[
          categoriesWithSubcategories?.findIndex((item) => item._id === sub)
        ].subcategories ? (
          <CategoriesTableTemp
            type='sub2'
            actions={{
              createCategory: (body) => {
                dispatch(
                  createSub2CategoryAdmin({ ...body, subcategory: sub2 })
                );
              },
              deleteCategory: (body) => {
                dispatch(removeSub2CategoryAdmin(body));
              },
              editCategory: (body) => {
                dispatch(updateSub2CategoryAdmin(body));
              },
            }}
            data={
              categoriesWithSubcategories[
                categoriesWithSubcategories?.findIndex(
                  (item) => item._id === sub
                )
              ]?.subcategories[
                categoriesWithSubcategories[
                  categoriesWithSubcategories?.findIndex(
                    (item) => item._id === sub
                  )
                ].subcategories?.findIndex((item) => item._id === sub2)
              ].subcategories
            }
            name='Sub2 Kategoriya'
          />
        ) : null
      ) : null}
    </div>
  );
};

export default SubCategories2;
