import { unwrapResult } from "@reduxjs/toolkit";
import { deleted } from "features/Detail/commentClice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import DeleteForm from "../DeleteForm";

Delete.propTypes = {
  closeDialog: PropTypes.func,
};

function Delete(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = deleted(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props; // close dialog
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Xóa thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <DeleteForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Delete;
