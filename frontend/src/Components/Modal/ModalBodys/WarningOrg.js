import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Modal, Text } from "@nextui-org/react";
import { fillBalance } from "../../../Config/money";
import { useSelector } from "react-redux";

const WarningOrg = () => {
  const { loading, userData } = useSelector((state) => state.login);

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
  const handlerFillBalance = () => setVisibleFillBalance(true);
  const [visibleFillBalance, setVisibleFillBalance] = useState(false);

  const closeHandlerFillBalance = () => {
    setVisibleFillBalance(false);
  };

  return (
    <div className='flex flex-col items-center max-w-[700px] h-fit bg-white py-4 md:py-10 px-4 rounded'>
      <h2 className='text-[14px] md:text-[24px] font-bold text-center'>
        {`Уважаемый пользователь, ваш аккаунт в настоящее время неактивна. Для того чтобы активировать своего аккаунта пожалуйста пополните свой баланс.`}
      </h2>
      <button
        onClick={handlerFillBalance}
        className='text-[12px] md:text-[14px] rounded-lg bg-alotrade px-3 py-2 mt-2 text-white font-semibold'
      >
        {"Пополнит баланс"}
      </button>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={visibleFillBalance}
        onClose={closeHandlerFillBalance}
      >
        {" "}
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={(values, actions) => {
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
                  Пополнит баланс
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
      {/* <div className='flex items-strech md:items-center md:justify-center flex-col md:flex-row gap-4 md:gap-0 '>
        <Link
          to={typeOfWarning === "user" ? "/sign-up" : "/sign-up/business"}
          className='p-2 bg-alotrade text-white text-center block rounded-xl md:mr-2'
        >
          Зарегистрироваться
        </Link>
      </div> */}
    </div>
  );
};

export default WarningOrg;
