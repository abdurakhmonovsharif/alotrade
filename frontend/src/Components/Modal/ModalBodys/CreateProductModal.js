import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckboxList from "../../CheckboxList/CheckboxList";
import { filter, forEach, map, some, uniqueId } from "lodash";
import SelectRegion from "../../Select/SelectRegion";
import SelectCategory from "../../Select/SelectCategory";
import Input from "../../Inputs/Input";
import Description from "../../Inputs/Description";
import SaveButton from "../../Buttons/SaveButton";
import MinMaxPrice from "../../MinMaxPrice/MinMaxPrice";
import RadioButtonList from "../../RadioButtons/RadioButtonList";
import { currencices } from "../../../Config/globalConstants";
import UploadImages from "../../ImageCrop/UploadImages";
import { checkRegisterProduct } from "../../../Pages/User/Products/constants";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../Pages/User/Products/productSlice";
import universalModal from "../UniversalModal";

const CreateProductModal = ({ closeModal, productId }) => {
  const dispatch = useDispatch();
  const { tradetypes } = useSelector((state) => state.trade);
  const { loading } = useSelector((state) => state.login);
  const { regions } = useSelector((state) => state.regions);
  const { categoriesWithSubcategories } = useSelector(
    (state) => state.categories
  );

  const [tradeTypes, setTradeTypes] = useState([]);
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [currency, setCurrency] = useState("UZS");
  const [districts, setDistricts] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
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

  // const changeStatus = (e) => {
  //   clearErrors();
  //   const value = e.target.value;
  //   const checked = e.target.checked;
  //   const filtered = filter(statuses, (status) => status !== value);
  //   checked ? setStatuses([...filtered, value]) : setStatuses([...filtered]);
  // };

  const filterSubcategory = (categories) => {
    clearErrors();
    const filterSubcategory = filter(subcategories, (subcategory) =>
      some(categories, ["value", subcategory.category])
    );
    setSubcategories(filterSubcategory);
  };

  const filterAllSubcategories = (e) => {
    clearErrors();
    let subCategories = [];
    forEach(e, (category) => subCategories.push(...category.subcategories));
    setAllSubcategories(subCategories);
  };
  const selectCategory = (e) => {
    clearErrors();
    setCategories(e);
    filterAllSubcategories(e);
    filterSubcategory(e);
  };

  const selectSubcategory = (e) => {
    clearErrors();
    filterAllSubcategories(categories);
    setSubcategories(e);
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
    const Category = map(categories, (category) => category.value);
    const Subcategory = map(subcategories, (subcategory) => subcategory.value);
    const data = {
      name,
      description: description,
      tradetypes: tradeTypes,
      region: region.value,
      district: district.value,
      categories: Category,
      subcategories: Subcategory,
      status: statuses,
      currency,
      images,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    };
    const check = checkRegisterProduct({ ...data, setErrors });
    check &&
      dispatch(
        productId
          ? updateProduct({ id: productId, ...data })
          : createProduct({ ...data })
      ).then(({ error }) => {
        if (!error) {
          closeModal();
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
    setCategories && setCategories(categories);
    subcategories && setSubcategories(subcategories);
    status && setStatuses(status);
    currency && setCurrency(currency);
    images && setImages(images);
    minPrice && setMinPrice(minPrice);
    maxPrice && setMaxPrice(maxPrice);
  };
  useEffect(() => {
    productId &&
      dispatch(getProductById({ id: productId })).then(({ payload, error }) => {
        if (error) {
          universalModal(error.message, "error");
        } else {
          const { product } = payload;
          setDatas(product);
        }
      });
  }, [dispatch, productId]);

  return (
    <div className="p-1">
      <div className="text-base font-amazonbold mb-3">Yangi mahsulot</div>
      <CheckboxList
        list={tradetypes}
        checkedList={tradeTypes}
        cols={2}
        headerText="Savdo turi*"
        headerStyle="text-sm"
        listStyle="ml-0"
        onChange={changeTradeTypes}
      />
      <SelectRegion
        region={region}
        selectRegion={selectRegion}
        selectDistrict={selectDistrict}
        district={district}
        districts={districts}
        regions={regions}
        loading={loading}
        labelRegion={"Viloyat"}
        labelDistrict={"Tuman"}
      />
      <SelectCategory
        categories={categories}
        selectCategory={selectCategory}
        selectSubcategory={selectSubcategory}
        subcategories={subcategories}
        categoriesWithSubcategories={categoriesWithSubcategories}
        allSubcategories={allSubcategories}
        loading={loading}
        labelCategory={"Kategoriya*"}
        labelSubcategory={"Kategoriya turi*"}
      />

      <Input
        onKeyUp={enterHandler}
        label="Nomi*"
        labelStyle="font-normal"
        placeholder="Mahsulot yoki xizmat nomi"
        name="name"
        onChange={changeHandler}
        value={name}
      />
      <Description
        onKeyUp={enterHandler}
        name="description"
        value={description}
        onChange={changeHandler}
        label="Qo'shimcha ma'lumot*"
        labelStyle="font-normal"
        placeholder="Izoh"
      />
      <div className="grid grid-cols-2">
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
          label="To'lov turi"
          name={uniqueId("valyuta")}
        />
        <MinMaxPrice
          onChange={changeHandler}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onKeyUp={enterHandler}
        />
      </div>
      <UploadImages images={images} setImages={setImages} />
      <div className="text-sm text-red-600 font-amazonbold text-center">
        {errors && errors}
      </div>
      <div>
        <SaveButton
          title="Saqlash"
          className="w-full mt-3"
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default CreateProductModal;
