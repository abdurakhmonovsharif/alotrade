import React from "react";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import LabelButton from "../Buttons/LabelButton";
import SelectInput from "../SelectInput/SelectInput";

const UserRegister = ({
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
  translations,
}) => {
  return (
    <div className="bg-white-900 rounded ">
      <div className="md:px-16 md:py-5">
        <h1 className="font-bold text-center py-4 text-xl text-neutral-700">
          {translations.foydalanuvchi_sifatida_royxatdan_otish}
        </h1>
        <div className="flex flex-col md:flex-row">
          <Input
            isDisabled={loading}
            placeholder={translations.ism + "*"}
            margin="mr-3"
            value={firstname}
            onChange={changeHandler}
            name="firstname"
            required={true}
            onKeyUp={enterHandler}
          />
          <Input
            isDisabled={loading}
            placeholder={translations.familiya + "*"}
            value={lastname}
            onChange={changeHandler}
            name="lastname"
            required={true}
            onKeyUp={enterHandler}
          />
        </div>
        <Input
          isDisabled={loading}
          placeholder={translations.telefon_raqam + "*"}
          type={"text"}
          value={phone}
          onChange={changeHandler}
          name="phone"
          required={true}
          onKeyUp={enterHandler}
        />
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full">
          <div className="w-full mr-3">
            <SelectInput
              placeholder={translations.davlat + "*"}
              options={regions}
              onSelect={selectRegion}
              value={region}
              name="region"
              isDisabled={loading}
            />
          </div>
          <div className="w-full">
            <SelectInput
              placeholder={translations.viloyat + "*"}
              value={district}
              options={districts}
              onSelect={selectDistrict}
              name={"district"}
              isDisabled={districts.length === 0 || loading}
            />
          </div>
        </div>
        <Input
          isDisabled={loading}
          placeholder={translations.parol + "*"}
          type="password"
          value={password}
          onChange={changeHandler}
          name="password"
          required={true}
          onKeyUp={enterHandler}
        />
        {/*<Input*/}
        {/*  isDisabled={loading}*/}
        {/*  placeholder="Parolni tasdiqlang"*/}
        {/*  type="password"*/}
        {/*  value={confirmPassword}*/}
        {/*  onChange={changeHandler}*/}
        {/*  name={"confirmPassword"}*/}
        {/*  required={true}*/}
        {/*  onKeyUp={enterHandler}*/}
        {/*/>*/}
        <Button
          title={translations.royxatdan_otish}
          onClick={submitHandler}
          isDisabled={loading}
        />
        <br />
        <LabelButton
          link="../sign-in"
          label={translations.avval_royxatdan_otgan_bolsangiz + " "}
          title={translations.kirish_qismiga_qayting}
        />
      </div>
    </div>
  );
};

export default UserRegister;
