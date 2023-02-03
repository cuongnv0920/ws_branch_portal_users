import { unwrapResult } from "@reduxjs/toolkit";
import { setting } from "features/Auth/authSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import SettingForm from "../SettingForm";

Setting.propTypes = {
  closeDialog: PropTypes.func,
};

function Setting(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = setting(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props; // close dialog
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Cập nhật người dùng thành công.", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <SettingForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Setting;
