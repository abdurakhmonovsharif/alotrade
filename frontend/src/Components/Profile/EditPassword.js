import React, { useState } from "react";
import Input from "../Inputs/Input";
import SaveButton from "../Buttons/SaveButton";
import { checkPassword } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Pages/Sign/signSlice";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../translation";

const EditPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);
  const { t } = useTranslation(["common"]);
  const { joriy_parol, yangi_parol, parolni_takrorlang, tasdiqlash } =
    getTranslations(t);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, newPassword] = useState("");

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "password" && setPassword(value);
    name === "confirmPassword" && setConfirmPassword(value);
    name === "oldPassword" && newPassword(value);
  };

  const clearInputs = () => {
    setPassword("");
    setConfirmPassword("");
    newPassword("");
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const submitHandler = (e) => {
    const data = {
      password,
      confirmPassword,
      oldPassword,
    };

    const check = checkPassword({ ...data, t });
    check &&
      dispatch(
        updatePassword({ password: oldPassword, newPassword: password })
      ).then(({ error }) => {
        !error && clearInputs();
      });
  };

  return (
    <div className="p-5 ">
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <Input
          onChange={changeHandler}
          value={oldPassword}
          type="password"
          name="oldPassword"
          placeholder={joriy_parol}
          label={joriy_parol}
          onKeyUp={enterHandler}
        />
        <Input
          onChange={changeHandler}
          value={password}
          type="password"
          placeholder={yangi_parol}
          label={yangi_parol}
          name="password"
          onKeyUp={enterHandler}
        />
        <Input
          onChange={changeHandler}
          value={confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder={parolni_takrorlang}
          label={parolni_takrorlang}
          onKeyUp={enterHandler}
        />
      </div>
      <div className="">
        <SaveButton
          title={tasdiqlash}
          className="w-full mt-3"
          isDisabled={loading}
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default EditPassword;
