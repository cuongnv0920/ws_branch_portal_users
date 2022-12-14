// import { unwrapResult } from "@reduxjs/toolkit";
// import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
// import { useDispatch } from "react-redux";
// import { create } from "../../userSlice";
import LoginForm from "../LoginForm";

Login.propTypes = {
  closeDialog: PropTypes.func,
};

function Login(props) {
  //   const dispatch = useDispatch();
  //   const { enqueueSnackbar } = useSnackbar();

  //   const handleSubmit = async (values) => {
  //     try {
  //       const action = create(values);
  //       const resultAction = await dispatch(action);
  //       unwrapResult(resultAction);

  //       const { closeDialog } = props; // close dialog
  //       if (closeDialog) {
  //         closeDialog();
  //       }
  //     } catch (error) {
  //       enqueueSnackbar(error.message, { variant: "error" });
  //     }
  //   };

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
