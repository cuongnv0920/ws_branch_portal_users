import React from "react";
import PropTypes from "prop-types";
import EditForm from "../EditForm";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { edit } from "../../commentClice";
import { unwrapResult } from "@reduxjs/toolkit";

Edit.propTypes = {
  closeDialog: PropTypes.func,
};

function Edit(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = edit(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Sửa thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <EditForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Edit;
