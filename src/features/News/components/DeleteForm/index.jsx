import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const news = useSelector((state) => state.news);

  const form = useForm({
    defaultValues: {
      id: news._id,
    },
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="deleteNews">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="deleteNews__content">
          <p>{`Bạn có chắc chắn muốn xóa bài viết: ${news.title}`}</p>
        </div>

        <Button
          className="dialogButtonDelete"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress
              className="createNews__progress"
              color="secondary"
            />
          ) : (
            "Xóa"
          )}
        </Button>
      </form>
    </div>
  );
}

export default DeleteForm;
