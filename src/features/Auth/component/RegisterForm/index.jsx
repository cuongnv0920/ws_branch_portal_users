import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { levelApi, roomApi } from "../../../../api/index";
import {
  Button,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import {
  DateField,
  Input,
  Password,
  RadioField,
  SelectField,
} from "../../../../components/inputField/index";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const [rooms, setRooms] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sex, setSex] = useState("Mr");
  const [role, setRole] = useState("user");
  const [birthday, setBirthday] = useState(new Date());

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên người dùng."),
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email người dùng.")
      .email("Địa chỉ email không hợp lệ."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu người dùng.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    retypePassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng."),
    room: yup.string().required("Vui phòng chọn phòng/ ban."),
    level: yup.string().required("Vui phòng chọn chức danh."),
    phone: yup.string().required("Vui phòng nhập số điện thoại di động."),
  });

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
      room: "",
      level: "",
      phone: "",
      ext: "",
      sex: sex,
      role: role,
      birthday: birthday,
    },

    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomApi.list();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await levelApi.list();
      setLevels(levels);
    };
    fetchLevels();
  }, []);

  const handleChangeBirtday = (date) => {
    setBirthday(date);
  };
  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="register">
      {isSubmitting && <LinearProgress className="register__progress" />}
      <div className="register__title dialogTitle">
        <Typography className="dialogTitle_content">
          Đăng ký người dùng
        </Typography>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Input name="fullName" label="Họ và tên" form={form} />
        <Input name="email" label="Email" form={form} />
        <Password name="password" label="Mật khẩu" form={form} />
        <Password name="retypePassword" label="Xác nhận mật khẩu" form={form} />
        <SelectField name="room" label="Phòng/ ban" form={form}>
          {rooms.map((room, _) => (
            <MenuItem value={room.id}>{room.name}</MenuItem>
          ))}
        </SelectField>
        <SelectField name="level" label="Chức danh" form={form}>
          {levels.map((level, _) => (
            <MenuItem value={level.id}>{level.name}</MenuItem>
          ))}
        </SelectField>
        <Input name="phone" label="Số điện thoại di động" form={form} />
        <Input name="ext" label="Số điện thoại nội bộ" form={form} />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} sm={6}>
            <RadioField
              name="sex"
              label="Giới tính"
              onChange={handleChangeSex}
              value={sex}
              form={form}
            >
              <FormControlLabel value="Mr" control={<Radio />} label="Nam" />
              <FormControlLabel value="Ms" control={<Radio />} label="Nữ" />
            </RadioField>
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <RadioField
              name="role"
              label="Nhóm quyền"
              onChange={handleChangeRole}
              value={role}
              form={form}
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="admin"
              />
            </RadioField>
          </Grid>
        </Grid>
        <DateField
          name="birthday"
          lable="Ngày sinh nhật"
          inputFormat="DD/MM/YYYY"
          value={birthday}
          onChange={handleChangeBirtday}
          form={form}
        />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          // disabled={isSubmitting}
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
