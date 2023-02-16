import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
} from "@mui/material";
import { levelApi, roomApi } from "api";
import {
  DateField,
  InputField,
  PasswordField,
  RadioField,
  SelectField,
} from "components/inputField";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const [rooms, setRooms] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sex, setSex] = useState("Mr");
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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Họ và tên" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <PasswordField
          name="retypePassword"
          label="Xác nhận mật khẩu"
          form={form}
        />
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
        <InputField name="phone" label="Số điện thoại di động" form={form} />
        <InputField name="ext" label="Số điện thoại nội bộ" form={form} />
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
            "Đăng ký"
          )}
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
