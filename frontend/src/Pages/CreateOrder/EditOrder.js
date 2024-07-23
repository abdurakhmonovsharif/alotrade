import { filter, uniqueId } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SaveButton from "../../Components/Buttons/SaveButton";
import CheckboxList from "../../Components/CheckboxList/CheckboxList";
import UploadImages from "../../Components/ImageCrop/UploadImages";
import Description from "../../Components/Inputs/Description";
import Input from "../../Components/Inputs/Input";
import MinMaxPrice from "../../Components/MinMaxPrice/MinMaxPrice";
import UniversalModal from "../../Components/Modal/UniversalModal";
import RadioButtonList from "../../Components/RadioButtons/RadioButtonList";
import SelectCategory from "../../Components/Select/SelectCategory";
import SelectRegion from "../../Components/Select/SelectRegion";
import { universalToast } from "../../Components/ToastMessages/ToastMessages";
import { currencices } from "../../Config/globalConstants";
import {
  clearSubcategories,
  getAllCategories,
  getSubcategories,
} from "../Category/categorySlice";
import Filter from "../Filter/Filter";
import {
  clearFilters,
  filterCategories,
  filterSubcategories,
  filterSubcategories2,
} from "../Filter/filterSlice";
import { getAllregions } from "../Filter/regionsSlice";
import { checkRegisterOrder } from "../User/Orders/constants";
import {
  createOrder,
  getOrderById,
  updateOrder,
} from "../User/Orders/orderSlice";

const EditOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location?.state?.orderId;
  const { tradetypes } = useSelector((state) => state.trade);
  const { loading } = useSelector((state) => state.login);
  const { regions } = useSelector((state) => state.regions);
  const { categoriesWithSubcategories } = useSelector(
    (state) => state.categories
  );
  const {
    categories: categoriesList,
    subcategories: subcategoriesList,
    subcategories2: subcategoriesList2,
  } = useSelector((state) => state.filter);

  const [isVisibleFilter, setIsVisibleFilter] = useState(false);

  const [tradeTypes, setTradeTypes] = useState([]);
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [currency, setCurrency] = useState("UZS");
  const [districts, setDistricts] = useState([]);
  const [images, setImages] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [errors, setErrors] = useState(null);

  const clearErrors = () => {
    setErrors(null);
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "name" && setName(value);
    name === "description" && setDescription(value);
    name === "minPrice" && setMinPrice(value);
    name === "maxPrice" && setMaxPrice(value);
    clearErrors();
  };

  const selectRegion = (e) => {
    clearErrors();
    setRegion(e);
    setDistricts(e.districts);
  };

  const selectDistrict = (e) => {
    clearErrors();
    setDistrict(e);
  };

  const changeTradeTypes = (e) => {
    clearErrors();
    const value = e.target.value;
    const checked = e.target.checked;
    const filtered = filter(tradeTypes, (tradeType) => tradeType !== value);
    checked
      ? setTradeTypes([...filtered, value])
      : setTradeTypes([...filtered]);
  };

  const selectCategory = (e) => {
    const value = e.value;

    clearErrors();
    setCategories(e);
    // dispatch(filterSubcategories([]));
    // dispatch(filterSubcategories2([]));
    dispatch(filterCategories([value]));
    // dispatch(getSubcategories({ category: value }));
  };

  const changeCurrency = (e) => {
    setCurrency(e.target.value);
    clearErrors();
  };

  const enterHandler = (e) => {
    clearErrors();
    e.key === "Enter" && submitHandler();
  };

  const submitHandler = () => {
    clearErrors();
    const data = {
      name,
      description: description,
      tradetypes: tradeTypes,
      region: region.value,
      district: district.value,
      categories: categories.map((el) => el.value),

      status: statuses,
      currency,
      images,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    };
    const check = checkRegisterOrder({ ...data, setErrors });
    check &&
      dispatch(
        orderId
          ? updateOrder({ id: orderId, ...data })
          : createOrder({ ...data })
      ).then(({ error }) => {
        if (!error) {
          universalToast("Заказ успешно изменен!", "success");
          navigate("/profile/orders");
          dispatch(clearFilters());
        }
      });
  };

  const setDatas = (product) => {
    const {
      tradetypes,
      region,
      district,
      categories,
      subcategories,
      subcategories2,
      status,
      currency,
      images,
      minPrice,
      maxPrice,
      name,
      description,
    } = product;
    const { districts } = region;
    name && setName(name);
    description && setDescription(description);
    tradetypes && setTradeTypes(tradetypes);
    region.label && setRegion(region);
    district.label && setDistrict(district);
    districts.length && setDistricts(districts);
    categories && setCategories(categories);
    status && setStatuses(status);
    currency && setCurrency(currency);
    images && setImages(images);
    minPrice && setMinPrice(minPrice);
    maxPrice && setMaxPrice(maxPrice);
    categories && dispatch(filterCategories([categories[0].value]));

    // subcategories.length > 0 &&
    //   dispatch(filterSubcategories([...subcategories.map((el) => el.value)]));
    // subcategories2.length > 0 &&
    //   dispatch(filterSubcategories2([...subcategories2.map((el) => el.value)]));
    // dispatch(getSubcategories({ category: categories[0].value }));
  };
  useEffect(() => {
    orderId &&
      dispatch(getOrderById({ id: orderId })).then(({ payload, error }) => {
        if (error) {
          UniversalModal(error.message, "error");
        } else {
          setDatas(payload);
        }
      });
    return () => {
      // dispatch(filterSubcategories([]));
      // dispatch(filterSubcategories2([]));
      dispatch(filterCategories([]));
      dispatch(clearSubcategories());
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllregions());
  }, [dispatch]);

  return (
    <>
      <div className='py-6'>
        {isVisibleFilter && (
          <div
            className='fixed top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-50 '
            onClick={() => setIsVisibleFilter(false)}
          >
            <Filter
              onClick={() => setIsVisibleFilter(false)}
              setFilterVisible={() => setIsVisibleFilter(false)}
              filterVisible={isVisibleFilter}
            />
          </div>
        )}
        <div className='container max-w-[800px]'>
          <div className='text-[28px] text-alotrade font-bold mb-3 text-center'>
            Изменить заказ
          </div>
          {/* <CheckboxList
            list={tradetypes}
            checkedList={tradeTypes}
            cols={2}
            headerText="Тип торговли*"
            headerStyle="text-sm"
            listStyle="ml-0"
            onChange={changeTradeTypes}
          /> */}
          <SelectRegion
            region={region}
            selectRegion={selectRegion}
            selectDistrict={selectDistrict}
            district={district}
            districts={districts}
            regions={regions}
            loading={loading}
            labelRegion={"Страна"}
            labelDistrict={"Область"}
          />
          <SelectCategory
            isMulti={true}
            notShowSub={true}
            categories={categories}
            selectCategory={selectCategory}
            categoriesWithSubcategories={categoriesWithSubcategories}
            loading={loading}
            labelCategory={"Категория*"}
            openSubcategories={() => setIsVisibleFilter(!isVisibleFilter)}
            kategoriya='Выбрать...'
          />

          <Input
            label='Название*'
            labelStyle='font-normal'
            placeholder='Название товара или услуги'
            name='name'
            onChange={changeHandler}
            value={name}
          />
          <Description
            name='description'
            value={description}
            onChange={changeHandler}
            label='Описание*'
            labelStyle='font-normal'
            placeholder='Опишите подробнее'
          />
          <div className='grid grid-cols-2'>
            {/*<CheckboxList*/}
            {/*  onChange={changeStatus}*/}
            {/*  list={positions}*/}
            {/*  headerText="Holati*"*/}
            {/*  headerStyle="text-sm text-[#777]"*/}
            {/*  checkedList={statuses}*/}
            {/*/>*/}
            <RadioButtonList
              currency={currency}
              onChange={changeCurrency}
              list={currencices}
              label='Способ оплаты'
              name={uniqueId("valyuta")}
            />
            <MinMaxPrice
              onChange={changeHandler}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
          <UploadImages images={images} setImages={setImages} />
          <div className='text-sm text-red-600 font-amazonbold text-center'>
            {errors && errors}
          </div>
          <div className='flex justify-center'>
            <SaveButton
              title='Изменить'
              className='w-[200px] mt-3'
              onClick={submitHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
