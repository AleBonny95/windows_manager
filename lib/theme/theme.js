"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = require("styled-components");
const global_1 = __importDefault(require("./global"));
const properties_1 = require("./properties");
/*

import { useState } from 'react';
import {darkId, lightId} from "./properties";

export const mode = () => {
  const [theme, setTheme] = useState(lightId);

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggle = () => (theme === darkId ? setMode(lightId) : setMode(darkId));

  return { theme, themeToggle };
};



const Theme: React.FC<{name?: string}> = ({ children, name }) => {
    const { theme } = mode();
    const useTheme = name === '' ? theme : name;
    const themeMode = useTheme === lightId ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
*/
class Theme extends react_1.Component {
    themes;
    defaultTheme;
    constructor(props) {
        super(props);
        this.defaultTheme = { name: properties_1.lightId, properties: properties_1.lightTheme };
        this.themes = new Map();
        this.themes.set(properties_1.lightId, this.defaultTheme);
        this.themes.set(properties_1.darkId, { name: properties_1.darkId, properties: properties_1.darkTheme });
        this.state = { theme: this.themeValidator(this.props.name) };
    }
    themeValidator(name) {
        const t = this.themes.get(name);
        if (t) {
            return t;
        }
        return this.defaultTheme;
    }
    themeToggle() {
        const { theme } = this.state;
        theme.name === properties_1.lightId ? this.setMode(properties_1.darkId) : this.setMode(properties_1.lightId);
    }
    setMode(name) {
        const t = this.themeValidator(name);
        window.localStorage.setItem('theme', t.name);
        this.setState({ theme: t });
    }
    ;
    render() {
        const { theme } = this.state;
        return (react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme.properties },
            react_1.default.createElement(global_1.default, null),
            this.props.children));
    }
}
exports.Theme = Theme;
