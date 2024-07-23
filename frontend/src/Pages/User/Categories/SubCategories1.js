import React from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const SubCategories1 = () => {
    const {categoriesWithSubcategories: categories} = useSelector((state) => state.categories);
    const {id, subID} = useParams();
    const category = categories?.find(category => category._id === id);
    const subCategories = category ? category.subcategories : [];
    const nestedSubCategories = subCategories?.map((category) => {
        return category?.subcategories?.map((sub) => {
            if (sub.subcategory === subID) {
                return sub
            }
        })[0]
    })
    return (subID ? nestedSubCategories : subCategories)?.map((subcategory) => (
        <Link
            key={subcategory._id}
            className="flex basis-[420px] items-center gap-[20px] rounded-[16px] bg-[#F8F8F8] p-[10px] hover:bg-gray-200 xs:basis-full xs:gap-[12px]"
            to={subID?`/organizations_sub/${id}/${subID}`:`/organizations_sub/${id}/${subcategory._id}`}
        >
            <img
                className="h-[107px] w-[107px] rounded-[12px] bg-white p-2"
                src={subcategory?.image}
                alt="image"
            />
            <div className="flex flex-col justify-center">
                <h3 className="font-['Inter'] text-[18px] font-semibold text-[#1C1C1C] xs:text-[14px]">
                    {subcategory.name}
                </h3>
                <p className="font-['Inter'] text-base font-normal text-[#747474]">
                    {subcategory.tgMembers}
                </p>
            </div>
        </Link>
    ));
};

export default SubCategories1;
