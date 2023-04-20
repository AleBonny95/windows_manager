import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './global';
import { lightTheme, darkTheme, lightId, darkId } from './properties';

import { ITheme, ThemeProps, ThemeState } from "./themeTypes";

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

export class Theme extends Component<ThemeProps, ThemeState> {
    private themes: Map<string, ITheme>;
    private readonly defaultTheme: ITheme;

    constructor(props: ThemeProps) {
        super(props);
        this.defaultTheme = { name: lightId, properties: lightTheme };
        this.themes = new Map();
        this.themes.set(lightId, this.defaultTheme);
        this.themes.set(darkId, { name: darkId, properties: darkTheme });
        this.state = { theme: this.themeValidator(this.props.name) };
    }

    themeValidator(name: string) {
        const t = this.themes.get(name);
        if (t) {
            return t;
        }
        return this.defaultTheme;
    }

    themeToggle() {
        const { theme } = this.state;
        theme.name === lightId ? this.setMode(darkId) : this.setMode(lightId);
    }

    setMode(name: string) {
        const t = this.themeValidator(name);
        window.localStorage.setItem('theme', t.name);
        this.setState({ theme: t })
    };

    render() {
        const { theme } = this.state;
        return (
            <ThemeProvider theme={theme.properties}>
                <GlobalStyle />
                {this.props.children}
            </ThemeProvider>
        );
    }
}