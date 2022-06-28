import { createGlobalStyle, withTheme } from 'styled-components';
import { GlobalThemeProps } from "./global.types";

const globalStyle = createGlobalStyle`
  :root {
    //dark-mode
    --dark-background: #1A1B27;
    --dark-text: #F5F5F7;

    //light-mode
    --light-background: #f2f2f2;
    --light-text: #2E0509;
  }
`;

export default withTheme(globalStyle);