import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

CKEditorField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export function CKEditorField(props) {
  const { form, name, label, disabled } = props;
  const { control } = form;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          error={invalid}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          <Typography>{label}</Typography>
          <CKEditor
            editor={ClassicEditor}
            error={error}
            disabled={disabled}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
            onBlur={onBlur}
            data={value}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
