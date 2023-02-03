import { unwrapResult } from "@reduxjs/toolkit";
import { create } from "features/Detail/commentClice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import CreateForm from "../CreateFrom";

Create.propTypes = {
  refeshCommnetList: PropTypes.func,
};

function Create(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = create(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { refeshCommnetList } = props;
      if (refeshCommnetList) {
        refeshCommnetList();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <CreateForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Create;
