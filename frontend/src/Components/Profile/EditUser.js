import React, { useEffect, useRef, useState } from "react";
import Input from "../Inputs/Input";
import SelectInput from "../SelectInput/SelectInput";
import "react-image-crop/dist/ReactCrop.css";
import {
  editProfileImage,
  getUser,
  updateUser,
} from "../../Pages/Sign/signSlice";
import { useDispatch, useSelector } from "react-redux";
import ImageCrop from "../ImageCrop/ImageCrop";
import { capitalize, map, uniqueId } from "lodash";
import { checkUser } from "./constants";
import SaveButton from "../Buttons/SaveButton";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../translation";
import {
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { BsEnvelope, BsGlobe, BsInstagram, BsTelegram } from "react-icons/bs";
import EditOrganization from "./EditOrganization";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Modal, Text } from "@nextui-org/react";
import { Formik } from "formik";
import * as yup from "yup";
import { fillBalance, moneyPattern } from "../../Config/money";
import { getAllregions } from "../../Pages/Filter/regionsSlice";

const EditUser = () => {
  const { t } = useTranslation(["common"]);
  const {
    ism,
    familiya,
    telefon_raqam,
    email: Email,
    davlat,
    viloyat,
    saqlash,
  } = getTranslations(t);

  const amountScheme = yup.object().shape({
    amount: yup
      .number("Harus berupa angka")
      .required("Wajib diisi")
      .min(1000, "minimal Rp 1.000")
      .positive("Tidak boleh minus")
      .integer(),
  });

  const initialValues = {
    amount: "",
  };

  const [showUserEdit, setShowUserEdit] = useState();
  const [showOrgEdit, setShowOrgEdit] = useState();

  const { loading, userData } = useSelector((state) => state.login);

  // const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { regions } = useSelector((state) => state.regions);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const handleChangeImage = (croppedImage) => {
    const formData = new FormData();
    formData.append("file", croppedImage);
    dispatch(editProfileImage(formData)).then(({ error, payload }) => {
      if (!error) {
        setIsOpen(false);
        setImage(payload);
      }
    });
  };

  const editUserRef = useRef(null);
  const editOrgRef = useRef(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [email, setEmail] = useState("");
  const [districts, setDistricts] = useState([]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "firstname" && setFirstname(capitalize(value));
    name === "lastname" && setLastname(capitalize(value));
    name === "email" && setEmail(value);
    name === "phone" && setPhone(value);
  };

  const selectRegion = (e) => {
    setRegion(e);
    setDistrict("");
    setDistricts(e.districts);
  };

  const selectDistrict = (e) => {
    setDistrict(e);
  };

  const enterHandler = (e) => {
    e.preventDefault();
    e.key === "Enter" && submitHandler();
  };

  const submitHandler = () => {
    const data = {
      firstname,
      lastname,
      phone,
      region: region.value,
      district: district.value,
    };
    const check = checkUser({
      ...data,
      t,
    });
    if (email !== "") {
      data.email = email;
    }
    if (image !== null) {
      data.image = image;
    }
    check && createHandler(data);
  };

  const createHandler = (data) => {
    dispatch(updateUser(data)).then(({ error, payload }) => {
      if (!error) {
        const { user } = payload;
        setAllDatas(user);
      }
    });
  };

  const setAllDatas = (user) => {
    user.image && setImage(user.image);
    user.firstname && setFirstname(user.firstname);
    user.lastname && setLastname(user.lastname);
    user?.phone && setPhone(user?.phone);
    user.region && setRegion(user.region);
    user.region && setDistricts(user.region.districts);
    user.district && setDistrict(user.district);
    user.email && setEmail(user.email);
  };

  useEffect(() => {
    dispatch(getAllregions());

    dispatch(getUser()).then(({ error, payload }) => {
      if (!error) {
        const { user } = payload;
        setAllDatas(user);
      }
    });
  }, [dispatch]);

  const [visibleFillBalance, setVisibleFillBalance] = useState(false);
  const handlerFillBalance = () => setVisibleFillBalance(true);

  const closeHandlerFillBalance = () => {
    setVisibleFillBalance(false);
  };

  return (
    <div className='flex flex-col gap-5 '>
      <div className='flex flex-col gap-2 p-5'>
        <span className='ml-5 text-[16px] font-bold'>
          {"Данные пользователя "}
        </span>
        <div className='relative flex flex-col items-center md:items-start md:flex-row gap-8 p-8 bg-white rounded-xl shadow-lg border-[1px] border-neutral-200'>
          <button
            onClick={() => {
              setShowUserEdit(!showUserEdit);
              !showUserEdit &&
                setTimeout(() => {
                  editUserRef.current.scrollIntoView({ behavior: "smooth" });
                }, 500);
            }}
            className='bg-neutral-100 hover:text-neutral-800  text-neutral-600 rounded-xl p-[8px] absolute top-2 right-2'
          >
            <PencilSquareIcon className='w-[20px] stroke-[1.8px]' />
          </button>
          <Avatar
            sx={{ width: "130px", height: "130px", flex: "none" }}
            src={userData?.user?.image}
          />
          <div className='flex flex-col md:flex-row justify-between w-full'>
            <div className='flex flex-col'>
              <span className='text-[22px] font-bold mb-3'>{`${userData?.user?.lastname} ${userData?.user?.firstname}`}</span>
              <span className='text-[16px] font-semibold'>{`Тел: ${userData?.user?.phone}`}</span>
              <span className='text-[16px] font-semibold'>{`Регион: ${userData?.user?.region?.label}`}</span>
              <span className='text-[16px] font-semibold'>{`Город:: ${userData?.user?.district?.label}`}</span>
            </div>
            <div className='flex flex-col items-end md:mt-5'>
              <span className='text-[16px] font-bold'>Баланс</span>
              <span className='text-[22px] font-bold text-green-600'>
                {`${
                  userData?.user?.balance == 0
                    ? 0
                    : moneyPattern(userData?.user?.balance)
                } сўм`}
              </span>
              <button
                onClick={handlerFillBalance}
                className='text-[14px] rounded-lg bg-alotrade px-3 py-2 mt-2 text-white font-semibold'
              >
                {"Пополнить счет"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {userData?.organization && (
        <div className='flex flex-col gap-2 p-5'>
          <span className='ml-5 text-[16px] font-bold'>
            {"Данные Организации  "}
          </span>
          <div className='relative flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white rounded-xl shadow-lg border-[1px] border-neutral-200'>
            <button
              onClick={() => {
                setShowOrgEdit(!showOrgEdit);
                !showOrgEdit &&
                  setTimeout(() => {
                    editOrgRef.current.scrollIntoView({ behavior: "smooth" });
                  }, 500);
              }}
              className='bg-neutral-100 hover:text-neutral-800  text-neutral-600 rounded-xl p-[8px] absolute top-2 right-2'
            >
              <PencilSquareIcon className='w-[20px] stroke-[1.8px]' />
            </button>
            <Avatar
              sx={{ width: "130px", height: "130px", flex: "none" }}
              src={userData?.organization?.image}
            />
            <div className='flex flex-col md:flex-row justify-between w-full'>
              <div className='flex flex-col leading-[18px]'>
                <span className='text-[22px] font-bold mb-3'>{`${userData?.organization?.name}`}</span>
                <h3 className='flex'>
                  <span className='font-normal'>Тип торговли:</span>
                  <p className='pl-2'>
                    {map(userData?.organization?.tradetypes, (type) => (
                      <span key={uniqueId()} className='font-bold'>
                        {type?.name},
                      </span>
                    ))}
                  </p>
                </h3>
                <h3 className='flex'>
                  <span className='font-normal'>Тел: </span>
                  <p className='pl-2 font-bold'>
                    {userData?.organization?.phones?.phone1}
                  </p>
                </h3>
                <h3 className='flex'>
                  <span className='font-normal'>Тел: </span>
                  <p className='pl-2 font-bold'>
                    {userData?.organization?.phones?.phone2}
                  </p>
                </h3>
                <h3 className='flex'>
                  <span className='font-normal'>Тел: </span>
                  <p className='pl-2 font-bold'>
                    {userData?.organization?.phones?.phone3}
                  </p>
                </h3>
                <h3 className='flex'>
                  <span className='font-normal'>Регион: </span>
                  <p className='pl-2 font-bold'>
                    {userData?.organization?.region?.label}
                  </p>
                </h3>
                <h3 className='flex'>
                  <span className='font-normal'>Город: </span>
                  <p className='pl-2 font-bold'>
                    {userData?.organization?.district?.label}
                  </p>
                </h3>
                <div className='flex flex-row items-center justify-start gap-3 mt-4'>
                  <span className='flex flex-row gap-2 items-center text-[16px] font-bold'>
                    <div className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-green-500'>
                      <BsGlobe className='w-full text-white' />
                    </div>{" "}
                    {userData?.organization?.media?.site}
                  </span>
                  <span className='flex flex-row gap-2 items-center text-[16px] font-bold'>
                    <div className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-green-500'>
                      <BsEnvelope className='w-full text-white' />
                    </div>
                    {userData?.organization?.email}
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-end gap-3 mt-5'>
                <span className='flex flex-row gap-2 items-center text-[16px] font-normal text-pink-500 '>
                  <div className='w-[30px] h-[30px] p-1 flex justify-center items-center  rounded-lg bg-gradient-to-tr from-pink-600 to-orange-300'>
                    <BsInstagram className='w-full text-white' />
                  </div>{" "}
                  <span className='flex text-right max-w-[200px] text-ellipsis overflow-hidden line-clamp-1'>
                    {userData?.organization?.media?.instagram}
                  </span>
                </span>
                <span className='flex flex-row gap-2 items-center justify-end text-[16px] font-normal text-sky-500'>
                  <div className='w-[30px] h-[30px]  p-1 flex justify-center items-center  rounded-lg bg-sky-500'>
                    <BsTelegram className='w-full text-white' />
                  </div>
                  <span className='flex text-right  max-w-[200px] text-ellipsis overflow-hidden line-clamp-1'>
                    {userData?.organization?.media?.telegram}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUserEdit && (
        <div ref={editUserRef} className='flex flex-col p-5'>
          <span className='text-[18px] font-bold ml-4 mb-2'>
            Изменит данные пользователя
          </span>
          <div className='p-5 flex flex-col md:flex-row shadow-lg rounded-lg border-[1px] border-neutral-200'>
            <div className=' md:w-1/3'>
              <ImageCrop
                inputId={"userImageId"}
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                approve={handleChangeImage}
                output={image}
              />
            </div>
            <div className='flex flex-col md:grid md:grid-cols-2 w-full md:gap-4'>
              <Input
                placeholder={ism}
                label={ism}
                isDisabled={loading}
                margin='mr-3'
                value={firstname}
                onChange={changeHandler}
                name='firstname'
                required={true}
                onKeyUp={enterHandler}
              />
              <Input
                placeholder={familiya}
                label={familiya}
                isDisabled={loading}
                value={lastname}
                onChange={changeHandler}
                name='lastname'
                required={true}
                onKeyUp={enterHandler}
              />
              <Input
                placeholder={telefon_raqam}
                label={telefon_raqam}
                isDisabled={loading}
                type='phone'
                value={phone}
                onChange={changeHandler}
                name='phone'
                required={true}
                onKeyUp={enterHandler}
              />
              <Input
                placeholder={Email}
                label={Email}
                isDisabled={loading}
                type='email'
                value={email}
                onChange={changeHandler}
                name='email'
                onKeyUp={enterHandler}
              />
              <div className='mr-3 w-full'>
                <p className='text-neutral-500 text-sm mt-[7px]'>{davlat}</p>
                <SelectInput
                  placeholder={davlat}
                  options={regions}
                  onSelect={selectRegion}
                  value={region}
                  name='region'
                  isDisabled={loading}
                />
              </div>
              <div className='w-full'>
                <p className='text-neutral-500 text-sm mt-[7px]'>{viloyat}</p>
                <SelectInput
                  placeholder={viloyat}
                  value={district}
                  options={districts}
                  onSelect={selectDistrict}
                  name={"district"}
                  isDisabled={loading}
                />
              </div>
              <SaveButton
                className='col-span-2'
                onClick={submitHandler}
                title={saqlash}
              />
            </div>
          </div>
        </div>
      )}
      {showOrgEdit && (
        <div ref={editOrgRef} className='flex flex-col p-5'>
          <span className='text-[18px] font-bold ml-4 mb-2'>
            Изменит данные Организации{" "}
          </span>
          <div className='bg-white rounded-lg p-2 shadow-lg border-[1px] border-neutral-200'>
            <EditOrganization />
          </div>
        </div>
      )}

      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={visibleFillBalance}
        onClose={closeHandlerFillBalance}
      >
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            //
            fillBalance(
              values?.amount,
              userData?.user?._id,
              userData?.user?.firstname,
              userData?.user?.lastname
            );
          }}
          validationSchema={amountScheme}
        >
          {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header>
                <Text id='modal-title' size={18}>
                  Пополнение счета
                </Text>
              </Modal.Header>
              <Modal.Body>
                <FormControl
                  size='small'
                  error={!!errors.amount}
                  variant='outlined'
                  fullWidth
                >
                  <InputLabel htmlFor='amount-error'>Сумма</InputLabel>

                  <OutlinedInput
                    multiline={true}
                    label='Сумма'
                    name='amount'
                    value={values.amount}
                    onChange={handleChange}
                    id='amount-error'
                    aria-describedby='amount-error-text'
                  />
                  <FormHelperText id='amount-error-text'>
                    {errors.amount}
                  </FormHelperText>
                </FormControl>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  auto
                  flat
                  color='error'
                  onPress={closeHandlerFillBalance}
                >
                  Закрыть
                </Button>
                <Button auto type='submit'>
                  Пополнить
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default EditUser;
