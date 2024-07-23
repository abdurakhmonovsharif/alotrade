import LogoImg from "../../assets/images/logo.png";
import LogoImg2 from "../../assets/images/logo2.png";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import Api from "../../Config/Api";
import { useNavigate } from "react-router-dom";
import { universalToast } from "../../Components/ToastMessages/ToastMessages";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const loginSchema = yup.object().shape({
    username: yup.string().required("Login bo'sh bo'lmasligi kerak!"),
    password: yup
      .string()
      // .min(8, "Parol 8 ta belgidan kam bo'lmasligi kerak!")
      .required("Parol bo'sh bo'lmasligi kerak!"),
  });
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gradient-to-tr from-alotrade/30 to-white'>
      <div className='flex flex-col items-center gap-2'>
        {/* <img src={logo} className='h-[40px] w-auto mb-3' alt='logo_sakiyna' /> */}
        <div
          style={{ borderRadius: "21px" }}
          className=' overflow-hidden border-0 shadow-2xl shadow-neutral-800/20'
        >
          <div
            style={{ padding: "0px" }}
            className='flex flex-col w-[450px] overflow-hidden'
          >
            <div className='flex justify-center items-center py-3 bg-alotrade w-full'>
              <img
                className='h-[40px]'
                src={LogoImg2}
                alt='as'
                // width={width < 720 ? 50 : 200}
              />
            </div>
            <div className='flex flex-col w-full p-[30px] items-center bg-white'>
              <span className='text-[21px] font-bold font-madefor'>
                Tizimga kirish
              </span>
              <Formik
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={async (values, actions) => {
                  try {
                    const { data } = await Api.post("/admin/login", {
                      phone: values.username,
                      password: values.password,
                    });
                    localStorage.setItem("admin-token", data.token);
                    navigate("/admin");
                  } catch (err) {
                    universalToast("Login yoki parol xato!", "error");
                  }
                }}
                validationSchema={loginSchema}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <form
                    className='flex flex-col gap-3 w-full mt-4'
                    onSubmit={handleSubmit}
                  >
                    <FormControl
                      error={!!errors.username}
                      variant='outlined'
                      fullWidth
                    >
                      <InputLabel htmlFor='component-error'>Login</InputLabel>
                      <OutlinedInput
                        label='Login'
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        id='component-error'
                        defaultValue='Composed TextField'
                        aria-describedby='component-error-text'
                      />
                      <FormHelperText id='component-error-text'>
                        {errors.username}
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      variant='outlined'
                      fullWidth
                      error={!!errors.password}
                    >
                      <InputLabel htmlFor='outlined-adornment-password'>
                        Parol
                      </InputLabel>
                      <OutlinedInput
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        id='outlined-adornment-password'
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Parol'
                        aria-describedby='password-error-text'
                      />
                      <FormHelperText id='password-error-text'>
                        {errors.password}
                      </FormHelperText>
                    </FormControl>

                    <Button
                      type='submit'
                      variant='contained'
                      color='alotrade'
                      className='w-full'
                    >
                      Kirish
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
