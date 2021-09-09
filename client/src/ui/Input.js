import React from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const CustomedTextField = styled(TextField)`
  input {
    align-items: center;
    padding: ${(props) => (props.isBig ? "10px 5px" : "15px 5px")};
  }
`;

// error 기본은 null true일시 helpertext 발동
export default function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <CustomedTextField
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
        }
      }}
      variant="outlined"
      // label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
