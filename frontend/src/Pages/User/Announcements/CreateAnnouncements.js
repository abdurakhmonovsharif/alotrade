import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
} from "@mui/material";
import UploadImages from "../../../Components/ImageCrop/UploadImages";
import { useDispatch, useSelector } from "react-redux";
import { getTradeTypes } from "../../Filter/tradeSlice";
import { getAllregions } from "../../Filter/regionsSlice";
import { getAllAds } from "../../Admin/AdminPages/AnnsPage/adSlice";
import { Checkbox } from "@nextui-org/react";
import Api from "../../../Config/Api";
import { moneyPattern } from "../../../Config/money";
import { useNavigate } from "react-router-dom";

const CreateAnnouncements = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoriesWithSubcategories: categories } = useSelector(
    (state) => state.categories
  );
  const { tradetypes } = useSelector((state) => state.trade);
  const { ads } = useSelector((state) => state.ads);

  const { regions } = useSelector((state) => state.regions);
  const [selected, setSelected] = useState([]);
  const [selectedTradeType, setSelectedTradeType] = useState([]);

  const {
    userData: { user },
    logged,
  } = useSelector((state) => state.login);

  const [orgs, setOrgs] = useState({});
  const [users, setUsers] = useState({});
  const [all, setAll] = useState({});

  const annSchema = (values) => {
    return yup.object().shape({
      country: yup.array().required("Mamlakat bo'sh bo'lmasligi kerak!"),
      region: yup.string().required("Выберите регион!"),
      title: yup.string().required("Введите заголовку!"),
      desciption: yup.string().required("Введите описание!"),
      categories: yup
        .array()
        .of(yup.string()) // Modify the validation as per your array item type
        .min(1, "Выберите категорию!")
        .required("Выберите категорию!"),
      subcategories: yup.array(),

      tradeTypes: yup.array(),

      targetRegion: yup
        .array()
        // .of(yup.string()) // Modify the validation as per your array item type
        // .min(1, "Выберите регион!")
        .required("Выберите регион!"),
      targetDistrict: yup.array(),

      targetCategories: yup
        .array()
        // .of(yup.string()) // Modify the validation as per your array item type
        // .min(1, "Выберите категорию!")
        .required("Выберите категорию!"),
      targetSubcategories: yup.array(),
      images: yup.array(),
      target: yup.string(),
      type: yup.string(),
      adView: yup.string(),
    });
  };
  const initialValues = {
    country: [],
    categories: [],
    subcategories: [],

    region: "",
    title: "",
    desciption: "",
    images: [],
    target: "",
    type: "simple",
    adView: "all",
    tradeTypes: [],
    targetCategories: [],
    targetSubcategories: [],
    targetRegion: [],
    targetDistrict: [],
  };

  const [pricePerSend, setPricePerSend] = useState(0);

  const fetchPricePerSend = async () => {
    const res = await Api.get("/extra/cost");
    setPricePerSend(res.data[0]);
  };

  useEffect(() => {
    dispatch(getAllregions());
    dispatch(getAllAds());
    fetchCountData();
    fetchPricePerSend();
  }, []);

  const fetchCountData = async () => {
    try {
      const dataAll = await Api.get("/user/getcount?count=all");
      setAll(dataAll.data);
      const dataUsers = await Api.get("/user/getcount?count=users");
      setUsers(dataUsers.data);
      const dataOrgs = await Api.get("/user/getcount?count=orgs");
      setOrgs(dataOrgs.data);
    } catch (err) {}
  };

  useEffect(() => {
    let priceAmount = 0;

    selected.forEach((el) => {
      const searchIndex = ads?.findIndex((tt) => tt._id == el);

      priceAmount += ads[searchIndex].price;
    });
    setSocialPrice(priceAmount);
  }, [selected]);

  const calculateUsersCount = (
    regions,
    categories,
    tradeTypes,
    type,
    adView
  ) => {
    if (type === "simple" || adView === "all") {
      return all?.count;
    }

    if (adView == "users") {
      if (regions.length === 0) {
        return users?.count;
      }
      return users?.data?.filter((el) => regions.some((r) => r == el.region))
        .length;
    }

    if (adView == "orgs") {
      if (
        regions.length === 0 &&
        categories.length == 0 &&
        tradeTypes.length == 0
      ) {
        return orgs?.count;
      }

      if (tradeTypes.length == 0 && categories.length == 0) {
        return orgs?.data?.filter((el) => regions.some((r) => r == el.region))
          .length;
      }

      if (regions.length == 0 && categories.length == 0) {
        return orgs?.data?.filter((el) =>
          tradeTypes.some((r) => el.tradetypes.some((c) => c == r))
        ).length;
      }

      if (regions.length == 0 && tradeTypes.length == 0) {
        return orgs?.data?.filter((el) =>
          categories.some((r) => el.categories.some((c) => c == r))
        ).length;
      }

      if (regions.length === 0) {
        return orgs?.data?.filter(
          (el) =>
            tradeTypes.some((r) => el.tradetypes.some((c) => c == r)) &&
            categories.some((r) => el.categories.some((c) => c == r))
        ).length;
      }

      if (categories.length === 0) {
        return orgs?.data?.filter(
          (el) =>
            tradeTypes.some((r) => el.tradetypes.some((c) => c == r)) &&
            regions.some((r) => r == el.region)
        ).length;
      }

      if (tradeTypes.length === 0) {
        return orgs?.data?.filter(
          (el) =>
            categories.some((r) => el.categories.some((c) => c == r)) &&
            regions.some((r) => r == el.region)
        ).length;
      }

      return orgs?.data?.filter(
        (el) =>
          tradeTypes.some((r) => el.tradetypes.some((c) => c == r)) &&
          categories.some((r) => el.categories.some((c) => c == r)) &&
          regions.some((r) => r == el.region)
      ).length;
    }
    return 0;
  };

  const [socialPrice, setSocialPrice] = useState(0);

  const membersCount = (tradeTypes) => {
    let count = 0;
    tradeTypes.map((el) => {
      const searchIndex = ads?.findIndex((tt) => tt._id == el);
      count += ads[searchIndex]?.members;
    });
    return count;
  };

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-col w-full max-w-[980px] p-8'>
        <span className='font-bold text-[24px] text-center'>
          {"Создать объявление"}
        </span>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            const payload = {
              images: values.images,
              // tradetypes: values.tradeTypes,
              region: values.region,
              adType: selected,

              categories: values.categories,
              // subcategories: ["647f3a06979ac3c9969e91c8"],
              name: values.title,
              description: values.desciption,
              // adType: ["64883c73e59e526b94bd0e70"],
              user: user._id,
            };
            if (values.type != "simple") {
              payload.target = {
                target_tradetypes: values.tradeTypes,
                target_region: values.targetRegion,

                target_categories: values.targetCategories,
                adView: values.adView,
                adViewCount: calculateUsersCount(
                  values.targetRegion,
                  values.targetCategories,
                  values.tradeTypes,
                  values.type,
                  values.adView
                ),
              };
            }
            try {
              const resData = await Api.post("/announcement/post", payload);
              navigate("/profile/announcements");
            } catch (err) {}
            actions.setSubmitting(false);
          }}
          validationSchema={annSchema}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <form
              className='grid grid-cols-2 gap-5 w-full mt-4'
              onSubmit={handleSubmit}
            >
              <div className='col-span-2'>
                <UploadImages
                  images={values.images}
                  setImages={(data) => setFieldValue("images", data)}
                />
              </div>

              <div className=' col-span-2 md:col-span-1'>
                <FormControl
                  size='small'
                  error={!!errors.title}
                  variant='outlined'
                  fullWidth
                >
                  <InputLabel htmlFor='title-error'>Загаловка</InputLabel>

                  <OutlinedInput
                    multiline={true}
                    label='Загаловка'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    id='title-error'
                    aria-describedby='title-error-text'
                  />
                  <FormHelperText id='title-error-text'>
                    {errors.title}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 col-span-2 md:col-span-1 gap-5'>
                <FormControl
                  color='success'
                  size='small'
                  error={!!errors.categories}
                >
                  <InputLabel id='categories-label'>
                    {"Категория реклами"}
                  </InputLabel>
                  <Select
                    color='success'
                    multiple
                    label='Категория реклами'
                    name='categories'
                    value={values.categories}
                    onChange={handleChange}
                    labelId='categories-label'
                    id='categories'
                    aria-describedby='categories-error-text'
                  >
                    {categories?.map((option) => (
                      <MenuItem
                        sx={{
                          "&$selected": {
                            // this is to refer to the prop provided by M-UI
                            backgroundColor: "black", // updated backgroundColor
                          },
                        }}
                        color='success'
                        key={option._id}
                        value={option._id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id='categories-error-text'>
                    {errors.categories}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  color='success'
                  size='small'
                  error={!!errors.region}
                >
                  <InputLabel color='success' id='region-label'>
                    {"Ваше регион"}
                  </InputLabel>
                  <Select
                    label='Ваше регион'
                    color='success'
                    name='region'
                    value={values.region}
                    onChange={handleChange}
                    labelId='region-label'
                    id='region'
                    aria-describedby='region-error-text'
                  >
                    {regions?.map((option) => (
                      <MenuItem
                        color='success'
                        key={option._id}
                        value={option._id}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id='region-error-text'>
                    {errors.region}
                  </FormHelperText>
                </FormControl>
              </div>

              {/* --------------------------------------------------
              // ------------- Choose country ---------------------//
              ------------------------------------------------------
              */}
              {/* <FormControl size='small' error={!!errors.country}>
                <InputLabel id='country-label'>{"Ваше страна"}</InputLabel>
                <Select
                  label={"Ваше страна"}
                  multiple
                  name='country'
                  value={values.country}
                  onChange={handleChange}
                  labelId='country-label'
                  id='country'
                  aria-describedby='country-error-text'
                >
                  <MenuItem value='' disabled>
                    Select an option
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText id='country-error-text'>
                  {errors.country}
                </FormHelperText>
              </FormControl> */}
              {/* --------------------------------------------------
              // ------------- Choose region ---------------------//
              ------------------------------------------------------
              */}

              {/* --------------------------------------------------
              // ------------- TITLE ---------------------//
              ------------------------------------------------------
              */}

              {/* --------------------------------------------------
              // ------------- Description ---------------------//
              ------------------------------------------------------
              */}
              <div className=' col-span-2'>
                <FormControl
                  size='small'
                  error={!!errors.desciption}
                  variant='outlined'
                  fullWidth
                >
                  <InputLabel htmlFor='desciption-error'>Описание</InputLabel>

                  <OutlinedInput
                    inputProps={{
                      style: {
                        height: "130px",
                      },
                    }}
                    multiline={true}
                    placeholder='Введите текст'
                    label='Описание'
                    name='desciption'
                    value={values.desciption}
                    onChange={handleChange}
                    id='desciption-error'
                    aria-describedby='desciption-error-text'
                  />
                  <FormHelperText id='desciption-error-text'>
                    {errors.desciption}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className='col-span-2'>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    "@media (max-width: 600px)": {
                      flexDirection: "column",
                    },
                    alignItems: "center",
                    columnGap: "10px",
                  }}
                >
                  <FormLabel>{"ПАРАМЕТРЫ РЕКЛАМЫ"}</FormLabel>
                  <RadioGroup
                    size='small'
                    name='type'
                    value={values.type}
                    onChange={handleChange}
                    row
                    aria-labelledby='type-label'
                  >
                    <FormControlLabel
                      value='simple'
                      control={
                        <Radio
                          sx={{
                            "&, &.Mui-checked": {
                              color: "#38b000",
                            },
                          }}
                          classes={{ colorPrimary: "#000" }}
                        />
                      }
                      label='Простое объявление'
                    />
                    <FormControlLabel
                      value='target'
                      control={
                        <Radio
                          sx={{
                            "&, &.Mui-checked": {
                              color: "#38b000",
                            },
                          }}
                        />
                      }
                      label='ТАРГЕТ'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className='flex flex-col gap-3 col-span-2 md:col-span-1 text-[14px]'>
                {/* --------------------------------------------------
              // ------------- Choose reklama parametri -------------//
              ------------------------------------------------------
              */}

                {values.type === "target" && (
                  <div className='flex flex-col w-full  items-center gap-3 bg-neutral-100 p-5 rounded-lg'>
                    <span className='w-full mb-[-3px] text-center font-bold text-[16px]'>
                      Кому показать{" "}
                    </span>
                    <FormControl>
                      {/* <FormLabel id='adView-label'>
                        {"Параметры рекламы"}
                      </FormLabel> */}
                      <RadioGroup
                        name='adView'
                        value={values.adView}
                        onChange={handleChange}
                        row
                        aria-labelledby='adView-label'
                      >
                        <FormControlLabel
                          value='all'
                          control={
                            <Radio
                              sx={{
                                "&, &.Mui-checked": {
                                  color: "#38b000",
                                },
                              }}
                            />
                          }
                          label='Всем'
                        />
                        <FormControlLabel
                          value='users'
                          control={
                            <Radio
                              sx={{
                                "&, &.Mui-checked": {
                                  color: "#38b000",
                                },
                              }}
                            />
                          }
                          label='Обычным пользователям '
                        />
                        <FormControlLabel
                          value='orgs'
                          control={
                            <Radio
                              sx={{
                                "&, &.Mui-checked": {
                                  color: "#38b000",
                                },
                              }}
                            />
                          }
                          label='Организациям'
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* --------------------------------------------------
              // ------------- Choose target category ---------------------//
              ------------------------------------------------------
              */}
                    {values.adView == "orgs" && (
                      <>
                        <span className='text-[14px] mt-3'>
                          {"Каким категориям  покозать рекламу?"}
                        </span>
                        <FormControl
                          sx={{ width: "100%" }}
                          size='small'
                          error={!!errors.targetCategories}
                        >
                          <InputLabel id='targetCategories-label'>
                            {"Категория реклами"}
                          </InputLabel>
                          <Select
                            multiple
                            label='Категория реклами'
                            name='targetCategories'
                            value={values.targetCategories}
                            onChange={handleChange}
                            labelId='targetCategories-label'
                            id='targetCategories'
                            aria-describedby='targetCategories-error-text'
                          >
                            <MenuItem value='' disabled>
                              Select an option
                            </MenuItem>
                            {categories.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText id='targetCategories-error-text'>
                            {errors.targetCategories}
                          </FormHelperText>
                        </FormControl>
                        {/* --------------------------------------------------
              // ------------- Choose target subcategory ---------------------//
              ------------------------------------------------------
              */}

                        {/* <FormControl
                          sx={{ width: "100%" }}
                          size='small'
                          error={!!errors.targetSubcategories}
                        >
                          <InputLabel id='targetSubcategories-label'>
                            {"Подкатегория рекламы"}
                          </InputLabel>
                          <Select
                            multiple
                            label='Подкатегория рекламы'
                            name='targetSubcategories'
                            value={values.targetSubcategories}
                            onChange={handleChange}
                            labelId='targetSubcategories-label'
                            id='targetSubcategories'
                            aria-describedby='targetSubcategories-error-text'
                          >
                            <MenuItem value='' disabled>
                              Select an option
                            </MenuItem>
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText id='targetSubcategories-error-text'>
                            {errors.categories}
                          </FormHelperText>
                        </FormControl> */}
                      </>
                    )}
                    {/* --------------------------------------------------
              // ------------- Choose country ---------------------//
              ------------------------------------------------------
              */}
                    {(values.adView == "orgs" || values.adView == "users") && (
                      <>
                        <span className='text-[14px] mt-3'>
                          {"Выберите регион для рекламы"}
                        </span>
                        {/*
                        <FormControl
                          sx={{ width: "100%" }}
                          size='small'
                          error={!!errors.targetRegion}
                        >
                          <InputLabel id='targetRegion-label'>
                            {"Ваше страна"}
                          </InputLabel>
                          <Select
                            label={"Ваше страна"}
                            multiple
                            name='targetRegion'
                            value={values.targetRegion}
                            onChange={handleChange}
                            labelId='targetRegion-label'
                            id='targetRegion'
                            aria-describedby='targetRegion-error-text'
                          >
                            <MenuItem value='' disabled>
                              Select an option
                            </MenuItem>
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText id='targetRegion-error-text'>
                            {errors.targetRegion}
                          </FormHelperText>
                        </FormControl> */}
                        {/* --------------------------------------------------
              // ------------- Choose region ---------------------//
              ------------------------------------------------------
              */}

                        <FormControl
                          sx={{ width: "100%" }}
                          size='small'
                          error={!!errors.targetRegion}
                        >
                          <InputLabel id='targetRegion-label'>
                            {"Регион"}
                          </InputLabel>
                          <Select
                            multiple
                            label='Регион'
                            name='targetRegion'
                            value={values.targetRegion}
                            onChange={handleChange}
                            labelId='targetRegion-label'
                            id='targetRegion'
                            aria-describedby='targetRegion-error-text'
                          >
                            <MenuItem value='' disabled>
                              Select an option
                            </MenuItem>
                            {regions?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText id='targetRegion-error-text'>
                            {errors.targetRegion}
                          </FormHelperText>
                        </FormControl>
                      </>
                    )}
                    {values.adView == "orgs" && (
                      <>
                        {" "}
                        <span className='text-[14px] mt-3'>
                          {"Каким компаниям покозат рекламу?"}
                        </span>
                        <FormControl
                          sx={{ width: "100%" }}
                          size='small'
                          error={!!errors.tradeTypes}
                        >
                          <InputLabel id='tradeTypeslabel'>
                            {"Тип активности"}
                          </InputLabel>
                          <Checkbox.Group
                            css={{
                              marginTop: "40px",
                              display: "flex",
                              flexDirection: "row",
                              rowGap: "2px",
                            }}
                            color='success'
                            name='adType'
                            value={selectedTradeType}
                            onChange={setSelectedTradeType}
                          >
                            <div className='flex flex-row w-full justify-center gap-5 md:pr-5'>
                              {tradetypes &&
                                tradetypes?.map((el) => (
                                  <div className='flex flex-row w-full justify-between'>
                                    <Checkbox
                                      isRounded
                                      size='sm'
                                      value={el._id}
                                    >
                                      {el.name}
                                    </Checkbox>
                                  </div>
                                ))}
                            </div>
                          </Checkbox.Group>
                          {/* <Select
                            size='small'
                            sx={{ width: "100%" }}
                            multiple
                            label='Тип активности'
                            name='tradeTypes'
                            value={values.tradeTypes}
                            onChange={handleChange}
                            labelId='tradeTypes-label'
                            id='tradeTypes'
                            aria-describedby='tradeTypes-error-text'
                          >
                            {tradetypes?.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Select> */}
                        </FormControl>
                      </>
                    )}
                  </div>
                )}

                <FormControl>
                  <FormLabel id='target-label'>
                    {"РЕКЛАМА В СОЦ-СЕТЯХ"}
                  </FormLabel>
                  <Checkbox.Group
                    css={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "2px",
                    }}
                    color='success'
                    name='adType'
                    value={selected}
                    onChange={setSelected}
                  >
                    <div className='flex flex-col gap-2 md:pr-5'>
                      {ads &&
                        ads.map((el) => (
                          <div className='flex flex-row w-full justify-between'>
                            <Checkbox size='sm' value={el._id}>
                              {el.name}
                            </Checkbox>
                            <span className='font-bold text-[14px]'>{`${el.members} Подписчик`}</span>
                          </div>
                        ))}
                    </div>
                  </Checkbox.Group>
                  {/* <RadioGroup
                    multiple
                    aria-labelledby='target-label'
                    name='adType'
                    value={values.adType}
                    onChange={handleChange}
                  >
                    {ads &&
                      ads.map((el) => (
                        <FormControlLabel
                          value={el._id}
                          control={<Radio color='alotrade' />}
                          label={el.name}
                        />
                      ))}
                  </RadioGroup> */}
                </FormControl>
              </div>
              <div className='flex flex-col gap-3 col-span-2 md:col-span-1'>
                <div className='flex flex-col gap-5 md:border-l-[1px] md:border-l-sky-400'>
                  <div className='flex flex-col justify-between items-center px-5'>
                    <span className='text-[16px]'>{"АУДИТОРИЯ"}</span>
                    <span className='text-[48px] font-bold bg-alotrade/10 px-5 py-1 rounded-lg'>
                      {calculateUsersCount(
                        values.targetRegion,
                        values.targetCategories,
                        selectedTradeType,
                        values.type,
                        values.adView
                      ) + membersCount(selected)}
                    </span>
                  </div>
                  {values.type != "simple" && (
                    <div className='flex flex-col justify-between items-start px-5 w-full'>
                      <span className='flex flex-row items-center gap-2 text-[14px] w-full'>
                        <span className='w-[15px] h-[15px] rounded-full bg-green-500' />
                        {`Отправка рекламу на сайте (${pricePerSend?.sum} сўм за 1 отправку)`}
                      </span>
                      <span className='flex w-full text-[16px] text-green-600 justify-end text-right'>
                        {`${calculateUsersCount(
                          values.targetRegion,
                          values.targetCategories,
                          selectedTradeType,
                          values.type,
                          values.adView
                        )} * ${pricePerSend?.sum} = ${
                          calculateUsersCount(
                            values.targetRegion,
                            values.targetCategories,
                            selectedTradeType,
                            values.type,
                            values.adView
                          ) * pricePerSend?.sum
                        }`}
                      </span>
                    </div>
                  )}

                  {selected.map((el) => {
                    const searchIndex = ads?.findIndex((it) => it._id == el);
                    const item = ads[searchIndex];

                    return (
                      <div className='flex flex-col justify-between items-start px-5 w-full'>
                        <span className='flex flex-row items-center gap-2 text-[14px] w-full'>
                          <span className='w-[15px] h-[15px] rounded-full bg-green-500' />
                          {`Рекламу в ${item.name} (${item.price} сум 1 пост)`}
                        </span>
                        <span className='flex w-full text-[16px] text-green-600 justify-end text-right'>
                          {`1* ${item.price} = ${moneyPattern(
                            (item.price * 1).toString()
                          )}`}
                        </span>
                      </div>
                    );
                  })}
                  <span className='text-[14px] bg-alotrade/10 p-3 rounded-xl m-3'>
                    {
                      "Если у вас не хватает деньги на  балансе на счету вы все равно можете  создать рекламу а денги за рекламу снимится потом "
                    }
                  </span>
                  <div className='flex flex-col justify-start items-start px-5 gap-2 w-full'>
                    <div className='flex flex-col md:flex-row gap-4 items-center justify-between w-full'>
                      <span className='flex flex-col text-[24px] font-bold'>
                        {`ИТОГ: ${moneyPattern(
                          (
                            (values.type != "simple"
                              ? calculateUsersCount(
                                  values.targetRegion,
                                  values.targetCategories,
                                  selectedTradeType,
                                  values.type,
                                  values.adView
                                ) * pricePerSend?.sum
                              : 0) + socialPrice
                          ).toString()
                        )} Сўм`}
                        <span className='text-[14px] font-normal'>{`На балансе: ${moneyPattern(
                          user?.balance.toString()
                        )} Сўм`}</span>
                      </span>
                      <Button
                        type='submit'
                        variant='contained'
                        color='alotrade'
                        className=' w-fit  mt-10'
                      >
                        {"ОПЛАТИТЬ"}
                      </Button>
                    </div>

                    {/* <span className='text-[22px] font-bold'>4534</span> */}
                  </div>
                </div>
                {/* --------------------------------------------------
              // ------------- Choose category ---------------------//
              ------------------------------------------------------
              */}

                {/* --------------------------------------------------
              // ------------- Choose subcategory ---------------------//
              ------------------------------------------------------
              */}
                {/* <FormControl size='small' error={!!errors.subcategories}>
                  <InputLabel id='subcategories-label'>
                    {"Подкатегория рекламы"}
                  </InputLabel>
                  <Select
                    multiple
                    label='Подкатегория рекламы'
                    name='subcategories'
                    value={values.subcategories}
                    onChange={handleChange}
                    labelId='subcategories-label'
                    id='subcategories'
                    aria-describedby='subcategories-error-text'
                  >
                    
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id='subcategories-error-text'>
                    {errors.categories}
                  </FormHelperText>
                </FormControl> */}
                {/* --------------------------------------------------
              // ------------- Choose image ---------------------//
              ------------------------------------------------------
              */}
                {/* <div className='grid grid-cols-1 gap-5'>
                  <FormControl size='small' error={!!errors.image}>
                  <InputLabel htmlFor='image-error'>Описание</InputLabel> 

                    <OutlinedInput
                      size='small'
                      type='file'
                      placeholder='Загрузите фото'
                      name='image'
                      value={values.image.fileName}
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      id='image-error'
                      aria-describedby='image-error-text'
                    />
                    <FormHelperText id='image-error-text'>
                      {errors.image}
                    </FormHelperText>
                  </FormControl>
                  {values.image && (
                    <img
                      className='w-[100%] h-[340px] object-cover'
                      src={URL.createObjectURL(values.image)}
                    />
                  )}
                </div> */}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateAnnouncements;
