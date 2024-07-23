import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Alert,
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
  Snackbar,
} from "@mui/material";
import UploadImages from "../../../Components/ImageCrop/UploadImages";
import { useDispatch, useSelector } from "react-redux";

import { getAllregions } from "../../Filter/regionsSlice";
import { getAllAds } from "../../Admin/AdminPages/AnnsPage/adSlice";

import Api from "../../../Config/Api";

import { useNavigate, useParams } from "react-router-dom";

const EditAnnouncement = () => {
  const navigate = useNavigate();
  const annId = useParams()?.id;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { categoriesWithSubcategories: categories } = useSelector(
    (state) => state.categories
  );

  const { regions } = useSelector((state) => state.regions);

  const {
    userData: { user },
    logged,
  } = useSelector((state) => state.login);

  const annSchema = yup.object().shape({
    region: yup.string().required("Viloyat bo'sh bo'lmasligi kerak!"),
    title: yup.string().required("Sarlavha bo'sh bo'lmasligi kerak!"),
    description: yup.string().required("Sarlavha bo'sh bo'lmasligi kerak!"),
    categories: yup.array().required("Viloyat bo'sh bo'lmasligi kerak!"),
    images: yup.array(),
  });
  const [initialValues, setInitialValues] = useState({
    categories: [],
    region: "",
    title: "",
    description: "",
    images: [],
  });

  const fetchAnnById = async (id) => {
    const res = await Api.get(`/announcement/post/${id}`);
    setInitialValues({
      categories: res.data?.categories?.map((el) => el._id),
      region: res.data?.region?._id,
      title: res.data?.name,
      description: res.data?.description,
      images: res.data?.images,
    });
  };

  useEffect(() => {
    dispatch(getAllregions());
    dispatch(getAllAds());
    fetchAnnById(annId);
  }, []);

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-col w-full max-w-[980px] p-8'>
        <span className='font-bold text-[24px] text-center'>
          {"Изменить объявления"}
        </span>
        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            const payload = {
              images: [...values.images],
              // tradetypes: values.tradeTypes,
              region: values.region,
              categories: values.categories,
              // subcategories: ["647f3a06979ac3c9969e91c8"],
              name: values.title,
              description: values.description,
              // adType: ["64883c73e59e526b94bd0e70"],
              user: user._id,
            };

            //     if (values.type != "simple") {
            //       payload.target = {
            //         target_tradetypes: values.tradeTypes,
            //         target_region: values.targetRegion,
            //         target_district: values.targetDistrict,
            //         target_categories: values.targetCategories,
            //         adView: values.adView,
            //         adViewCount: calculateUsersCount(
            //           values.targetRegion,
            //           values.targetCategories,
            //           values.tradeTypes,
            //           values.type,
            //           values.adView
            //         ),
            //       };
            //     }
            try {
              const resData = await Api.put(
                `/announcement/post/${annId}`,
                payload
              );
              fetchAnnById(annId);
              handleClick();
              //   navigate("/profile/announcements");
            } catch (err) {}
            actions.setSubmitting(false);
          }}
          validationSchema={annSchema}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <form
              className='grid grid-cols-2 gap-5 w-full'
              onSubmit={handleSubmit}
            >
              <div className=' col-span-2'>
                <UploadImages
                  images={values.images}
                  setImages={(data) => setFieldValue("images", data)}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
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
              <div className='grid grid-cols-2 col-span-2 md:col-span-1 gap-5'>
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
                    displayEmpty={false}
                    // defaultValue={values.region[0]}
                    label={"Ваше регион"}
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
                  <InputLabel htmlFor='description-error'>Описание</InputLabel>

                  <OutlinedInput
                    inputProps={{
                      style: {
                        height: "130px",
                      },
                    }}
                    multiline={true}
                    placeholder='Введите текст'
                    label='Описание'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    id='description-error'
                    aria-describedby='description-error-text'
                  />
                  <FormHelperText id='description-error-text'>
                    {errors.description}
                  </FormHelperText>
                </FormControl>
              </div>
              <Button
                type='submit'
                sx={{ width: "fit-content" }}
                variant='contained'
                color='primary'
              >
                Изменить
              </Button>
              <div className='flex flex-col gap-3 text-[14px]'></div>
            </form>
          )}
        </Formik>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} color='success' sx={{ width: "100%" }}>
          Объявление успешно изменено!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditAnnouncement;
