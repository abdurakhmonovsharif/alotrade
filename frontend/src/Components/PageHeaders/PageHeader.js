import React, { useState } from "react";
import AddButton from "../Buttons/AddButton";
import RadioButtonList from "../RadioButtons/RadioButtonList";
import Pagination from "../Pagination/Pagination";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { filterName, filterTradeTypes } from "../../Pages/Filter/filterSlice";
import { GoSettings } from "react-icons/go";
import { AiOutlineGlobal } from "react-icons/ai";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const PageHeader = ({
  onClick,
  buttonTitle,
  countTitle,
  count,
  handleFilter,
  filterData,
  filter,
  translations,
  setFilterVisible,
  setFilterBody,
  mainTitle,
  isOrganization,
  filterBtnClick,
}) => {
  const location = useLocation();
  const { tradetypes } = useSelector((state) => state.trade);

  const {
    tradetypes: filterTradeTypesData,
    categories: categoriesList,
    subcategories: subcategoriesList,
    subcategories2: subcategoriesList2,
    districts,
    regions: regionsList,
  } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
const navigate=useNavigate()
  const [tradeType, setTradeType] = useState("");

  const handleChange = (event) => {
    // event.target.value != "" &&
    dispatch(
      filterTradeTypes(event.target.value != "" ? [event.target.value] : [])
    );
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      dispatch(filterName(name));
    }
  };

  const handleSearch = () => {
    dispatch(filterName(name));
  };
  const navigateBack=()=>{
    const indexOfFirstSlash=location.pathname.indexOf("/");
    const withOutBaseURL=location.pathname.substring(indexOfFirstSlash+1);
    if(withOutBaseURL.includes("organizations_sub/")){
      navigate(-1)
    }else if(location.pathname.includes("organizations_sub")){
      navigate(-1)
    }
  }
  return (
    <div className='w-full pt-2 md:pt-6'>
      <div className='flex flex-row items-center md:mb-[-20px] md:flex-row w-full md:justify-between md:items-center'>
        <div className='flex flex-row flex-none gap-2 px-2 md:gap-4 md:justify-start items-center md:mb-[20px]'>
          <button
            className={`flex items-center justify-center gap-2 w-fit  md:w-auto uppercase md:shadow bg-[#00C2CB]/30 md:bg-white md:ml-0 rounded-lg
             border-r-0 border-1 border-[#03c1f6cc]
             font-bold focus:shadow-outline focus:outline-none text-black md:text-xs text-[10px]
              py-[10px] md:py-3 md:px-5 px-3 `}
            onClick={() => {
              setFilterBody("category");
              navigateBack()
            }}
          >
            {/* <GoSettings size={20} className='text-black md:flex hidden' /> */}
            <span>Категории</span>
          </button>
          <button
            className={`flex items-center justify-center gap-2 w-fit bg-[#00C2CB]/30 md:bg-white md:w-auto uppercase md:shadow md:ml-0 rounded-lg
             border-l-0 border-1 border-[#03c1f6cc]
             font-bold focus:shadow-outline focus:outline-none text-black md:text-xs text-[10px]
              py-[10px] md:py-3 md:px-5 px-3 `}
            onClick={() => {
              setFilterBody("country");
            }}
          >
            {/* <AiOutlineGlobal size={20} className='text-black md:flex hidden' /> */}
            <span>Страны</span>
          </button>
          {(location.pathname.startsWith("/products") ||
            location.pathname.startsWith("/profile/products")) && (
            <FormControl
              size='small'
              sx={{
                width: "150px",
                "@media (max-width: 600px)": {
                  width: "130px",
                },
                // marginTop: "-20px",
              }}
            >
              <InputLabel
                shrink={false}
                InputLabelProps={{ shrink: false }}
                id='trade-type-label'
                sx={{ fontSize: "14px" }}
              >
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
                <MenuItem value=''>
                  <em>{"Выбрать тип торговли"}</em>
                </MenuItem>
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
          {/* {buttonTitle && !isOrganization && (
            <button
              className={`block w-full bg-white md:w-auto uppercase shadow md:ml-0 rounded-tl-none rounded-bl-none 
             rounded-r-xl border-l-0 border-1 border-[#03c1f6cc]
             font-bold focus:shadow-outline focus:outline-none text-alotrade md:text-xs text-[10px]
              py-3 md:px-10 px-2 rounded`}
              onClick={onClick}
            >
              {buttonTitle}
            </button>
          )} */}
        </div>
        {/* <div className='flex w-full mb-4 md:mb-0 h-[40px] px-2 md:px-0'>
          {/* <button
            onClick={filterBtnClick}
            className="bg-alotrade py-1 px-4 hidden md:flex items-center gap-2 text-[18px] font-bold text-white rounded-xl mr-[80px]"
          >
            <GoSettings color="#fff" /> <span>Каталог</span>
          </button> 
          <div className='w-[400px] flex'>
            <input
              onKeyUp={enterHandler}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='w-full border rounded-l-xl px-3 text-[18px] py-1 outline-0'
              placeholder={"Поиск"}
            />
            <button
              onClick={handleSearch}
              className='rounded-r-xl w-1/5 bg-alotrade text-white border border-l-0 flex justify-center items-center'
            >
              <IoSearchOutline />
            </button>
          </div>
        </div> */}
        {/* <div className='md:flex flex w-full md:w-[250px] md:justify-end'>
          <FormControl
            size='small'
            sx={{
              width: "55%",
              "@media (max-width: 600px)": {
                width: "100%",
              },
              marginTop: "-20px",
            }}
          >
            <InputLabel
              shrink={false}
              InputLabelProps={{ shrink: false }}
              id='trade-type-label'
              sx={{ fontSize: "14px" }}
            >
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
                borderRadius: "13px",
                padding: 0,
                backgroundColor: "#E2F3FF",
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
              </MenuItem> 
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
        </div> */}
        {/* {buttonTitle && (
          <div className='hidden md:block'>
            <AddButton onClick={onClick} title={buttonTitle} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PageHeader;
