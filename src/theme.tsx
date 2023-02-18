import { createTheme, styled } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    firstColor: string;
    secondColor: string;
    thirdColor: string;
    fourthColor: string;
  }
  interface ThemeOptions {
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
  }
}
const theme = createTheme({
  firstColor: "#3498db",
  secondColor: "#3498db",
  thirdColor: "#3498db",
  fourthColor: "#3498db1",
});

const darkTheme = createTheme({
  firstColor: "#222831",
  secondColor: "#EEEEEE",
  thirdColor: "#00ADB5",
  fourthColor: "#393E46",
});

export default theme;
export { darkTheme };
