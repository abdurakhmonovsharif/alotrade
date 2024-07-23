import React, { useEffect } from "react";
import CategoriesTableTemp from "../../../../Components/Admin/CategoriesPage/CategoriesTableTemp";
import { Breadcrumbs, Typography } from "@mui/material";
import {
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
import { NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAdmin,
  createSubCategoryAdmin,
  updateSubCategoryAdmin,
  removeSubCategoryAdmin,
  editCategoryAdmin,
  getAllCategoriesAdmin,
  setCurrentCategory,
} from "./categorySlice";

const SubCategories = () => {
  const { sub } = useParams();

  const dispatch = useDispatch();
  const { categoriesWithSubcategories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(setCurrentCategory(sub));
    dispatch(getAllCategoriesAdmin());
  }, [dispatch]);

  const navigate = useNavigate();
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
        <Typography color='text.primary'>{sub}</Typography>
      </Breadcrumbs>
      {categoriesWithSubcategories && (
        <CategoriesTableTemp
          type='sub'
          actions={{
            createCategory: (body) => {
              dispatch(createSubCategoryAdmin({ ...body, category: sub }));
            },
            deleteCategory: (body) => {
              dispatch(removeSubCategoryAdmin(body));
            },
            editCategory: (body) => {
              dispatch(updateSubCategoryAdmin(body));
            },
          }}
          data={
            categoriesWithSubcategories[
              categoriesWithSubcategories.findIndex((item) => item._id === sub)
            ].subcategories
          }
          name='Sub Kategoriya'
        />
      )}
    </div>
  );
};

export default SubCategories;
