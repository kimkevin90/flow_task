import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const CustomButton = styled(MuiButton)`
  padding: 7px 10px;
`;

export default function Button(props) {
  // other를 넣어서 버튼의 기본 타입은 button인데 submit으로 바꾼다
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <CustomButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </CustomButton>
  );
}
