import * as React from 'react';
import { Component } from "react";
import { WindowTitle, WindowHeader, CloseIcon, MinIcon, FullscreenIcon } from "./theme/styled";
import { HeaderProps, HeaderState, IHeader } from './headerTypes';


export class Header extends Component<HeaderProps, HeaderState> implements IHeader {
    private minimize: (() => void) | null = null;
    private fullscreen: (() => void) | null = null;
    private close: (() => void) | null = null;
    private title: string | undefined = '';
    private active = false;

    constructor(props: HeaderProps) {
        super(props);
        this.title = props.title;
        this.state = {
            action: 0x00,
            update: 0,
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentDidMount() {
        const { onClose, onMinimize, onFullscreen } = this.props;
        if (onClose) {
            const onCloseHandler = () => onClose(this.state);
            this.onClose(onCloseHandler);
        }
        if (onMinimize) {
            const onMinimizeHandler = () => onMinimize(this.state);
            this.onMinimize(onMinimizeHandler);
        }
        if (onFullscreen) {
            const onFullscreenHandler = () => onFullscreen(this.state);
            this.onClose(onFullscreenHandler);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentWillUnmount() {
    }

    onMinimize(listener: () => void) {
        this.minimize = listener;
    }

    onFullscreen(listener: () => void) {
        this.fullscreen = listener;
    }

    onClose(listener: () => void) {
        this.close = listener;
    }

    setTitle(title: string) {
        this.title = title;
    }

    update() {
        let { update } = this.state;
        this.setState({ update: update++ });
    }

    render() {
        const { action } = this.state;
        const { onClose, onMinimize, onFullscreen, hProps } = this.props;
        const { buttonClose, buttonMinimize, buttonFullscreen } = this.props;

        let closeIcon = null;
        let minIcon = null;
        let fullscreenIcon = null;

        if (hProps && hProps.isClosable && onClose) {
            const onCloseHandler = () => onClose(this.state);
            closeIcon = buttonClose ?
                (React.cloneElement(buttonClose, { onClick: onCloseHandler })) :
                (<CloseIcon onClick={onCloseHandler} />);
        }

        if (hProps && hProps.isMinimizable && onMinimize) {
            const onMinimizeHandler = () => onMinimize(this.state);
            minIcon = buttonMinimize ?
                (React.cloneElement(buttonMinimize, { onClick: onMinimizeHandler })) :
                (<MinIcon onClick={onMinimizeHandler} />);
        }


        if (hProps && hProps.canFullscreen && onFullscreen) {
            const onFullscreenHandler = () => { onFullscreen(this.state); };
            fullscreenIcon = buttonFullscreen ?
                (React.cloneElement(buttonFullscreen, { onClick: onFullscreenHandler })) :
                (<FullscreenIcon onClick={onFullscreenHandler} />);
        }

        let cursor = 'default'
        if (hProps && hProps.isDraggable) {
            cursor = action === 0xf00 ? '-webkit-grabbing' : '-webkit-grab';
        }

        const height = this.props.height ? this.props.height : 30;

        return (
            <WindowHeader
                isActive={this.active}
                height={height}
                isDraggable={hProps ? hProps.isDraggable : false}
                padding={this.props.padding}
                cursor={cursor}
            >
                <WindowTitle>{this.title}</WindowTitle>
                {closeIcon}
                {fullscreenIcon}
                {minIcon}
            </WindowHeader>
        );
    }
}
