import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../Components/Inputs/Input";
import Button from "../../../Components/Buttons/Button";
import LabelButton from "../../../Components/Buttons/LabelButton";
import image from "../../../assets/images/login.png";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../signSlice";
import { useTranslation } from "react-i18next";
import { getTranslations } from "../../../translation";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(["common"]);
  const {
    telefon_raqam,
    parol,
    kirish,
    tizimda_yangimisiz_unda_avval,
    royxatdan_oting,
  } = getTranslations(t);
  const { loading } = useSelector((state) => state.login);

  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+998");

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "password" && setPassword(value);
    name === "phone" && setPhone(value);
  };

  const enterHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const submitHandler = () => {
    const data = {
      password,
      phone: phone,
    };
    dispatch(signIn({ ...data })).then(({ error }) => {
      if (!error) {
        navigate("/");
      }
    });
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col ">
      <div className="container flex">
        <div className="lg:w-1/2  hidden lg:block">
          <div className="flex justify-center">
            <img src={image} alt="login" width="70%" />
          </div>
        </div>
        <div className="lg:w-1/2 w-full py-6">
          <div className="flex flex-col items-center justify-center h-full bg-white-900 md:px-10 md:py-5 rounded md:mx-20 md:shadow md:shadow-xl">
            <Input
              isDisabled={loading}
              placeholder="+998 97 366 62 21"
              type="text"
              label={telefon_raqam}
              value={phone}
              onChange={changeHandler}
              name="phone"
              onKeyUp={enterHandler}
            />
            <Input
              isDisabled={loading}
              placeholder="* * * * * *"
              type="password"
              label={parol}
              onKeyUp={enterHandler}
              name="password"
              value={password}
              onChange={changeHandler}
            />
            <Button
              title={kirish}
              onClick={submitHandler}
              isDisabled={loading}
            />
            <LabelButton
              label={tizimda_yangimisiz_unda_avval}
              title={royxatdan_oting}
              link="/sign-up"
            />
          </div>
        </div>
      </div>
      <div className="bottom-0 bg-white-900 w-full">
        <div className="container m-auto text-center">
          By{" "}
          <Link
            to="/"
            className="py-4 inline-block text-blue-500 cursor-pointer underline"
          >
            Alo24
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
