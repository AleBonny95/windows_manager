import { Properties } from "./properties";
import { ReactNode } from 'react';
export interface ITheme {
    name: string;
    properties: Properties;
}
export interface ThemeProps {
    name: string;
    children: ReactNode;
}
export interface ThemeState {
    theme: ITheme;
}
