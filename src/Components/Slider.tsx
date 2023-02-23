import * as React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import FlightIcon from "@mui/icons-material/Flight";
import Box from "@mui/material/Box";
const BoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
const marks = [
  {
    value: 0,
  },

  {
    value: 100,
  },
];
interface ThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: ThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <FlightIcon
        sx={{
          transform: "rotate(90deg)",
        }}
      />
    </SliderThumb>
  );
}

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#FF3D81" : "#FF3D81",
  height: 2,

  "& .MuiSlider-thumb": {
    height: 0,
    width: 0,

    backgroundColor: "#fff",
    boxShadow: BoxShadow,
    "&:focus, &:hover, &$active": {
      boxShadow: "none",
      color: "#fff",
    },

    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,

    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

type CustomizedSliderProps = {
  value: number;
  label: string;
  disabled: boolean;
};

export const CustomizedSlider = (props: CustomizedSliderProps) => {
  const { value, label, disabled } = props;
  return (
    <Box sx={{ width: 250 }}>
      <CustomSlider
        slots={{ thumb: AirbnbThumbComponent }}
        aria-label={label}
        value={value}
        marks={marks}
        defaultValue={50}
        valueLabelDisplay="off"
        disabled={disabled}
      />
    </Box>
  );
};
