import { Component } from 'react';
import { ITheme, ThemeProps, ThemeState } from "./theme.types";
export declare class Theme extends Component<ThemeProps, ThemeState> {
    private themes;
    private readonly defaultTheme;
    constructor(props: ThemeProps);
    themeValidator(name: string): ITheme;
    themeToggle(): void;
    setMode(name: string): void;
    render(): JSX.Element;
}
