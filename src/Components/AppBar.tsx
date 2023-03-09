import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import DirectionsIcon from "@mui/icons-material/Directions";

type CustomizedInputBaseProps = {
  activate: boolean;
  setActivate: (activate: boolean) => void;
};

export function CustomizedInputBase(props: CustomizedInputBaseProps) {
  const { activate, setActivate } = props;
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Flight"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color={activate ? "primary" : "error"}
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={() => {
          setActivate(!activate);
        }}
      >
        <AirplanemodeActiveIcon />
      </IconButton>
    </Paper>
  );
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.firstColor,
}));

type CustomAppBarProps = {
  activate: boolean;
  setActivate: (activate: boolean) => void;
};
export default function CustomAppBar(props: CustomAppBarProps) {
  const { activate, setActivate } = props;
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <StyledAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Flight Tracker
          </Typography>

          <CustomizedInputBase activate={activate} setActivate={setActivate} />
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
