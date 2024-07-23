import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from "../../../Components/Buttons/LoginButton";
import Logo from "../../../Components/Logo/Logo";
import Menu from "../../../Components/Navbar/Menu";
import { getTranslations, navs, toggleMenu, guestNavs } from "./constants";
import UserProfile from "../../../Components/Navbar/UserProfile";
import { logOut } from "../../Sign/signSlice";
import { useTranslation } from "react-i18next";
import LogoImg from "../../../assets/images/logo.png";
import LogoImg2 from "../../../assets/images/logo2.png";
import useWindowSize from "../../../hooks/useWindowSize";
import { IoIosMail } from "react-icons/io";
import { HiOutlineBellAlert } from "react-icons/hi2";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import CategoryCard from "../Carousels/CategoryCard";
import { Menu as CustomMenu } from "@mui/material";
import { ChevronDownIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import OrderIcon from "../../../Components/Tabs/MainTabs/icons/OrderIcon";
import ProductIcon from "../../../Components/Tabs/MainTabs/icons/ProductIcon";
import SellerIcon from "../../../Components/Tabs/MainTabs/icons/SellerIcon";
import AddIcon from "../../../Components/Tabs/MainTabs/icons/AddIcon";
import PriceIcon from "../../../Components/Tabs/MainTabs/icons/PriceIcon";
import UniversalModal from "../../../Components/Modal/UniversalModal";
import { getTradeTypes } from "../../Filter/tradeSlice";
import { filterName, filterTradeTypes } from "../../Filter/filterSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const translations = getTranslations(t);
  const { width } = useWindowSize();
  const [navbarExpended, setNavbarExpended] = useState(false);
  const [navigations, setNavigations] = useState(navs);
  const changeHandler = () => {
    setNavbarExpended(!navbarExpended);
  };
  const {
    userData: { user, organization },
    logged,
  } = useSelector((state) => state.login);

  const pageNotIncludes = !(
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/announcements") ||
    location.pathname.startsWith("/organizations")
  );

  const { categoriesWithSubcategories: categories } = useSelector(
    (state) => state.categories
  );

  const {
    tradetypes: filterTradeTypesData,
    categories: categoriesList,
    subcategories: subcategoriesList,
    subcategories2: subcategoriesList2,
    districts,
    regions: regionsList,
  } = useSelector((state) => state.filter);

  const [stateDrawer, setStateDrawer] = useState(false);

  const { offers } = useSelector((state) => state.offers);
  const { tradetypes } = useSelector((state) => state.trade);
  const isNewMessage = offers.filter((offer) => {
    const { messages } = offer;
    const { isRead, user: chatUser } = messages;
    const isNew = chatUser !== user?._id && !isRead;
    return isNew && offer;
  });

  const closeHandler = () => {
    dispatch(logOut());
    setNavbarExpended(false);
  };
  const toggle = toggleMenu(closeHandler, changeHandler);

  const [isOpen, setIsOpen] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleOrg, setModalVisibleOrg] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch(getTradeTypes());
    if (!logged) {
      setNavigations([
        ...navs.filter((nav) => !guestNavs.includes(nav.path.slice(1))),
      ]);
    } else {
      setNavigations(navs);
    }
  }, [logged]);

  const [anchorCustomer, setAnchorCustomer] = useState(null);
  const openCustomer = Boolean(anchorCustomer);
  const handleClickCustomer = (event) => {
    setAnchorCustomer(event.currentTarget);
  };
  const handleCloseCustomer = () => {
    setAnchorCustomer(null);
  };

  const [anchorSeller, setAnchorSeller] = useState(null);
  const openSeller = Boolean(anchorSeller);
  const handleClickSeller = (event) => {
    setAnchorSeller(event.currentTarget);
  };
  const handleCloseSeller = () => {
    setAnchorSeller(null);
  };

  const [searchData, setSearchData] = useState();

  const [tradeType, setTradeType] = React.useState([]);

  const handleChange = (event) => {
    dispatch(filterTradeTypes([event.target.value]));
  };

  return (
    <div className='flex flex-col w-full z-10'>
      <div
        class='
        ud-header
        bg-alotrade
        z-40
        w-full
        flex
        items-center
      '
      >
        <div class='container w-full'>
          <div class='flex py-3  -mx-4 items-center justify-between relative'>
            <div class='px-4 md:pr-4 pr-0 hidden sm:flex w-fit max-w-full flex-none'>
              <Link
                to='/'
                class='navbar-logo w-full block text-white text-center font-bold text-[32px]'
              >
                <img
                  src={width < 720 ? LogoImg : LogoImg2}
                  alt='as'
                  width={width < 720 ? 50 : 200}
                />
              </Link>
            </div>
            <div class='flex pl-5 px-3 gap-2 md:px-4 justify-between items-center w-full'>
              <div className='rounded-0 py-0 w-full'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(filterName(searchData));
                    navigate("/products");
                  }}
                  className='w-full max-w-[500px]'
                >
                  <OutlinedInput
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    size='small'
                    sx={{
                      width: "100%",
                      borderRadius: "13px",
                      backgroundColor: "#fff",
                    }}
                    id='outlined-basic'
                    // label='Outlined'
                    placeholder='Поиск...'
                    variant='outlined'
                    startAdornment={
                      <Search color='gray' sx={{ marginRight: "5px" }} />
                    }
                  />
                </form>
                {/* <nav
                id='navbarCollapse'
                className='
                  absolute
                  py-5
                   lg:px-4
                  xl:px-6
                  lg:bg-transparent
                  bg-white
                  
                  shadow-lg
                  rounded-lg
                  max-w-[250px]
                  w-full
                  lg:max-w-full lg:w-full
                  right-4
                  top-full
                  hidden
                  md:block lg:static lg:shadow-none
                '
              >
                {/* <Menu navs={navigations} translations={translations} /> 
              </nav> */}
              </div>
              <div class='sm:flex flex-none flex items-center justify-end lg:pr-0'>
                {/* <Link to={"/offers"} className='block md:hidden mr-4 relative'>
                  <IoIosMail size={30} color={"white"} />
                  {isNewMessage.length > 0 && (
                    <HiOutlineBellAlert
                      className='fill-yellow-400 absolute top-0 right-[-10%]'
                      size={15}
                    />
                  )}
                </Link> */}
                {user ? (
                  <UserProfile
                    isOrg={organization}
                    user={user}
                    toggleMenu={toggle}
                    navbarExpended={navbarExpended}
                    changeHandler={changeHandler}
                  />
                ) : (
                  <LoginButton title={translations.kirish} />
                )}
              </div>
            </div>
          </div>
          {/* <Logo />
        <Outlet />
        <Menu navs={navs} translations={translations} />
        <div className="">
          {user ? (
            <UserProfile
              user={user}
              toggleMenu={toggle}
              navbarExpended={navbarExpended}
              changeHandler={changeHandler}
            />
          ) : (
            <LoginButton title={translations.kirish} />
          )}
        </div> */}
        </div>
      </div>
      <div className='hidden sm:flex flex-row items-center justify-between w-full bg-white border-b-[13px] border-b-[#CEFBFD] px-[80px]'>
        <div className='flex flex-row gap-3 items-center py-1'>
          <SwipeableDrawer
            anchor='left'
            open={stateDrawer}
            onClose={() => setStateDrawer(false)}
            onOpen={() => setStateDrawer(true)}
          >
            {" "}
            <div className='py-2 md:py-6 px-8 flex flex-col items-start overflow-y-scroll'>
              <span className='text-[22px] font-bold mb-3'>{"Категории"}</span>
              <div className='flex flex-col gap-1 items-start'>
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, ind) => (
                    <CategoryCard
                      onClick={() => setStateDrawer(false)}
                      ind={ind}
                      category={category}
                    />
                  ))}
              </div>
            </div>
          </SwipeableDrawer>
          {/* {pageNotIncludes && (
            <button
              onClick={() => {
                setStateDrawer(true);
              }}
              className='h-fit text-[18px] p-2 rounded-xl text-neutral-800 hover:text-neutral-900 hover:bg-alotrade/20'
            >
              {"Категории"}
            </button>
          )} */}
          <nav
            id='navbarCollapse'
            className='
                  absolute
               py-1
                   lg:px-4
                  xl:px-6
                  lg:bg-transparent
                  bg-white
                  
                  shadow-lg
                  rounded-lg
                  max-w-[250px]
                  w-full
                  lg:max-w-full lg:w-full
                  right-4
                  top-full
                  hidden
                  md:block lg:static lg:shadow-none
                '
          >
            <Menu navs={navigations} translations={translations} />
          </nav>
        </div>
        <div className='flex flex-row items-center gap-3 font-bold'>
          <button
            className='flex flex-row items-center gap-2 h-fit text-[15px] p-2 rounded-xl text-neutral-800 hover:text-neutral-900 hover:bg-alotrade/20'
            id='customer-button'
            onClick={handleClickCustomer}
          >
            {"Покупателям"}
            <ChevronDownIcon className='w-[15px] stroke-[2px] text-alotrade' />
          </button>

          <button
            className='flex flex-row items-center gap-2 h-fit text-[15px] p-2 rounded-xl text-neutral-800 hover:text-neutral-900 hover:bg-alotrade/20'
            id='customer-button'
            onClick={handleClickSeller}
          >
            {"Продавцам"}
            <ChevronDownIcon className='w-[15px] stroke-[2px] text-alotrade' />
          </button>

          {false && (
            <FormControl size='small' sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id='trade-type-label' sx={{ fontSize: "14px" }}>
                {filterTradeTypesData.length == 0 && "Тип торговля"}
              </InputLabel>
              <Select
                InputLabelProps={{ shrink: false }}
                autoWidth={false}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  border: 0,
                  borderRadius: "10px",
                  padding: 0,
                  backgroundColor: "#00C2CB4d",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#000",
                  width: "100%",
                  overflow: "hidden",
                }}
                labelId='trade-type-label'
                id='trade-type'
                value={filterTradeTypesData[0]}
                onChange={handleChange}
              >
                {/* <MenuItem value=''>
                  <em>{"Выбрать тип торговли"}</em>
                </MenuItem> */}
                {tradetypes &&
                  tradetypes.map((el, index) => {
                    return (
                      <MenuItem key={index} value={el._id}>
                        {el.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}

          <CustomMenu
            id='customer-menu'
            anchorEl={anchorCustomer}
            open={openCustomer}
            onClose={handleCloseCustomer}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              sx: {
                width: "250px",
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseCustomer();
                logged ? navigate("/create_order") : openModal();
              }}
              className='flex flex-row items-center gap-3'
            >
              <OrderIcon className={"md:w-[25px] w-[20px] fill-orange-700"} />
              {"Создать заявку"}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseCustomer();
                navigate("/products");
              }}
              className='flex flex-row items-center gap-3'
            >
              <ProductIcon className={"md:w-[25px] w-[20px] fill-orange-700"} />
              {"Товары"}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseCustomer();
                navigate("/organizations");
              }}
              className='flex flex-row items-center gap-3'
            >
              <SellerIcon className={"md:w-[25px] w-[20px] fill-orange-700"} />
              {"Поставщики"}
            </MenuItem>
          </CustomMenu>
          <CustomMenu
            id='customer-menu'
            anchorEl={anchorSeller}
            open={openSeller}
            onClose={handleCloseSeller}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              sx: {
                width: "250px",
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseSeller();
                navigate("/orders");
              }}
              className='flex flex-row items-center gap-3'
            >
              <OrderIcon className={"md:w-[25px] w-[20px] fill-orange-700"} />
              {"Все заявки"}
            </MenuItem>
            {(!logged || !organization) && (
              <MenuItem
                onClick={() => {
                  handleCloseSeller();
                  navigate("/sign-up/business");
                }}
                className='flex flex-row items-center gap-3'
              >
                <AddIcon className={"md:w-[25px] w-[20px] fill-orange-700"} />
                {"Добавить компанию"}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                handleCloseSeller();
                organization
                  ? organization?.is_active
                    ? navigate("/create_announcement")
                    : setModalVisibleOrg(true)
                  : navigate("/create_announcement");
              }}
              className='flex flex-row items-center gap-3'
            >
              <MegaphoneIcon
                className={"md:w-[25px] w-[20px] stroke-orange-700"}
              />
              {"Создать рекламу"}
            </MenuItem>
          </CustomMenu>
          <UniversalModal
            body={"warningSignIn"}
            isOpen={modalVisible}
            typeOfWarning={"user"}
            closeModal={() => setModalVisible(false)}
            toggleModal={() => setModalVisible(false)}
          />

          <UniversalModal
            body={"warningOrg"}
            isOpen={modalVisibleOrg}
            closeModal={() => setModalVisibleOrg(false)}
            toggleModal={() => setModalVisibleOrg(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
