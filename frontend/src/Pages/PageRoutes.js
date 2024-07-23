import React, { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import protectedRoutes, { unProtectedRoutes } from "./ProtectedRoutes";
import Loader from "../Components/Loader/Loader";
import Navbar from "./User/Navbar/Navbar";
import Filter from "./Filter/Filter";
import { getAllCategories } from "./Category/categorySlice";
import { getAllregions } from "./Filter/regionsSlice";
import { getTradeTypes } from "./Filter/tradeSlice";
import useWindowSize from "../hooks/useWindowSize";
import MobileNavbar from "./User/Navbar/MobileNavbar";
import Footer from "../Components/Footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import CampaignIcon from "@mui/icons-material/Campaign";
import {
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  Drawer as MuiDrawer,
  Paper,
  SwipeableDrawer,
} from "@mui/material";

import Modal from "react-modal";

import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import CategoryCard from "./User/Carousels/CategoryCard";
import { Button, Popover } from "@nextui-org/react";
import UniversalModal from "../Components/Modal/UniversalModal";

import MdDrawer from "react-modern-drawer";

const PageRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [stateDrawer, setStateDrawer] = useState(false);

  const { categoriesWithSubcategories: categories } = useSelector(
    (state) => state.categories
  );
  const {
    userData: { user, organization },
    logged,
  } = useSelector((state) => state.login);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleOrg, setModalVisibleOrg] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const { tradetypes } = useSelector((state) => state.trade);
  const { regions } = useSelector((state) => state.regions);
  const [pathName, setPathName] = useState(location.pathname.split("/")[1]);

  const { width } = useWindowSize();

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const filterVisible =
    pathName !== "profile" &&
    pathName !== "sign-in" &&
    pathName !== "sign-up" &&
    pathName !== "offers" &&
    pathName !== "organization";

  useEffect(() => {
    dispatch(getAllCategories());
    setPathName(location.pathname.split("/")[1]);
  }, [location.pathname]);
  return (
    <>
      <div className='flex flex-col w-full relative'>
        <Navbar />
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
                    ind={ind}
                    category={category}
                    key={ind}
                    onClick={() => setStateDrawer(false)}
                  />
                ))}
            </div>
          </div>
        </SwipeableDrawer>
        {width < 720 && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              width: "100vw",
            }}
            elevation={3}
          >
            <BottomNavigation
              sx={{
                paddingY: 0,
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                width: "100vw",
                borderTop: "0.8px solid #eee",
              }}
              showLabels
              // value={value}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            >
              <BottomNavigationAction
                icon={<HomeIcon />}
                onClick={() => navigate("/")}
              />
              <BottomNavigationAction
                // label='Favorites'
                onClick={() => setStateDrawer(!stateDrawer)}
                icon={<GridViewIcon />}
              />

              <MdDrawer
                className='h-[500px]'
                style={{
                  height: "fit-content",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                open={isOpenAdd}
                onClose={() => setIsOpenAdd(false)}
                direction='bottom'
              >
                <div className='flex flex-col gap-3 mx-5'>
                  <div className='flex flex-col p-4 bg-white rounded-xl'>
                    {(!logged || !organization) && (
                      <>
                        <button
                          onClick={() => {
                            navigate("/sign-up/business");
                            setIsOpenAdd(false);
                          }}
                          className='flex items-start px-3 py-2 text-[14px]'
                        >
                          {"Добавить организацию"}
                        </button>
                        <span className='w-full h-[1px] bg-neutral-200' />
                      </>
                    )}
                    <button
                      onClick={() => {
                        logged ? navigate("/create_order") : openModal();
                        setIsOpenAdd(false);
                      }}
                      className='flex items-start px-3 py-2 text-[14px]'
                    >
                      {"Создать заказ"}
                    </button>
                    <span className='w-full h-[1px] bg-neutral-200' />

                    <button
                      onClick={() => {
                        logged
                          ? organization
                            ? organization?.is_active
                              ? navigate("/create_announcement")
                              : setModalVisibleOrg(true)
                            : openModal()
                          : navigate("/create_announcement");
                        setIsOpenAdd(false);
                      }}
                      className='flex items-start px-3 py-2 text-[14px]'
                    >
                      {"Создать рекламу"}
                    </button>
                    <span className='w-full h-[1px] bg-neutral-200' />
                    <button
                      onClick={() => {
                        logged
                          ? organization
                            ? organization?.is_active
                              ? navigate("/create_product")
                              : setModalVisibleOrg(true)
                            : navigate("/create_product")
                          : openModal();
                        setIsOpenAdd(false);
                      }}
                      className='flex items-start px-3 py-2 text-[14px]'
                    >
                      {"Создать товар"}
                    </button>
                  </div>
                  <button
                    onClick={() => setIsOpenAdd(false)}
                    className='text-[14px] font-bold flex items-center justify-center py-3 mb-5 bg-white rounded-xl'
                  >
                    Отмена
                  </button>
                </div>
              </MdDrawer>

              <BottomNavigationAction
                onClick={() => setIsOpenAdd(true)}
                icon={<AddCircleIcon sx={{ width: "50px" }} />}
              />

              {/* <Popover isOpen={isOpenAdd} onOpenChange={setIsOpenAdd}>
                <Popover.Trigger>
                  
                </Popover.Trigger>
                <Popover.Content
                  style={{ width: "100%", backgroundColor: "transparent" }}
                >
                  
                </Popover.Content>
              </Popover> */}
              {/* 
              <Dialog
                sx={{
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "transparent",
                }}
                open={true}
                // TransitionComponent={Transition}
                keepMounted
                // onClose={handleClose}
                aria-describedby='alert-dialog-slide-description'
              >
                <div className='w-[80vw] h-[100vh] bottom-0 left-0'>
                  <div className='flex items-end w-full h-fit bg-transparent'>
                    <span className='bg-red-500 h-fit'>sddg</span>
                  </div>
                </div>
              </Dialog> */}

              <MdDrawer
                className='h-[500px]'
                style={{
                  height: "fit-content",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                open={isOpenSearch}
                onClose={() => setIsOpenSearch(false)}
                direction='bottom'
              >
                <div className='flex flex-col gap-3 mx-5'>
                  <div className='flex flex-col p-4 bg-white rounded-xl'>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setIsOpenSearch(false);
                      }}
                      className='flex items-start px-3 py-2 text-[14px]'
                    >
                      {"Найти заказ"}
                    </button>
                    <span className='w-full h-[1px] bg-neutral-200' />

                    <button
                      onClick={() => {
                        navigate("/organizations");
                        setIsOpenSearch(false);
                      }}
                      className='flex items-start px-3 py-2 text-[14px]'
                    >
                      {"Найти поставщика"}
                    </button>
                    <span className='w-full h-[1px] bg-neutral-200' />

                    <button
                      onClick={() => {
                        navigate("/products");
                        setIsOpenSearch(false);
                      }}
                      className='flex items-start px-3 py-2 text-[14px]'
                    >
                      {"Найти товар"}
                    </button>
                  </div>
                  <button
                    onClick={() => setIsOpenSearch(false)}
                    className='text-[14px] font-bold flex items-center justify-center py-3 mb-5 bg-white rounded-xl'
                  >
                    Отмена
                  </button>
                </div>
              </MdDrawer>

              <BottomNavigationAction
                icon={<SearchIcon />}
                onClick={() => setIsOpenSearch(true)}
              />

              <BottomNavigationAction
                onClick={() => navigate("/announcements")}
                icon={<CampaignIcon />}
              />
            </BottomNavigation>
            <UniversalModal
              body={"warningSignIn"}
              isOpen={modalVisible}
              typeOfWarning={"user"}
              closeModal={() => setModalVisible(false)}
            />
            <UniversalModal
              body={"warningOrg"}
              isOpen={modalVisibleOrg}
              closeModal={() => setModalVisibleOrg(false)}
              toggleModal={() => setModalVisibleOrg(false)}
            />
          </div>
        )}
        {/* {filterVisible && (
        <Filter
          categories={categories}
          regions={regions}
          tradeTypes={tradetypes}
        />
      )} */}
        <Suspense fallback={<Loader />}>
          <Routes>
            {protectedRoutes()}
            {unProtectedRoutes()}
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default PageRoutes;
