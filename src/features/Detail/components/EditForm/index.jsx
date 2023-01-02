import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { Input } from "../../../../components/inputField";
import "./styles.scss";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

function EditForm(props) {
  const comment = useSelector((state) => state.comment);
  const avatar = comment.user?.email.slice(0, 1);

  const schema = yup.object().shape({
    content: yup.string().required("Vui lòng nhập nội dung bình luận."),
  });

  const form = useForm({
    defaultValues: {
      id: comment._id,
      content: comment.content,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="editComment">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            className="createComment__avatar"
          >
            {avatar}
          </Avatar>
          <Input
            name="content"
            label="Bình luận..."
            form={form}
            className="createComment__input"
          />
          <Button
            className="createComment__button"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                className="createComment__progress"
                color="secondary"
              />
            ) : (
              "Gửi"
            )}
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default EditForm;
