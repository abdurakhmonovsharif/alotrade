import React from "react";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import LabelButton from "../Buttons/LabelButton";
import SelectInput from "../SelectInput/SelectInput";
import { map, uniqueId } from "lodash";
import Checkbox from "../CheckboxList/Checkbox";
import Filter from "../../Pages/Filter/Filter";
import { useState } from "react";
import ImageCrop from "../ImageCrop/ImageCrop";
import { useSelector } from "react-redux";

const BusinessmanRegister = ({
  categoriesWithSubcategories,
  firstname,
  lastname,
  // email,
  password,
  // confirmPassword,
  phone,
  region,
  district,
  regions,
  districts,
  changeHandler,
  selectRegion,
  selectDistrict,
  enterHandler,
  submitHandler,
  loading,
  categories,
  selectCategory,
  subcategories,
  allSubcategories,
  selectSubcategory,
  name,
  tradetypes,
  changeTradeTypes,
  tradeTypes,
  translations,
  address,
}) => {
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);

  const {
    userData: { user, organization },
    logged,
  } = useSelector((state) => state.login);

  return (
    <>
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
      <div className='bg-white rounded '>
        <div className='md:px-16 md:py-5'>
          <h1 className='font-bold text-center py-4 text-xl text-neutral-700'>
            {logged
              ? "Добавить компанию"
              : translations.tashkilot_sifatida_royxatdan_otish}
          </h1>
          {!logged && (
            <p className='text-neutral-500 text-sm'>
              {translations.shaxsiy_malumotlaringiz}
            </p>
          )}
          <div className='flex flex-col md:flex-row '>
            {!logged && (
              <Input
                isDisabled={loading}
                placeholder={translations.ism + "*"}
                margin='mr-3'
                value={firstname}
                onChange={changeHandler}
                name='firstname'
                required={true}
                onKeyUp={enterHandler}
              />
            )}
            {!logged && (
              <Input
                isDisabled={loading}
                placeholder={translations.familiya + "*"}
                value={lastname}
                onChange={changeHandler}
                name='lastname'
                required={true}
                onKeyUp={enterHandler}
              />
            )}
          </div>
          <div className='flex flex-col md:flex-row'>
            {!logged && (
              <Input
                margin='mr-3'
                isDisabled={loading}
                placeholder={translations.telefon_raqam + "*"}
                type='text'
                value={phone}
                onChange={changeHandler}
                name='phone'
                required={true}
                onKeyUp={enterHandler}
              />
            )}
          </div>
          <div className='flex flex-grow'>
            {!logged && (
              <Input
                margin='mr-3'
                isDisabled={loading}
                placeholder={translations.parol + "*"}
                type='password'
                value={password}
                onChange={changeHandler}
                name='password'
                required={true}
                onKeyUp={enterHandler}
              />
            )}
          </div>
          <br />
          <p className='text-neutral-500 text-sm'>
            {translations.tashkilot_malumotlari}
          </p>
          <Input
            placeholder={translations.tashkilot_nomi + "*"}
            isDisabled={loading}
            value={name}
            onChange={changeHandler}
            name='name'
            required={true}
            onKeyUp={enterHandler}
          />

          <div className='flex flex-col md:flex-row'>
            {logged && (
              <Input
                margin='mr-3'
                isDisabled={loading}
                placeholder={translations.telefon_raqam + "*"}
                type='text'
                value={phone}
                onChange={changeHandler}
                name='phone'
                required={true}
                onKeyUp={enterHandler}
              />
            )}
          </div>

          <div className='flex flex-col gap-4 md:gap-0 md:flex-row w-full mb-2'>
            <div className='w-full mr-3'>
              <SelectInput
                placeholder={translations.davlat + "*"}
                options={regions?.map((el) => ({
                  label: el.name,
                  value: el._id,
                  ...el,
                }))}
                onSelect={selectRegion}
                value={region}
                name='region'
                isDisabled={loading}
              />
            </div>

            <div className='w-full'>
              <SelectInput
                placeholder={"Город " + "*"}
                value={district}
                options={districts?.map((el) => ({
                  label: el.name,
                  value: el._id,
                  ...el,
                }))}
                onSelect={selectDistrict}
                name={"district"}
                isDisabled={districts.length === 0 || loading}
              />
            </div>
          </div>
          <Input
            placeholder={"Адрес" + "*"}
            isDisabled={loading}
            value={address}
            onChange={changeHandler}
            name='address'
            required={true}
            onKeyUp={enterHandler}
          />
          <div className='mb-2'>
            <h1 className='text-sm text-neutral-500 mt-4'>
              {translations.savdo_turingizni_tanlang}
            </h1>
            <div className='grid grid-cols-2'>
              {map(tradetypes, (data) => (
                <Checkbox
                  key={uniqueId("tradeType")}
                  data={data}
                  onChange={changeTradeTypes}
                  checked={tradeTypes.some((item) => item === data._id)}
                />
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4 md:gap-0 md:flex-row w-full'>
            <div className='w-full mr-3'>
              <SelectInput
                placeholder={translations.kategoriya + "*"}
                options={categoriesWithSubcategories}
                isMulti={false}
                value={categories}
                isDisabled={loading}
                onSelect={selectCategory}
                closeMenuOnSelect={true}
              />
            </div>
            {/* <div className='w-full'>
              <button
                onClick={() => setIsVisibleFilter(true)}
                className='block w-full py-2 px-4 text-white bg-alotrade rounded'
              >
                Подкатегории
              </button>
            </div> */}
          </div>
          <Button
            title={logged ? "Добавить компанию" : translations.royxatdan_otish}
            onClick={submitHandler}
            isDisabled={loading}
          />
          <br />
          {!logged && (
            <LabelButton
              link='../../sign-in'
              label={translations.avval_royxatdan_otgan_bolsangiz + " "}
              title={translations.kirish_qismiga_qayting}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BusinessmanRegister;
