import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../Category/categorySlice";
import SubCategories1 from "./SubCategories1";

const CategoryCard = ({category, handleClickCategory}) => <Link
    key={category._id}
    onClick={() => handleClickCategory(category, true)}
    className="flex basis-[420px] items-center gap-[20px] rounded-[16px] bg-[#F8F8F8] p-[10px] hover:bg-gray-200 xs:basis-full xs:gap-[12px]"
    to={`/organizations_sub/${category._id}`}
>
    <img
        className="h-[107px] w-[107px] rounded-[12px] bg-white p-2"
        src={category?.image}
        alt="image"
    />
    <div className="flex flex-col justify-center">
        <h3 className="font-['Inter'] text-[18px] font-semibold text-[#1C1C1C] xs:text-[14px]">
            {category?.name}
        </h3>
        <p className="font-['Inter'] text-base font-normal text-[#747474]">
            {category.tgMembers}
        </p>
    </div>
</Link>
const Categories = () => {
    const dispatch = useDispatch();
    const {categoriesWithSubcategories: categories} =
        useSelector((state) => state.categories);
    const {id} = useParams()
    const [selectedCategory, setSelectedCategory] = useState([])
    const handleClickCategory = (category, isSubCategory) => {
        if (isSubCategory) {

        } else {
            setSelectedCategory(category)
        }
    }
    return id ?
        <SubCategories1/> :
        categories?.map((category, index) => (
            <CategoryCard category={category} handleClickCategory={handleClickCategory}/>
        ))
};

export default Categories;
