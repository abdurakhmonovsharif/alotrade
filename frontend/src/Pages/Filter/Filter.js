import React, { useEffect, useState } from "react";
import CheckboxList from "../../Components/CheckboxList/CheckboxList";
import SelectCheckbox from "../../Components/SelectCheckbox/SelectCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "lodash";
import {
  filterCategories,
  filterDistricts,
  filterRegions,
  filterSubcategories,
  filterSubcategories2,
  filterTradeTypes,
} from "./filterSlice";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../translation";
import useWindowSize from "../../hooks/useWindowSize";
import closeIcon from "../../assets/close.svg";
import { useLocation } from "react-router-dom";
import { getTradeTypes } from "./tradeSlice";
import { getAllCategories, getSubcategories } from "../Category/categorySlice";
import { getAllregions } from "./regionsSlice";

const Filter = ({ filterVisible, setFilterVisible, filterBody, onClick }) => {
  const { t } = useTranslation(["common"]);
  const { davlatlar, kategoriyalar } = getTranslations(t);

  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    tradetypes,
    categories: categoriesList,
    subcategories: subcategoriesList,
    subcategories2: subcategoriesList2,
    districts,
    regions: regionsList,
  } = useSelector((state) => state.filter);

  const { categoriesWithSubcategories: categories, subcategories } =
    useSelector((state) => state.categories);
  const { regions } = useSelector((state) => state.regions);

  const [categoryValue, setCategoryValue] = useState(null);

  // const changeTradeTypes = (e) => {
  //   const value = e.target.value;
  //   const checked = e.target.checked;
  //   const filtered = filter(tradetypes, (tradetype) => tradetype !== value);
  //   dispatch(
  //     checked
  //       ? filterTradeTypes([...filtered, value])
  //       : filterTradeTypes([...filtered])
  //   );
  // };

  const changeCategories = (e) => {
    const value = e.target.value;

    //
    // setCategoryValue(e.target.value);

    const checked = e.target.checked;
    const filtered = filter(categoriesList, (ctg) => ctg !== value);
    const newCtgs = checked ? [...filtered, value] : [...filtered];
    dispatch(filterCategories(newCtgs));
    // dispatch(filterSubcategories([]));
    // dispatch(filterSubcategories2([]));
    // dispatch(filterCategories([e.target.value]));
    // dispatch(getSubcategories({ category: value }));
  };

  const changeSubcategories = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const filtered = filter(
      subcategoriesList,
      (subcategory) => subcategory !== value
    );
    const newSubcategories = checked ? [...filtered, value] : [...filtered];
    dispatch(filterSubcategories(newSubcategories));
  };

  const changeSubcategories2 = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const filtered = filter(
      subcategoriesList2,
      (subcategory) => subcategory !== value
    );
    const newSubcategories = checked ? [...filtered, value] : [...filtered];
    dispatch(filterSubcategories2(newSubcategories));
  };

  const changeRegions = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const filtered = filter(regionsList, (region) => region !== value);
    const newRegions = checked ? [...filtered, value] : [...filtered];
    dispatch(filterRegions(newRegions));
  };

  const changeDistricts = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const filtered = filter(districts, (district) => district !== value);
    const newDistricts = checked ? [...filtered, value] : [...filtered];
    dispatch(filterDistricts(newDistricts));
  };

  useEffect(() => {
    if (location?.state?.category?.value && categories) {
      const value = location?.state?.category?.value;
      changeCategories(categories.filter((el) => el.value === value)[0]);
      dispatch(filterCategories([value]));
    }
  }, [dispatch, location, categories]);

  useEffect(() => {
    dispatch(getTradeTypes());
    dispatch(getAllCategories());
    dispatch(getAllregions());
  }, [dispatch]);

  const pageIncludeFalse =
    !location.pathname.includes("/create_product") &&
    !location.pathname.includes("/create_order") &&
    !location.pathname.includes("/sign-up/business") &&
    !location.pathname.includes("/profile/user");
  const pageIncludeTrue =
    location.pathname.includes("/create_product") ||
    location.pathname.includes("/create_order") ||
    location.pathname.includes("/sign-up/business") ||
    location.pathname.includes("/profile/user");

  // "min-w-[300px] max-w-[400px] shadow bg-white min-h-full"

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${
        width < 720 ? "w-full" : "min-w-[300px] max-w-[400px] px-2"
      } h-full ease-in-out duration-200 fixed overflow-y-scroll no-scrollbar top-0 ${
        filterVisible ? "left-0" : "left-[-100%]"
      } z-50 bg-white`}
    >
      <div className='py-4'>
        <div className='flex justify-end items-center mb-4 pr-4'>
          {/* <h1 className="font-amazonbold text-xl tracking-widest text-secondary-medium">
            {Filter}
          </h1> */}
          {
            <button onClick={() => setFilterVisible(false)}>
              <img src={closeIcon} alt='close' width={30} />
            </button>
          }
        </div>
        {/* {width < 720 ? (
          <> */}
        {(filterBody === "category" || pageIncludeTrue) && (
          <>
            {/* <CheckboxList
                  checkedList={tradetypes}
                  list={tradeTypes}
                  headerText={savdo_turi}
                  headerStyle="ml-3 mt-3"
                  listStyle="pl-3"
                  onChange={changeTradeTypes}
                /> */}
            <SelectCheckbox
              headerCheckeds={categoriesList}
              changeHeader={changeCategories}
              changeCategory={changeSubcategories}
              changeBody={changeSubcategories}
              bodyCheckeds={subcategoriesList}
              headerText={kategoriyalar}
              datas={categories}
              categories={categories}
              subcategoryCheckeds={subcategoriesList2}
              changeSubcategory={changeSubcategories2}
              property='subcategories'
              isCategory={true}
              categoryValue={categoryValue}
            />
          </>
        )}
        {/* </>
        ) : (
          <>
            {/* <CheckboxList
              checkedList={tradetypes}
              list={tradeTypes}
              headerText={savdo_turi}
              headerStyle="ml-3 mt-3"
              listStyle="pl-3"
              onChange={changeTradeTypes}
            /> 
            <SelectCheckbox
              headerCheckeds={subcategoriesList}
              changeHeader={changeSubcategories}
              changeCategory={changeCategories}
              changeBody={changeSubcategories2}
              bodyCheckeds={subcategoriesList2}
              headerText={kategoriyalar}
              datas={subcategories}
              categories={categories}
              property='subcategories'
              isCategory={true}
              categoryValue={categoryValue}
            />
          </>
        )} */}
        {filterBody === "country" && pageIncludeFalse && (
          <>
            <SelectCheckbox
              headerCheckeds={regionsList}
              bodyCheckeds={districts}
              changeHeader={changeRegions}
              changeBody={changeDistricts}
              headerText={davlatlar}
              datas={regions}
              property='districts'
            />
          </>
        )}
        {pageIncludeFalse && (
          <button
            onClick={() => setFilterVisible(false)}
            className='bg-alotrade py-2 px-4 block w-full mt-4 text-white rounded'
          >
            Поиск
          </button>
        )}
        {pageIncludeTrue && (
          <button
            onClick={onClick}
            className='bg-alotrade py-2 px-4 block w-full mt-4 text-white rounded max-w-[250px] mx-auto'
          >
            Добавить
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
