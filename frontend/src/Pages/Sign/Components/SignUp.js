import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UserRegister from "../../../Components/Sign/UserRegister";
import BusinessmanRegister from "../../../Components/Sign/BusinessmanRegister";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllregions } from "../../Filter/regionsSlice";
import { capitalize, filter, forEach, map, some } from "lodash";
import {
  addOrganization,
  getUser,
  signUpOrganization,
  signUpUser,
} from "../signSlice";
import { checkHandler, checkHandlerAddOrg } from "../constants";
import {
  getAllCategories,
  clearErrorCategories,
} from "../../Category/categorySlice";
import { getTradeTypes } from "../../Filter/tradeSlice";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../../translation";
import {
  clearFilters,
  filterCategories,
  filterSubcategories,
  filterSubcategories2,
} from "../../Filter/filterSlice.js";
import Api from "../../../Config/Api";
import { getSubcategories } from "../../Category/categorySlice";
import userImg from "../../../assets/images/userRegister.jpg";
import organizationImg from "../../../assets/images/organizationRegister.jpg";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(["common"]);
  const translations = getTranslations(t);
  const { regions, error: errorRegion } = useSelector((state) => state.regions);
  const { categoriesWithSubcategories, error: errorCategories } = useSelector(
    (state) => state.categories
  );
  const {
    subcategories: subcategoriesList,
    subcategories2: subcategoriesList2,
  } = useSelector((state) => state.filter);

  const {
    userData: { user, organization },
    logged,
  } = useSelector((state) => state.login);
  const { loading } = useSelector((state) => state.login);
  const { tradetypes } = useSelector((state) => state.trade);
  const href = window.location.href.split("/");
  const [url, setUrl] = useState(href[href.length - 1]);
  const changeUrl = (e) => {
    setUrl(e.target.name);
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [tradeTypes, setTradeTypes] = useState([]);
  const [address, setAddress] = useState("");

  const clearDatas = () => {
    setFirstname("");
    setImage("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setRegion("");
    setDistrict("");
    setCategories([]);
    setSubcategories([]);
    setName("");
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "firstname" && setFirstname(capitalize(value));
    name === "lastname" && setLastname(capitalize(value));
    name === "email" && setEmail(value);
    name === "password" && setPassword(value);
    name === "confirmPassword" && setConfirmPassword(value);
    name === "district" && setDistrict(value);
    name === "phone" && setPhone(value);
    name === "name" && setName(value.toUpperCase());
    name === "address" && setAddress(value);
  };

  const selectRegion = (e) => {
    setRegion(e);
    setDistricts(e.districts);
  };

  const selectDistrict = (e) => {
    setDistrict(e);
  };

  const filterSubcategory = (categories) => {
    const filterSubcategory = filter(subcategories, (subcategory) =>
      some(categories, ["value", subcategory.category])
    );
    setSubcategories(filterSubcategory);
  };

  const selectCategory = (e) => {
    setCategories(e);

    // dispatch(filterSubcategories([]));
    // dispatch(filterSubcategories2([]));
    dispatch(filterCategories([e.value]));
    // dispatch(getSubcategories({ category: e.value }));
  };

  const selectSubcategory = (e) => {
    setSubcategories(e);
  };

  const changeTradeTypes = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const filtered = filter(tradeTypes, (tradeType) => tradeType !== value);
    checked
      ? setTradeTypes([...filtered, value])
      : setTradeTypes([...filtered]);
  };

  const enterHandler = (e) => {
    e.preventDefault();
    e.key === "Enter" && submitHandler();
  };

  const submitHandler = () => {
    const data = logged
      ? {
          phone: phone.length === 9 ? `+998${phone}` : phone,
          region: region._id,
          district: district._id,
          image,
        }
      : {
          firstname,
          lastname,
          password,
          phone: phone.length === 9 ? `+998${phone}` : phone,
          region: region._id,
          district: district._id,
          image,
        };
    // if (url === "sign-up") {
    //   data.phone = phone.length === 9 ? `+998${phone}` : phone;
    // } else {
    //   data.phones = { phone1: phone.length === 9 ? `+998${phone}` : phone };
    // }
    const check = logged
      ? checkHandlerAddOrg({
          ...data,
          url,
          categories,
          subcategories: subcategoriesList,
          name,
          email,
          confirmPassword,
          tradeTypes,
          t,
        })
      : checkHandler({
          ...data,
          url,
          categories,
          name,
          // email,
          // confirmPassword,
          tradeTypes,
          t,
        });
    if (email !== "") {
      data.email = email;
    }
    if (address !== "") {
      data.address = address;
    }
    check && createHandler(data);
  };

  const createHandler = (data) => {
    const Categories = map(categories, (category) => category._id);

    dispatch(
      url === "sign-up"
        ? signUpUser({ ...data })
        : logged
        ? addOrganization({
            ...data,
            categories: [categories._id],
            subcategories: subcategoriesList,
            subcategories2: subcategoriesList2,
            name,
            tradetypes: tradeTypes,
          })
        : signUpOrganization({
            ...data,
            categories: [categories._id],
            subcategories: subcategoriesList,
            subcategories2: subcategoriesList2,
            name,
            tradetypes: tradeTypes,
          })
    ).then(({ error }) => {
      if (!error) {
        clearDatas();
        logged ? navigate("/profile") : navigate("../");
        dispatch(getUser());
        dispatch(clearFilters());
      }
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const resUpload = await Api.post("/upload", formData);

      setImage(resUpload.data);
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(getAllregions());
    dispatch(getTradeTypes());
  }, [dispatch]);

  useEffect(() => {
    errorRegion && dispatch(clearError());
  }, [errorRegion, dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    errorCategories && dispatch(clearErrorCategories());
  }, [dispatch, errorCategories]);

  return (
    <div className='w-full bg-white flex flex-col'>
      <div className='container m-auto'>
        <div className='container m-auto flex flex-col lg:flex-row'>
          <div className='lg:w-1/2  block mt-5 md:mt-0'>
            <div className='flex flex-col items-center justify-center h-full text-neutral-700'>
              {/* <Link
                onClick={changeUrl}
                name="sign-up"
                to="/sign-up"
                className={`font-semibold text-xl cursor-pointer text-center py-2 px-4 my-3 w-full  ${
                  url === "sign-up" && "bg-white-900 shadow"
                } `}
              >
                {translations.buyurtmachi}
              </Link> */}
              <div className=''>
                <input
                  onChange={handleFileChange}
                  type='file'
                  id='fileInput'
                  className='hidden w-0 h-0'
                />
                <label
                  className='flex flex-col items-center gap-3 '
                  for='fileInput'
                >
                  <div className=' cursor-pointer w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-2'>
                    {" "}
                    <img
                      src={
                        image != ""
                          ? image
                          : location.pathname.includes("sign-up/business")
                          ? organizationImg
                          : userImg
                      }
                      alt='img'
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <span className='text-[14px] text-white font-bold bg-alotrade px-3 py-1 rounded-lg'>
                    Загрузить фото{" "}
                  </span>
                </label>
                {/* <img
                  src={
                    location.pathname.includes("sign-up/business")
                      ? organizationImg
                      : userImg
                  }
                  alt='img'
                  width={300}
                /> */}
              </div>
            </div>
          </div>
          <div className='lg:w-1/2 w-full'>
            <Outlet />
            <Routes>
              <Route
                path='/'
                element={
                  <UserRegister
                    translations={translations}
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    phone={phone}
                    region={region}
                    district={district}
                    changeHandler={changeHandler}
                    selectRegion={selectRegion}
                    selectDistrict={selectDistrict}
                    regions={regions}
                    districts={districts}
                    enterHandler={enterHandler}
                    submitHandler={submitHandler}
                    loading={loading}
                  />
                }
              />
              <Route
                path='business'
                element={
                  <BusinessmanRegister
                    translations={translations}
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    phone={phone}
                    region={region}
                    district={district}
                    changeHandler={changeHandler}
                    selectRegion={selectRegion}
                    selectDistrict={selectDistrict}
                    regions={regions}
                    districts={districts}
                    enterHandler={enterHandler}
                    submitHandler={submitHandler}
                    loading={loading}
                    categoriesWithSubcategories={categoriesWithSubcategories}
                    categories={categories}
                    selectCategory={selectCategory}
                    subcategories={subcategories}
                    allSubcategories={allSubcategories}
                    selectSubcategory={selectSubcategory}
                    name={name}
                    tradetypes={tradetypes}
                    changeTradeTypes={changeTradeTypes}
                    tradeTypes={tradeTypes}
                    address={address}
                  />
                }
              />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className='bottom-0 bg-white-900 w-full'>
        <div className='container m-auto text-center'>
          By{" "}
          <Link
            to='/'
            className='py-4 inline-block text-blue-500 cursor-pointer underline'
          >
            Alo24
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
