import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

const InfoModal = ({ openState, content, submitHandler, idKey, context }) => {
  return (
    <Dialog open={openState.open}>
      <DialogTitle>{context.title}</DialogTitle>
      <DialogContent>
        <span>{`${content} ni ${context.btnText.toLowerCase()}ni xohlaysizmi?`}</span>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button color='error' onClick={() => openState.setOpen(false)}>
          {"Bekor qilish"}
        </Button>
        <Button
          type='submit'
          color='alotrade'
          variant='contained'
          onClick={() => {
            submitHandler({ ["_id"]: idKey });
            openState.setOpen(false);
          }}
        >
          {context.btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
