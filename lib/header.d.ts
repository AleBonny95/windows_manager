import { Component } from "react";
import { HeaderProps, HeaderState, IHeader } from './headerTypes';
export declare class Header extends Component<HeaderProps, HeaderState> implements IHeader {
    private minimize;
    private fullscreen;
    private close;
    private title;
    private active;
    constructor(props: HeaderProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMinimize(listener: () => void): void;
    onFullscreen(listener: () => void): void;
    onClose(listener: () => void): void;
    setTitle(title: string): void;
    update(): void;
    render(): JSX.Element;
}
