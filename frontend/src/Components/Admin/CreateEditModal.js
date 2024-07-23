import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Stack,
  InputAdornment,
  FormHelperText,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import Api from "../../Config/Api";

const CreateEditModal = React.memo(
  ({
    submitHandler,
    openState,
    title,
    actionName,
    validationSchema,
    initialValues,
    fields,
    currentId,
  }) => {
    return (
      <Dialog open={openState.open}>
        {" "}
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            const body = {};
            const imgUrls = [];
            for (const val of fields) {
              if (val.type == "file") {
                if (!values[val.name]) continue;

                const formData = new FormData();
                formData.append("file", values[val.name]);
                const res = await Api.post("/upload", formData);

                imgUrls.push(res.data);
              } else {
                body[val.name] = values[val.name];
              }
            }

            if (imgUrls.length != 0) {
              if (imgUrls.length === 1) {
                body["image"] = imgUrls[0];
              } else {
                body["image"] = [...imgUrls];
              }
            }
            if (currentId) {
              body._id = currentId;
              body.id = currentId;
            }

            submitHandler(body);
            openState.setOpen(false);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            setFieldValue,
            errors,
          }) => (
            <>
              <form
                className='flex flex-col gap-3 w-full mt-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <DialogTitle textAlign='center'>{title}</DialogTitle>
                <DialogContent>
                  {" "}
                  <Stack
                    sx={{
                      width: "100%",
                      minWidth: { xs: "300px", sm: "360px", md: "400px" },
                      gap: "1.5rem",
                    }}
                  >
                    {fields.map((el, index) => (
                      <FormControl
                        key={index}
                        error={!!errors[el.name]}
                        variant='outlined'
                        fullWidth
                      >
                        {el.type != "file" && (
                          <InputLabel htmlFor={`${el.name}-error`}>
                            {el.label}
                          </InputLabel>
                        )}
                        <OutlinedInput
                          label={el.label}
                          name={el.name}
                          value={
                            el.type == "file"
                              ? values[el.name].filename
                              : values[el.name]
                          }
                          onChange={
                            el.type === "file"
                              ? (event) => {
                                  setFieldValue(
                                    el.name,
                                    event.currentTarget.files[0]
                                  );
                                }
                              : handleChange
                          }
                          id={`${el.name}-error`}
                          aria-describedby={`${el.name}-error-text`}
                          type={el.type}
                        />
                        <FormHelperText id={`${el.name}-error-text`}>
                          {errors[el.name]}
                        </FormHelperText>
                      </FormControl>
                    ))}
                  </Stack>
                </DialogContent>
                <DialogActions sx={{ p: "1.25rem" }}>
                  <Button
                    color='error'
                    onClick={() => openState.setOpen(false)}
                  >
                    {"Bekor qilish"}
                  </Button>
                  <Button type='submit' color='alotrade' variant='contained'>
                    {actionName}
                  </Button>
                </DialogActions>
              </form>
            </>
          )}
        </Formik>
      </Dialog>
    );
  }
);

export default CreateEditModal;
