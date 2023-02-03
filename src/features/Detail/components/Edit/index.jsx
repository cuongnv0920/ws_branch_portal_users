import { unwrapResult } from "@reduxjs/toolkit";
import { edit } from "features/Detail/commentClice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import EditForm from "../EditForm";

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
