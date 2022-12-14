import { yupResolver } from "@hookform/resolvers/yup";
import { Button, LinearProgress, Typography } from "@mui/material";
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
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email người dùng.")
      .email("Địa chỉ email không hợp lệ."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu người dùng.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  });

  const form = useForm({
    defaultValues: {
      email: "",
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
      {isSubmitting && <LinearProgress className="login__progress" />}

      <div className="login__title dialogTitle">
        <Typography className="dialogTitle_content">Đăng nhập</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input name="email" label="Tên đăng nhập" form={form} />
        <Password name="password" label="Mật khẩu" form={form} />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
