"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const globalStyle = (0, styled_components_1.createGlobalStyle) `
  :root {
    //dark-mode
    --dark-background: #1A1B27;
    --dark-text: #F5F5F7;

    //light-mode
    --light-background: #f2f2f2;
    --light-text: #2E0509;
  }
`;
exports.default = (0, styled_components_1.withTheme)(globalStyle);
