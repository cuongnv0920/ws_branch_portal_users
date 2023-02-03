import { unwrapResult } from "@reduxjs/toolkit";
import { create } from "features/News/newsClice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import CreateFormNews from "../CreateFormNews";

CreateNews.propTypes = {
  closeDialog: PropTypes.func,
};

function CreateNews(props) {
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
      <CreateFormNews onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateNews;
