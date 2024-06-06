import React, { useState } from "react";
import "./components.css";
import { Typography } from "@mui/material";

const LogoFont = (props) => {

  return (
    <Typography
      sx={{
        fontFamily: "LogoFont, sans-serif",
        color: props.color,
        fontSize: props.fontSize,
        fontWeight: props.fontWeight,
        margin: props.margins,
        letterSpacing: "3px",
        textAlign: props.align,
        transition: "color 0.3s ease",
        zIndex: 9,
      }}
    >
      {props.text}
    </Typography>
  );
};

export default LogoFont;
