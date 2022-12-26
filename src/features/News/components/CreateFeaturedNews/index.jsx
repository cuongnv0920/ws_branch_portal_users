import React from "react";
import CreateFormFeaturedNews from "../CreateFormFeaturedNews";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { create } from "../../newsClice";
import { unwrapResult } from "@reduxjs/toolkit";

CreateFeaturedNews.propTypes = {
  closeDialog: PropTypes.func,
};

function CreateFeaturedNews(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = create(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props; // close dialog
      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <CreateFormFeaturedNews onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateFeaturedNews;
