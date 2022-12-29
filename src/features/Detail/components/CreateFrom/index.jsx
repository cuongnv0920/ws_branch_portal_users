import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { Input } from "../../../../components/inputField/index";
import "./styles.scss";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const user = useSelector((state) => state.auth.current);
  const avatar = user.email.slice(0, 1);
  const { pathname } = useLocation();
  const news = pathname.split("/").slice(3);

  const schema = yup.object().shape({
    content: yup.string().required("Vui lòng nhập nội dung bình luận."),
  });

  const form = useForm({
    defaultValues: {
      user: user._id,
      news: news[0],
      content: "",
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createComment">
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

export default CreateForm;
