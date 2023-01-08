import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { levelApi, roomApi } from "../../../../api/index";
import {
  DateField,
  Input,
  Password,
  RadioField,
  SelectField,
} from "../../../../components/inputField/index";

SettingForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SettingForm(props) {
  const user = useSelector((state) => state.auth.current);
  const [rooms, setRooms] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sex, setSex] = useState(user.sex);
  const [birthday, setBirthday] = useState(user.birthday);

  const schema = yup.object().shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên người dùng."),
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email người dùng.")
      .email("Địa chỉ email không hợp lệ."),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng."),
    room: yup.string().required("Vui phòng chọn phòng/ ban."),
    level: yup.string().required("Vui phòng chọn chức danh."),
    phone: yup.string().required("Vui phòng nhập số điện thoại di động."),
  });

  const form = useForm({
    defaultValues: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      password: "",
      retypePassword: "",
      room: user.room,
      level: user.level,
      phone: user.phone,
      ext: user.ext,
      sex: sex,
      birthday: birthday,
    },

    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomApi.getAll();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      const levels = await levelApi.getAll();
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

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="register">
      <div className="register__title dialogTitle">
        <Typography className="dialogTitle_content">
          Cài đặt người dùng
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
          <Grid item xs={6} md={6} sm={6} sx={{ marginTop: "8px" }}>
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
            <DateField
              name="birthday"
              lable="Ngày sinh nhật"
              inputFormat="DD/MM/YYYY"
              value={birthday}
              onChange={handleChangeBirtday}
              form={form}
            />
          </Grid>
        </Grid>

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress
              color="secondary"
              className="register__progress"
            />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default SettingForm;
