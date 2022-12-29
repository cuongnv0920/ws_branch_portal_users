import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input, Password } from "../../../../components/inputField";
import "./styles.scss";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên đăng nhập."),
    password: yup.string().required("Vui lòng nhập mật khẩu người dùng."),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
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
    <div className="login">
      <div className="login__title dialogTitle">
        <Typography className="dialogTitle_content">Đăng nhập</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input name="username" label="Tên đăng nhập" form={form} />
        <Password name="password" label="Mật khẩu" form={form} />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="login__progress" color="secondary" />
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
